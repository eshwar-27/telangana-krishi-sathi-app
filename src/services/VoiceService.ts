
export class VoiceService {
  private synthesis: SpeechSynthesis;
  private recognition: SpeechRecognition | null = null;
  private teluguVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initializeVoices();
    this.initializeSpeechRecognition();
  }

  private initializeVoices() {
    const loadVoices = () => {
      const voices = this.synthesis.getVoices();
      this.teluguVoice = voices.find(voice => 
        voice.lang.includes('te') || voice.lang.includes('hi')
      ) || voices[0];
    };

    loadVoices();
    this.synthesis.onvoiceschanged = loadVoices;
  }

  private initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'te-IN'; // Telugu (India)
    }
  }

  speak(text: string, language: string = 'te'): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject(new Error('Speech synthesis not supported'));
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'te' ? 'te-IN' : 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      if (this.teluguVoice) {
        utterance.voice = this.teluguVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);

      this.synthesis.speak(utterance);
    });
  }

  listen(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        resolve(result);
      };

      this.recognition.onerror = (error) => {
        reject(error);
      };

      this.recognition.start();
    });
  }

  stopSpeaking() {
    this.synthesis.cancel();
  }

  isSupported() {
    return !!(this.synthesis && this.recognition);
  }
}

export const voiceService = new VoiceService();
