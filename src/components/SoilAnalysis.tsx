
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Droplets, Leaf, AlertCircle, Download, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SoilAnalysis = ({ language }) => {
  const [soilData, setSoilData] = useState({
    pH: '',
    soilType: '',
    location: '',
    farmSize: ''
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Soil Analysis & Crop Recommendations",
      subtitle: "Enter your soil details for personalized farming advice",
      soilPH: "Soil pH Level",
      soilType: "Soil Type",
      location: "Farm Location",
      farmSize: "Farm Size (Acres)",
      analyze: "Analyze Soil",
      recommendations: "Crop Recommendations",
      waterRequirement: "Water Requirements",
      fertilizerGuide: "Fertilizer Guide",
      brandPromotions: "Recommended Brands",
      downloadReport: "Download Report",
      perAcre: "per acre",
      suitable: "Highly Suitable",
      moderate: "Moderately Suitable"
    },
    te: {
      title: "మట్టి విశ్లేషణ మరియు పంట సిఫార్సులు",
      subtitle: "వ్యక్తిగతీకృత వ్యవసాయ సలహా కోసం మీ మట్టి వివరాలను నమోదు చేయండి",
      soilPH: "మట్టి pH స్థాయి",
      soilType: "మట్టి రకం",
      location: "వ్యవసాయ భూమి స్థానం",
      farmSize: "వ్యవసాయ భూమి పరిమాణం (ఎకరాలు)",
      analyze: "మట్టిని విశ్లేషించండి",
      recommendations: "పంట సిఫార్సులు",
      waterRequirement: "నీటి అవసరాలు",
      fertilizerGuide: "ఎరువుల మార్గదర్శకం",
      brandPromotions: "సిఫార్సు చేయబడిన బ్రాండ్లు",
      downloadReport: "నివేదికను డౌన్‌లోడ్ చేయండి",
      perAcre: "ఎకరాకు",
      suitable: "అత్యంత అనుకూలం",
      moderate: "మధ్యస్థంగా అనుకూలం"
    }
  };

  const t = translations[language];

  const soilTypes = [
    'Black Soil (Cotton Soil)',
    'Red Soil',
    'Alluvial Soil',
    'Sandy Soil',
    'Clay Soil',
    'Loamy Soil'
  ];

  const generateRecommendations = (pH, soilType) => {
    const pHValue = parseFloat(pH);
    let crops = [];
    let waterReq = '';
    let fertilizers = [];
    let brands = [];

    // pH-based recommendations
    if (pHValue >= 6.0 && pHValue <= 7.5) {
      crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize'];
      waterReq = '1200-1500 liters';
    } else if (pHValue < 6.0) {
      crops = ['Tea', 'Coffee', 'Turmeric', 'Millets', 'Groundnut'];
      waterReq = '800-1200 liters';
      fertilizers.push('Lime application recommended');
    } else {
      crops = ['Barley', 'Jowar', 'Bajra', 'Sunflower'];
      waterReq = '600-900 liters';
      fertilizers.push('Sulfur application recommended');
    }

    // Soil type specific adjustments
    if (soilType.includes('Black')) {
      crops = ['Cotton', 'Sugarcane', 'Jowar', 'Wheat'];
      fertilizers.push('NPK 19:19:19', 'Urea', 'DAP');
      brands = ['IFFCO', 'Coromandel', 'Chambal Fertilizers'];
    } else if (soilType.includes('Red')) {
      crops = ['Groundnut', 'Millets', 'Pulses', 'Cotton'];
      fertilizers.push('NPK 12:32:16', 'Potash', 'Organic compost');
      brands = ['Nagarjuna Fertilizers', 'Zuari', 'GSFC'];
    }

    return { crops, waterReq, fertilizers, brands };
  };

  const handleAnalyze = () => {
    if (!soilData.pH || !soilData.soilType) {
      toast({
        title: "Missing Information",
        description: "Please fill in soil pH and soil type",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const recommendations = generateRecommendations(soilData.pH, soilData.soilType);
      setResults(recommendations);
      setLoading(false);
      
      toast({
        title: "Analysis Complete",
        description: "Your soil analysis results are ready!",
      });
    }, 2000);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Your soil analysis report has been downloaded",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-600" />
            Soil Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pH">{t.soilPH}</Label>
              <Input
                id="pH"
                type="number"
                step="0.1"
                min="4"
                max="9"
                placeholder="6.5"
                value={soilData.pH}
                onChange={(e) => setSoilData({...soilData, pH: e.target.value})}
              />
            </div>
            
            <div>
              <Label>{t.soilType}</Label>
              <Select onValueChange={(value) => setSoilData({...soilData, soilType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">{t.location}</Label>
              <Input
                id="location"
                placeholder="District, Mandal"
                value={soilData.location}
                onChange={(e) => setSoilData({...soilData, location: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="farmSize">{t.farmSize}</Label>
              <Input
                id="farmSize"
                type="number"
                placeholder="10"
                value={soilData.farmSize}
                onChange={(e) => setSoilData({...soilData, farmSize: e.target.value})}
              />
            </div>
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {loading ? "Analyzing..." : t.analyze}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Crop Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-green-600" />
                {t.recommendations}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.crops.map((crop, index) => (
                  <Badge key={crop} variant={index < 2 ? "default" : "secondary"} className="mr-2 mb-2">
                    {crop} {index < 2 && `(${t.suitable})`}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Water Requirements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Droplets className="mr-2 h-5 w-5 text-blue-600" />
                {t.waterRequirement}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {results.waterReq}
              </div>
              <p className="text-sm text-gray-600">{t.perAcre}</p>
            </CardContent>
          </Card>

          {/* Fertilizer Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-orange-600" />
                {t.fertilizerGuide}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {results.fertilizers.map((fertilizer) => (
                  <li key={fertilizer} className="flex items-center">
                    <AlertCircle className="mr-2 h-4 w-4 text-orange-600" />
                    {fertilizer}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Brand Promotions */}
          <Card>
            <CardHeader>
              <CardTitle>{t.brandPromotions}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.brands.map((brand) => (
                  <Badge key={brand} variant="outline" className="mr-2 mb-2">
                    {brand}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Download Report */}
      {results && (
        <div className="text-center">
          <Button onClick={handleDownloadReport} variant="outline" size="lg">
            <Download className="mr-2 h-5 w-5" />
            {t.downloadReport}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SoilAnalysis;
