
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Fingerprint, MapPin, Phone, Mail, Download, Calendar, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserProfile = ({ language }) => {
  const [profile, setProfile] = useState({
    name: 'Ramesh Kumar',
    aadhaar: '1234-5678-9012',
    phone: '+91 9876543210',
    email: 'ramesh.kumar@gmail.com',
    address: 'Village: Kondapur, Mandal: Medak, District: Medak',
    farmSize: '15',
    crops: ['Cotton', 'Rice', 'Maize'],
    verified: true
  });

  const [reports, setReports] = useState([
    { id: 1, title: 'Soil Analysis Report', date: '2024-01-15', type: 'soil' },
    { id: 2, title: 'Crop Recommendation', date: '2024-01-10', type: 'crop' },
    { id: 3, title: 'Weather Advisory', date: '2024-01-05', type: 'weather' }
  ]);

  const { toast } = useToast();

  const translations = {
    en: {
      title: "Farmer Profile",
      subtitle: "Manage your profile and access your reports",
      personalInfo: "Personal Information",
      aadhaarVerification: "Aadhaar Verification",
      farmingDetails: "Farming Details",
      myReports: "My Reports",
      downloadReports: "Download All Reports",
      name: "Full Name",
      aadhaar: "Aadhaar Number",
      phone: "Phone Number",
      email: "Email Address",
      address: "Address",
      farmSize: "Farm Size (Acres)",
      cropsGrown: "Crops Grown",
      verified: "Verified",
      biometricAuth: "Biometric Authentication",
      updateProfile: "Update Profile",
      viewReport: "View Report"
    },
    te: {
      title: "రైతు ప్రొఫైల్",
      subtitle: "మీ ప్రొఫైల్‌ను నిర్వహించండి మరియు మీ నివేదికలను యాక్సెస్ చేయండి",
      personalInfo: "వ్యక్తిగత సమాచారం",
      aadhaarVerification: "ఆధార్ ధృవీకరణ",
      farmingDetails: "వ్యవసాయ వివరాలు",
      myReports: "నా నివేదికలు",
      downloadReports: "అన్ని నివేదికలను డౌన్‌లోడ్ చేయండి",
      name: "పూర్తి పేరు",
      aadhaar: "ఆధార్ నంబర్",
      phone: "ఫోన్ నంబర్",
      email: "ఇమెయిల్ చిరునామా",
      address: "చిరునామా",
      farmSize: "వ్యవసాయ భూమి పరిమాణం (ఎకరాలు)",
      cropsGrown: "పండించే పంటలు",
      verified: "ధృవీకరించబడింది",
      biometricAuth: "బయోమెట్రిక్ ప్రమాణీకరణ",
      updateProfile: "ప్రొఫైల్‌ను నవీకరించండి",
      viewReport: "నివేదికను చూడండి"
    }
  };

  const t = translations[language];

  const handleBiometricAuth = () => {
    toast({
      title: "Biometric Authentication",
      description: "Fingerprint verification successful!",
    });
  };

  const handleDownloadReport = (reportId) => {
    toast({
      title: "Report Downloaded",
      description: `Report #${reportId} has been downloaded successfully`,
    });
  };

  const handleDownloadAllReports = () => {
    toast({
      title: "All Reports Downloaded",
      description: "All your reports have been downloaded as a ZIP file",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle>{profile.name}</CardTitle>
            <CardDescription className="flex items-center justify-center">
              {profile.verified && (
                <Badge className="bg-green-100 text-green-800">
                  <Fingerprint className="mr-1 h-3 w-3" />
                  {t.verified}
                </Badge>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm">{profile.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm">{profile.email}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-sm">{profile.address}</span>
            </div>
            
            <Button onClick={handleBiometricAuth} className="w-full" variant="outline">
              <Fingerprint className="mr-2 h-4 w-4" />
              {t.biometricAuth}
            </Button>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                {t.personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{t.name}</Label>
                <Input value={profile.name} readOnly />
              </div>
              <div>
                <Label>{t.aadhaar}</Label>
                <Input value={profile.aadhaar} readOnly />
              </div>
              <div>
                <Label>{t.phone}</Label>
                <Input value={profile.phone} />
              </div>
              <div>
                <Label>{t.email}</Label>
                <Input value={profile.email} />
              </div>
              <div className="md:col-span-2">
                <Label>{t.address}</Label>
                <Input value={profile.address} />
              </div>
            </CardContent>
          </Card>

          {/* Farming Details */}
          <Card>
            <CardHeader>
              <CardTitle>{t.farmingDetails}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{t.farmSize}</Label>
                <Input value={profile.farmSize} />
              </div>
              <div>
                <Label>{t.cropsGrown}</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.crops.map((crop) => (
                    <Badge key={crop} variant="secondary">{crop}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-green-600 hover:bg-green-700">
            {t.updateProfile}
          </Button>
        </div>
      </div>

      {/* Reports Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            {t.myReports}
          </CardTitle>
          <Button onClick={handleDownloadAllReports} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t.downloadReports}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <div>
                    <div className="font-medium">{report.title}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {report.date}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    {t.viewReport}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDownloadReport(report.id)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
