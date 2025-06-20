import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Users, BarChart3, Globe, ShoppingCart, FileText, User, Smartphone } from 'lucide-react';
import SoilAnalysis from '@/components/SoilAnalysis';
import WeatherDashboard from '@/components/WeatherDashboard';
import UserProfile from '@/components/UserProfile';
import AdminDashboard from '@/components/AdminDashboard';
import LanguageToggle from '@/components/LanguageToggle';
import VoiceSoilAnalysis from '@/components/VoiceSoilAnalysis';

const Index = () => {
  const [language, setLanguage] = useState('te'); // Default to Telugu for rural users
  const [currentView, setCurrentView] = useState('home');

  const translations = {
    en: {
      title: "Telangana Agriculture Advisory Portal",
      subtitle: "Government of Telangana - Smart farming solutions for better yields",
      soilAnalysis: "Soil Test",
      weather: "Weather Info",
      profile: "My Profile",
      admin: "Admin Panel",
      supplies: "Order Supplies",
      reports: "My Reports",
      welcome: "Welcome Farmers",
      description: "Get free government advice for better crops and higher income",
      getStarted: "Start Soil Test",
      features: "Government Services",
      cropRecommendations: "Free Crop Advice",
      weatherIntegration: "Weather Updates",
      governmentSupport: "Government Support",
      multilingual: "Telugu & English",
      quickAccess: "Quick Services",
      iconNav: "Tap icons below for easy access"
    },
    te: {
      title: "తెలంగాణ వ్యవసాయ సలహా పోర్టల్",
      subtitle: "తెలంగాణ ప్రభుత్వం - మెరుగైన దిగుబడుల కోసం స్మార్ట్ వ్యవసాయం",
      soilAnalysis: "మట్టి పరీక్ష",
      weather: "వాతావరణం",
      profile: "నా వివరాలు",
      admin: "అడ్మిన్",
      supplies: "సామాగ్రి ఆర్డర్",
      reports: "నా నివేదికలు",
      welcome: "రైతు సోదరులకు స్వాగతం",
      description: "మెరుగైన పంటలు మరియు అధిక ఆదాయం కోసం ఉచిత ప్రభుత్వ సలహా పొందండి",
      getStarted: "మట్టి పరీక్ష ప్రారంభించండి",
      features: "ప్రభుత్వ సేవలు",
      cropRecommendations: "ఉచిత పంట సలహా",
      weatherIntegration: "వాతావరణ సమాచారం",
      governmentSupport: "ప్రభుత్వ మద్దతు",
      multilingual: "తెలుగు & ఇంగ్లీష్",
      quickAccess: "త్వరిత సేవలు",
      iconNav: "సులభంగా వాడుకోవడానికి కింది చిహ్నాలను నొక్కండి"
    }
  };

  const t = translations[language];

  const quickServices = [
    { 
      id: 'soil', 
      icon: Leaf, 
      label: t.soilAnalysis, 
      color: 'text-green-600 bg-green-50',
      description: language === 'te' ? 'మట్టి విశ్లేషణ మరియు పంట సిఫార్సులు' : 'Soil analysis & crop suggestions'
    },
    { 
      id: 'voice', 
      icon: Smartphone, 
      label: language === 'te' ? 'వాయిస్ విశ్లేషణ' : 'Voice Analysis', 
      color: 'text-purple-600 bg-purple-50',
      description: language === 'te' ? 'వాయిస్ ద్వారా మట్టి వివరాలు చెప్పండి' : 'Speak your soil details'
    },
    { 
      id: 'weather', 
      icon: Globe, 
      label: t.weather, 
      color: 'text-blue-600 bg-blue-50',
      description: language === 'te' ? 'వాతావరణ సమాచారం మరియు హెచ్చరికలు' : 'Weather data & alerts'
    },
    { 
      id: 'supplies', 
      icon: ShoppingCart, 
      label: t.supplies, 
      color: 'text-orange-600 bg-orange-50',
      description: language === 'te' ? 'ఎరువులు మరియు విత్తనాలు ఆర్డర్ చేయండి' : 'Order fertilizers & seeds'
    },
    { 
      id: 'reports', 
      icon: FileText, 
      label: t.reports, 
      color: 'text-purple-600 bg-purple-50',
      description: language === 'te' ? 'మీ నివేదికలను చూడండి మరియు డౌన్‌లోడ్ చేయండి' : 'View & download reports'
    },
    { 
      id: 'profile', 
      icon: User, 
      label: t.profile, 
      color: 'text-indigo-600 bg-indigo-50',
      description: language === 'te' ? 'వ్యక్తిగత వివరాలు మరియు ఆధార్ ధృవీకరణ' : 'Personal details & Aadhaar verification'
    }
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'soil':
        return <SoilAnalysis language={language} />;
      case 'voice':
        return <VoiceSoilAnalysis language={language} />;
      case 'weather':
        return <WeatherDashboard language={language} />;
      case 'profile':
        return <UserProfile language={language} />;
      case 'admin':
        return <AdminDashboard language={language} />;
      case 'supplies':
        return (
          <div className="text-center py-16">
            <ShoppingCart className="mx-auto h-16 w-16 text-orange-500 mb-4" />
            <h2 className="text-2xl font-bold mb-4 telugu-text">
              {language === 'te' ? 'సామాగ్రి ఆర్డర్ సేవ త్వరలో వస్తుంది' : 'Supply Ordering Service Coming Soon'}
            </h2>
            <p className="text-gray-600 telugu-text">
              {language === 'te' ? 'ఎరువులు, విత్తనాలు మరియు ఇతర వ్యవసాయ సామాగ్రి ఆన్‌లైన్‌లో ఆర్డర్ చేయండి' : 'Order fertilizers, seeds, and other farming supplies online'}
            </p>
          </div>
        );
      case 'reports':
        return (
          <div className="text-center py-16">
            <FileText className="mx-auto h-16 w-16 text-purple-500 mb-4" />
            <h2 className="text-2xl font-bold mb-4 telugu-text">
              {language === 'te' ? 'నివేదికల విభాగం' : 'Reports Section'}
            </h2>
            <p className="text-gray-600 telugu-text">
              {language === 'te' ? 'మీ మట్టి పరీక్ష మరియు పంట సిఫార్సుల నివేదికలను ఇక్కడ చూడవచ్చు' : 'View your soil test and crop recommendation reports here'}
            </p>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Government Header Banner */}
            <div className="gov-header rounded-xl p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Leaf className="h-12 w-12 text-white mr-4" />
                <div className="h-12 w-1 bg-orange-400 mx-4"></div>
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-bold telugu-text">{t.title}</h1>
                  <p className="text-lg opacity-90 telugu-text">{t.subtitle}</p>
                </div>
              </div>
              <Button 
                onClick={() => setCurrentView('soil')}
                className="gov-button-secondary text-lg px-8 py-4 mt-4"
                aria-label={t.getStarted}
              >
                <Leaf className="mr-3 h-6 w-6" />
                <span className="telugu-text">{t.getStarted}</span>
              </Button>
            </div>

            {/* Quick Access Navigation */}
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-gray-100">
              <h2 className="text-2xl font-bold text-center mb-2 text-gray-800 telugu-text">{t.quickAccess}</h2>
              <p className="text-center text-gray-600 mb-6 telugu-text">{t.iconNav}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickServices.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setCurrentView(service.id)}
                      className="gov-card p-6 text-center hover:scale-105 transition-transform duration-200 focus:ring-4 focus:ring-green-300"
                      aria-label={service.description}
                    >
                      <div className={`rounded-full p-4 ${service.color} mx-auto mb-3 w-fit`}>
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2 telugu-text text-lg">{service.label}</h3>
                      <p className="text-sm text-gray-600 telugu-text leading-relaxed">{service.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Government Services Features */}
            <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-xl p-8 border-2 border-green-100">
              <h2 className="text-2xl font-bold text-center mb-8 text-gray-800 telugu-text">{t.features}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Leaf className="mx-auto h-10 w-10 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2 text-gray-800 telugu-text">{t.cropRecommendations}</h3>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Globe className="mx-auto h-10 w-10 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2 text-gray-800 telugu-text">{t.weatherIntegration}</h3>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Users className="mx-auto h-10 w-10 text-purple-600 mb-3" />
                  <h3 className="font-semibold mb-2 text-gray-800 telugu-text">{t.governmentSupport}</h3>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <Smartphone className="mx-auto h-10 w-10 text-orange-600 mb-3" />
                  <h3 className="font-semibold mb-2 text-gray-800 telugu-text">{t.multilingual}</h3>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 telugu-text">
                {language === 'te' ? 'సహాయం అవసరమా?' : 'Need Help?'}
              </h3>
              <p className="text-gray-600 telugu-text">
                {language === 'te' ? 
                  'మీకు ఏదైనా సహాయం అవసరమైతే, మీ సమీప రేషన్ షాప్‌లో లేదా వ్యవసాయ కార్యాలయంలో సంప్రదించండి।' :
                  'For any assistance, please contact your nearest ration shop or agriculture office.'
                }
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Accessible Header */}
      <header className="gov-header border-b-4 border-orange-400" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Leaf className="h-10 w-10 text-white mr-3" aria-hidden="true" />
              <div>
                <span className="text-xl font-bold text-white telugu-text">
                  {language === 'te' ? 'తెలంగాణ వ్యవసాయ' : 'Telangana Agriculture'}
                </span>
                <div className="text-sm text-green-200 telugu-text">
                  {language === 'te' ? 'ప్రభుత్వ పోర్టల్' : 'Government Portal'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('home')}
                className="text-white border-white hover:bg-white hover:text-green-700 telugu-text"
                aria-label={language === 'te' ? 'హోమ్‌కి వెళ్లండి' : 'Go to Home'}
              >
                {language === 'te' ? 'హోమ్' : 'Home'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {renderContent()}
      </main>

      {/* Accessibility Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="telugu-text">
            {language === 'te' ? 
              '© 2024 తెలంగాణ ప్రభుత్వం. అన్ని హక్కులు రక్షిత.' :
              '© 2024 Government of Telangana. All rights reserved.'
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
