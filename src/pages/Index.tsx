
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Users, BarChart3, Globe, Languages, User } from 'lucide-react';
import SoilAnalysis from '@/components/SoilAnalysis';
import WeatherDashboard from '@/components/WeatherDashboard';
import UserProfile from '@/components/UserProfile';
import AdminDashboard from '@/components/AdminDashboard';
import LanguageToggle from '@/components/LanguageToggle';

const Index = () => {
  const [language, setLanguage] = useState('en');
  const [currentView, setCurrentView] = useState('home');

  const translations = {
    en: {
      title: "Telangana Agriculture Advisory Portal",
      subtitle: "Smart farming solutions for better yields",
      soilAnalysis: "Soil Analysis",
      weather: "Weather Dashboard",
      profile: "My Profile",
      admin: "Admin Dashboard",
      welcome: "Welcome to Digital Agriculture",
      description: "Get personalized crop recommendations, weather updates, and agricultural guidance",
      getStarted: "Get Started with Soil Analysis",
      features: "Key Features",
      cropRecommendations: "AI-Powered Crop Recommendations",
      weatherIntegration: "Real-time Weather Integration",
      governmentSupport: "Government-backed Advisory",
      multilingual: "Multi-language Support"
    },
    te: {
      title: "తెలంగాణ వ్యవసాయ సలహా పోర్టల్",
      subtitle: "మెరుగైన దిగుబడుల కోసం స్మార్ట్ వ్యవసాయ పరిష్కారాలు",
      soilAnalysis: "మట్టి విశ్లేషణ",
      weather: "వాతావరణ డాష్‌బోర్డ్",
      profile: "నా ప్రొఫైల్",
      admin: "అడ్మిన్ డాష్‌బోర్డ్",
      welcome: "డిజిటల్ వ్యవసాయానికి స్వాగతం",
      description: "వ్యక్తిగతీకృత పంట సిఫార్సులు, వాతావరణ నవీకరణలు మరియు వ్యవసాయ మార్గదర్శకత్వం పొందండి",
      getStarted: "మట్టి విశ్లేషణతో ప్రారంభించండి",
      features: "ముఖ్య లక్షణాలు",
      cropRecommendations: "AI-ఆధారిత పంట సిఫార్సులు",
      weatherIntegration: "రియల్-టైమ్ వాతావరణ ఏకీకరణ",
      governmentSupport: "ప్రభుత్వ-మద్దతు గల సలహా",
      multilingual: "బహుభాషా మద్దతు"
    }
  };

  const t = translations[language];

  const renderContent = () => {
    switch (currentView) {
      case 'soil':
        return <SoilAnalysis language={language} />;
      case 'weather':
        return <WeatherDashboard language={language} />;
      case 'profile':
        return <UserProfile language={language} />;
      case 'admin':
        return <AdminDashboard language={language} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg p-8 text-center">
              <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
              <p className="text-xl mb-6 opacity-90">{t.subtitle}</p>
              <Button 
                onClick={() => setCurrentView('soil')}
                size="lg" 
                className="bg-white text-green-800 hover:bg-gray-100"
              >
                <Leaf className="mr-2 h-5 w-5" />
                {t.getStarted}
              </Button>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('soil')}>
                <CardHeader className="text-center">
                  <Leaf className="mx-auto h-12 w-12 text-green-600 mb-4" />
                  <CardTitle>{t.soilAnalysis}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('weather')}>
                <CardHeader className="text-center">
                  <Globe className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle>{t.weather}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('profile')}>
                <CardHeader className="text-center">
                  <User className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                  <CardTitle>{t.profile}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentView('admin')}>
                <CardHeader className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-orange-600 mb-4" />
                  <CardTitle>{t.admin}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-8">{t.features}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4">
                  <Leaf className="mx-auto h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold mb-2">{t.cropRecommendations}</h3>
                </div>
                <div className="text-center p-4">
                  <Globe className="mx-auto h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold mb-2">{t.weatherIntegration}</h3>
                </div>
                <div className="text-center p-4">
                  <Users className="mx-auto h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold mb-2">{t.governmentSupport}</h3>
                </div>
                <div className="text-center p-4">
                  <Languages className="mx-auto h-8 w-8 text-orange-600 mb-3" />
                  <h3 className="font-semibold mb-2">{t.multilingual}</h3>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b-2 border-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Leaf className="h-8 w-8 text-green-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">Telangana Agri Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageToggle language={language} setLanguage={setLanguage} />
              <Button 
                variant="outline" 
                onClick={() => setCurrentView('home')}
                className="text-green-600 border-green-600 hover:bg-green-50"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
