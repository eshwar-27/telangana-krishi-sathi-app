
interface SMSNotification {
  phone: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: number;
}

class SMSService {
  private pendingNotifications: SMSNotification[] = [];
  private readonly storageKey = 'pendingSMSNotifications';

  constructor() {
    this.loadPendingNotifications();
    this.setupOnlineListener();
  }

  private loadPendingNotifications() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.pendingNotifications = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load pending SMS notifications:', error);
    }
  }

  private savePendingNotifications() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.pendingNotifications));
    } catch (error) {
      console.error('Failed to save pending SMS notifications:', error);
    }
  }

  private setupOnlineListener() {
    window.addEventListener('online', () => {
      this.processPendingNotifications();
    });
  }

  queueSMS(phone: string, message: string, priority: 'high' | 'medium' | 'low' = 'medium') {
    const notification: SMSNotification = {
      phone,
      message,
      priority,
      timestamp: Date.now()
    };

    if (navigator.onLine) {
      this.sendSMS(notification);
    } else {
      this.pendingNotifications.push(notification);
      this.savePendingNotifications();
      console.log('SMS queued for sending when online:', notification);
    }
  }

  private async sendSMS(notification: SMSNotification) {
    try {
      // In a real implementation, this would call your SMS API
      console.log('Sending SMS:', notification);
      
      // Simulate SMS sending
      const success = await this.simulateSMSSend(notification);
      
      if (success) {
        console.log('SMS sent successfully');
        return true;
      } else {
        throw new Error('SMS sending failed');
      }
    } catch (error) {
      console.error('Failed to send SMS:', error);
      // Re-queue if online send fails
      this.pendingNotifications.push(notification);
      this.savePendingNotifications();
      return false;
    }
  }

  private async simulateSMSSend(notification: SMSNotification): Promise<boolean> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate 90% success rate
    return Math.random() > 0.1;
  }

  private async processPendingNotifications() {
    if (this.pendingNotifications.length === 0) return;

    console.log(`Processing ${this.pendingNotifications.length} pending SMS notifications`);

    // Sort by priority and timestamp
    const sortedNotifications = [...this.pendingNotifications].sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return a.timestamp - b.timestamp;
    });

    const failed: SMSNotification[] = [];

    for (const notification of sortedNotifications) {
      const success = await this.sendSMS(notification);
      if (!success) {
        failed.push(notification);
      }
      // Add delay between sends to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    this.pendingNotifications = failed;
    this.savePendingNotifications();

    if (failed.length > 0) {
      console.log(`${failed.length} SMS notifications failed to send and will be retried`);
    }
  }

  // Predefined message templates for common scenarios
  sendSoilAnalysisComplete(phone: string, language: string = 'te') {
    const messages = {
      te: 'మీ మట్టి విశ్లేషణ పూర్తయింది. ఫలితాలను చూడటానికి యాప్‌ను తెరవండి.',
      en: 'Your soil analysis is complete. Open the app to view results.'
    };

    this.queueSMS(phone, messages[language as keyof typeof messages], 'high');
  }

  sendWeatherAlert(phone: string, message: string, language: string = 'te') {
    const prefix = language === 'te' ? 
      'వాతావరణ హెచ్చరిక: ' : 
      'Weather Alert: ';

    this.queueSMS(phone, prefix + message, 'high');
  }

  sendCropRecommendation(phone: string, crops: string[], language: string = 'te') {
    const message = language === 'te' ? 
      `సిఫార్సు చేయబడిన పంటలు: ${crops.join(', ')}. వివరాలకు యాప్‌ను తెరవండి.` :
      `Recommended crops: ${crops.join(', ')}. Open app for details.`;

    this.queueSMS(phone, message, 'medium');
  }

  getPendingCount(): number {
    return this.pendingNotifications.length;
  }
}

export const smsService = new SMSService();
