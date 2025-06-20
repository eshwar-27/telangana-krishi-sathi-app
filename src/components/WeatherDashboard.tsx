
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Droplets, Eye, AlertTriangle } from 'lucide-react';

const WeatherDashboard = ({ language }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const translations = {
    en: {
      title: "Weather Dashboard",
      subtitle: "Real-time weather data for Telangana",
      currentWeather: "Current Weather",
      forecast: "7-Day Forecast",
      alerts: "Weather Alerts",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      visibility: "Visibility",
      pressure: "Pressure",
      uvIndex: "UV Index",
      rainfall: "Rainfall",
      temperature: "Temperature",
      advisory: "Agricultural Advisory",
      irrigationAlert: "Irrigation recommended due to low humidity",
      pestAlert: "Monitor for pests due to high humidity conditions"
    },
    te: {
      title: "వాతావరణ డాష్‌బోర్డ్",
      subtitle: "తెలంగాణ కోసం రియల్-టైమ్ వాతావరణ డేటా",
      currentWeather: "ప్రస్తుత వాతావరణం",
      forecast: "7-రోజుల అంచనా",
      alerts: "వాతావరణ హెచ్చరికలు",
      humidity: "తేమ",
      windSpeed: "గాలి వేగం",
      visibility: "దృశ్యత",
      pressure: "వత్తిడి",
      uvIndex: "UV సూచీ",
      rainfall: "వర్షపాతం",
      temperature: "ఉష్ణోగ్రత",
      advisory: "వ్యవసాయ సలహా",
      irrigationAlert: "తక్కువ తేమ కారణంగా నీటిపారుదల సిఫార్సు చేయబడింది",
      pestAlert: "అధిక తేమ పరిస్థితుల కారణంగా కీటకాలను పర్యవేక్షించండి"
    }
  };

  const t = translations[language];

  // Simulate weather data
  useEffect(() => {
    const mockWeatherData = {
      current: {
        temperature: 28,
        condition: "Partly Cloudy",
        humidity: 65,
        windSpeed: 12,
        visibility: 8,
        pressure: 1013,
        uvIndex: 6,
        rainfall: 2.5
      },
      forecast: [
        { day: "Today", high: 32, low: 24, condition: "Sunny", icon: Sun, rain: 0 },
        { day: "Tomorrow", high: 30, low: 22, condition: "Cloudy", icon: Cloud, rain: 10 },
        { day: "Wed", high: 28, low: 20, condition: "Rainy", icon: CloudRain, rain: 80 },
        { day: "Thu", high: 29, low: 21, condition: "Cloudy", icon: Cloud, rain: 20 },
        { day: "Fri", high: 31, low: 23, condition: "Sunny", icon: Sun, rain: 5 },
        { day: "Sat", high: 33, low: 25, condition: "Sunny", icon: Sun, rain: 0 },
        { day: "Sun", high: 30, low: 22, condition: "Cloudy", icon: Cloud, rain: 15 }
      ],
      alerts: [
        { type: "advisory", message: t.irrigationAlert },
        { type: "warning", message: t.pestAlert }
      ]
    };

    setTimeout(() => {
      setWeatherData(mockWeatherData);
      setLoading(false);
    }, 1500);
  }, [language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Current Weather */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sun className="mr-2 h-5 w-5 text-yellow-500" />
            {t.currentWeather}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Thermometer className="mx-auto h-8 w-8 text-red-500 mb-2" />
              <div className="text-2xl font-bold">{weatherData.current.temperature}°C</div>
              <div className="text-sm text-gray-600">{t.temperature}</div>
            </div>
            
            <div className="text-center">
              <Droplets className="mx-auto h-8 w-8 text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{weatherData.current.humidity}%</div>
              <div className="text-sm text-gray-600">{t.humidity}</div>
            </div>
            
            <div className="text-center">
              <Wind className="mx-auto h-8 w-8 text-gray-500 mb-2" />
              <div className="text-2xl font-bold">{weatherData.current.windSpeed} km/h</div>
              <div className="text-sm text-gray-600">{t.windSpeed}</div>
            </div>
            
            <div className="text-center">
              <CloudRain className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold">{weatherData.current.rainfall} mm</div>
              <div className="text-sm text-gray-600">{t.rainfall}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>{t.forecast}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weatherData.forecast.map((day, index) => {
              const IconComponent = day.icon;
              return (
                <div key={index} className="text-center p-3 border rounded-lg">
                  <div className="font-medium mb-2">{day.day}</div>
                  <IconComponent className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
                  <div className="text-sm">
                    <div className="font-bold">{day.high}°</div>
                    <div className="text-gray-600">{day.low}°</div>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">{day.rain}%</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts & Advisory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
              {t.alerts}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {weatherData.alerts.map((alert, index) => (
              <div key={index} className={`p-3 rounded-lg ${
                alert.type === 'warning' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
              }`}>
                <div className={`text-sm ${
                  alert.type === 'warning' ? 'text-red-800' : 'text-blue-800'
                }`}>
                  {alert.message}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t.advisory}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm text-green-800">
                Ideal conditions for cotton and rice cultivation. Consider planting in the next 3-4 days.
              </div>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-sm text-yellow-800">
                Monitor soil moisture levels. Drip irrigation recommended for water conservation.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WeatherDashboard;
