
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { voiceService } from '@/services/VoiceService';
import { offlineService } from '@/services/OfflineService';

interface VoiceSoilAnalysisProps {
  language: string;
}

const VoiceSoilAnalysis: React.FC<VoiceSoilAnalysisProps> = ({ language }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [voiceData, setVoiceData] = useState({
    pH: '',
    soilType: '',
    location: '',
    farmSize: ''
  });
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Voice Soil Analysis",
      subtitle: "Speak your soil details in Telugu or English",
      startVoice: "Start Voice Input",
      stopVoice: "Stop Voice",
      stopSpeaking: "Stop Speaking",
      listening: "Listening...",
      speaking: "Speaking...",
      offline: "Offline Mode",
      online: "Online",
      steps: [
        "Please tell me your soil pH level",
        "What type of soil do you have?",
        "Where is your farm located?",
        "How many acres is your farm?"
      ],
      voiceNotSupported: "Voice features not supported in this browser",
      processingOffline: "Processing offline - will sync when online"
    },
    te: {
      title: "వాయిస్ మట్టి విశ్లేషణ",
      subtitle: "తెలుగులో లేదా ఇంగ్లీషులో మీ మట్టి వివరాలను చెప్పండి",
      startVoice: "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
      stopVoice: "వాయిస్ ఆపండి",
      stopSpeaking: "మాట్లాడడం ఆపండి",
      listening: "వింటున్నాను...",
      speaking: "మాట్లాడుతున్నాను...",
      offline: "ఆఫ్‌లైన్ మోడ్",
      online: "ఆన్‌లైన్",
      steps: [
        "దయచేసి మీ మట్టి pH స్థాయిని చెప్పండి",
        "మీకు ఎలాంటి మట్టి ఉంది?",
        "మీ వ్యవసాయ భూమి ఎక్కడ ఉంది?",
        "మీ వ్యవసాయ భూమి ఎన్ని ఎకరాలు?"
      ],
      voiceNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఫీచర్లు మద్దతు లేవు",
      processingOffline: "ఆఫ్‌లైన్‌లో ప్రాసెస్ చేస్తున్నాము - ఆన్‌లైన్ వచ్చినప్పుడు సింక్ అవుతుంది"
    }
  };

  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initialize offline service
    offlineService.init().catch(console.error);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const speakQuestion = async (stepIndex: number) => {
    if (!voiceService.isSupported()) return;

    setIsSpeaking(true);
    try {
      await voiceService.speak(t.steps[stepIndex], language);
    } catch (error) {
      console.error('Speech error:', error);
    } finally {
      setIsSpeaking(false);
    }
  };

  const startListening = async () => {
    if (!voiceService.isSupported()) {
      toast({
        title: t.voiceNotSupported,
        variant: "destructive"
      });
      return;
    }

    setIsListening(true);
    
    // Speak the question first
    await speakQuestion(currentStep);

    try {
      const result = await voiceService.listen();
      processVoiceInput(result);
    } catch (error) {
      console.error('Voice recognition error:', error);
      toast({
        title: "Voice recognition failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsListening(false);
    }
  };

  const processVoiceInput = (input: string) => {
    const stepFields = ['pH', 'soilType', 'location', 'farmSize'];
    const field = stepFields[currentStep];

    setVoiceData(prev => ({
      ...prev,
      [field]: input
    }));

    if (currentStep < stepFields.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeAnalysis();
    }
  };

  const completeAnalysis = async () => {
    try {
      const soilDataId = await offlineService.saveSoilData(voiceData);
      
      // Generate basic recommendations (offline capable)
      const recommendations = generateBasicRecommendations(voiceData.pH, voiceData.soilType);
      await offlineService.saveRecommendation({
        soilDataId,
        ...recommendations
      });

      const message = isOnline ? 
        "Analysis complete! Check your results below." :
        t.processingOffline;

      toast({
        title: "Success",
        description: message
      });

      // Speak the results
      if (voiceService.isSupported()) {
        const resultText = language === 'te' ? 
          `మీ మట్టికి ఈ పంటలు సరిపోతాయి: ${recommendations.crops.join(', ')}` :
          `Recommended crops for your soil: ${recommendations.crops.join(', ')}`;
        
        await voiceService.speak(resultText, language);
      }

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Error",
        description: "Failed to process analysis",
        variant: "destructive"
      });
    }
  };

  const generateBasicRecommendations = (pH: string, soilType: string) => {
    const pHValue = parseFloat(pH);
    let crops = ['Rice', 'Cotton', 'Maize'];
    let waterReq = '1000-1500 liters';
    let fertilizers = ['NPK 19:19:19', 'Urea'];
    let brands = ['IFFCO', 'Coromandel'];

    if (pHValue < 6.0) {
      crops = ['Groundnut', 'Millets', 'Turmeric'];
      waterReq = '800-1200 liters';
    } else if (pHValue > 7.5) {
      crops = ['Barley', 'Jowar', 'Sunflower'];
      waterReq = '600-900 liters';
    }

    return { crops, waterReq, fertilizers, brands };
  };

  const stopSpeaking = () => {
    voiceService.stopSpeaking();
    setIsSpeaking(false);
  };

  const restartProcess = () => {
    setCurrentStep(0);
    setVoiceData({ pH: '', soilType: '', location: '', farmSize: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="telugu-text">{t.title}</span>
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <div className="flex items-center text-green-600">
                  <Wifi className="h-4 w-4 mr-1" />
                  <span className="text-sm telugu-text">{t.online}</span>
                </div>
              ) : (
                <div className="flex items-center text-orange-600">
                  <WifiOff className="h-4 w-4 mr-1" />
                  <span className="text-sm telugu-text">{t.offline}</span>
                </div>
              )}
            </div>
          </CardTitle>
          <p className="text-gray-600 telugu-text">{t.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Question Display */}
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <p className="text-lg font-medium text-green-800 telugu-text">
              {t.steps[currentStep]}
            </p>
            <div className="mt-2 text-sm text-green-600">
              Step {currentStep + 1} of {t.steps.length}
            </div>
          </div>

          {/* Voice Input Display */}
          {Object.entries(voiceData).map(([key, value], index) => (
            value && (
              <div key={key} className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">{['pH', 'Soil Type', 'Location', 'Farm Size'][index]}: </span>
                <span>{value}</span>
              </div>
            )
          ))}

          {/* Voice Controls */}
          <div className="flex space-x-4">
            <Button
              onClick={startListening}
              disabled={isListening || isSpeaking}
              className="gov-button-primary flex-1"
            >
              {isListening ? (
                <>
                  <MicOff className="mr-2 h-5 w-5" />
                  <span className="telugu-text">{t.listening}</span>
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-5 w-5" />
                  <span className="telugu-text">{t.startVoice}</span>
                </>
              )}
            </Button>

            {isSpeaking && (
              <Button
                onClick={stopSpeaking}
                variant="outline"
                className="gov-button-secondary"
              >
                <VolumeX className="mr-2 h-5 w-5" />
                <span className="telugu-text">{t.stopSpeaking}</span>
              </Button>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / t.steps.length) * 100}%` }}
            ></div>
          </div>

          {/* Restart Button */}
          {currentStep > 0 && (
            <Button
              onClick={restartProcess}
              variant="outline"
              className="w-full"
            >
              <span className="telugu-text">
                {language === 'te' ? 'మళ్లీ ప్రారంభించండి' : 'Start Over'}
              </span>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceSoilAnalysis;
