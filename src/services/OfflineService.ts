
interface SoilData {
  id: string;
  pH: string;
  soilType: string;
  location: string;
  farmSize: string;
  timestamp: number;
  synced: boolean;
}

interface CropRecommendation {
  id: string;
  soilDataId: string;
  crops: string[];
  waterReq: string;
  fertilizers: string[];
  brands: string[];
  timestamp: number;
  synced: boolean;
}

class OfflineService {
  private dbName = 'TelanganaCrishiDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create soil data store
        if (!db.objectStoreNames.contains('soilData')) {
          const soilStore = db.createObjectStore('soilData', { keyPath: 'id' });
          soilStore.createIndex('timestamp', 'timestamp', { unique: false });
          soilStore.createIndex('synced', 'synced', { unique: false });
        }

        // Create recommendations store
        if (!db.objectStoreNames.contains('recommendations')) {
          const recStore = db.createObjectStore('recommendations', { keyPath: 'id' });
          recStore.createIndex('soilDataId', 'soilDataId', { unique: false });
          recStore.createIndex('synced', 'synced', { unique: false });
        }

        // Create offline queue store
        if (!db.objectStoreNames.contains('offlineQueue')) {
          db.createObjectStore('offlineQueue', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  async saveSoilData(data: Omit<SoilData, 'id' | 'timestamp' | 'synced'>): Promise<string> {
    const soilData: SoilData = {
      ...data,
      id: Date.now().toString(),
      timestamp: Date.now(),
      synced: navigator.onLine
    };

    const transaction = this.db!.transaction(['soilData'], 'readwrite');
    const store = transaction.objectStore('soilData');
    await store.add(soilData);

    return soilData.id;
  }

  async saveRecommendation(rec: Omit<CropRecommendation, 'id' | 'timestamp' | 'synced'>): Promise<void> {
    const recommendation: CropRecommendation = {
      ...rec,
      id: Date.now().toString(),
      timestamp: Date.now(),
      synced: navigator.onLine
    };

    const transaction = this.db!.transaction(['recommendations'], 'readwrite');
    const store = transaction.objectStore('recommendations');
    await store.add(recommendation);
  }

  async getSoilData(): Promise<SoilData[]> {
    const transaction = this.db!.transaction(['soilData'], 'readonly');
    const store = transaction.objectStore('soilData');
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getRecommendations(soilDataId: string): Promise<CropRecommendation[]> {
    const transaction = this.db!.transaction(['recommendations'], 'readonly');
    const store = transaction.objectStore('recommendations');
    const index = store.index('soilDataId');
    const request = index.getAll(soilDataId);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getUnsyncedData(): Promise<{ soilData: SoilData[], recommendations: CropRecommendation[] }> {
    const [soilData, recommendations] = await Promise.all([
      this.getUnsyncedSoilData(),
      this.getUnsyncedRecommendations()
    ]);

    return { soilData, recommendations };
  }

  private async getUnsyncedSoilData(): Promise<SoilData[]> {
    const transaction = this.db!.transaction(['soilData'], 'readonly');
    const store = transaction.objectStore('soilData');
    const index = store.index('synced');
    const request = index.getAll(false);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private async getUnsyncedRecommendations(): Promise<CropRecommendation[]> {
    const transaction = this.db!.transaction(['recommendations'], 'readonly');
    const store = transaction.objectStore('recommendations');
    const index = store.index('synced');
    const request = index.getAll(false);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async markAsSynced(type: 'soilData' | 'recommendations', id: string): Promise<void> {
    const transaction = this.db!.transaction([type], 'readwrite');
    const store = transaction.objectStore(type);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const data = getRequest.result;
      if (data) {
        data.synced = true;
        store.put(data);
      }
    };
  }
}

export const offlineService = new OfflineService();
