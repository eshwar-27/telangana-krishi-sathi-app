
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, TrendingUp, MapPin, AlertCircle, Download, FileText, BarChart3, Globe } from 'lucide-react';

const AdminDashboard = ({ language }) => {
  const [stats, setStats] = useState({
    totalFarmers: 125420,
    activeUsers: 89234,
    soilTests: 45678,
    reportsGenerated: 98765,
    districts: 33,
    mandals: 584
  });

  const [recentActivity] = useState([
    { id: 1, farmer: 'Ramesh Kumar', action: 'Soil Analysis', location: 'Medak', time: '2 hours ago' },
    { id: 2, farmer: 'Lakshmi Devi', action: 'Weather Advisory', location: 'Warangal', time: '3 hours ago' },
    { id: 3, farmer: 'Suresh Reddy', action: 'Crop Recommendation', location: 'Nizamabad', time: '5 hours ago' },
    { id: 4, farmer: 'Padma Vathi', action: 'Report Download', location: 'Karimnagar', time: '6 hours ago' }
  ]);

  const [districtData] = useState([
    { name: 'Hyderabad', farmers: 8945, tests: 4521, active: 7234 },
    { name: 'Warangal', farmers: 12456, tests: 6789, active: 9876 },
    { name: 'Nizamabad', farmers: 9876, tests: 5432, active: 7654 },
    { name: 'Karimnagar', farmers: 11234, tests: 6543, active: 8765 },
    { name: 'Medak', farmers: 7890, tests: 4321, active: 6543 }
  ]);

  const translations = {
    en: {
      title: "Government Admin Dashboard",
      subtitle: "Telangana Agriculture Department - Analytics & Management",
      overview: "Overview",
      farmers: "Farmers",
      analytics: "Analytics",
      reports: "Reports",
      totalFarmers: "Total Registered Farmers",
      activeUsers: "Active Users Today",
      soilTests: "Soil Tests Conducted",
      reportsGenerated: "Reports Generated",
      districtCoverage: "District Coverage",
      mandalCoverage: "Mandal Coverage",
      recentActivity: "Recent Activity",
      districtWise: "District-wise Statistics",
      exportData: "Export Data",
      generateReport: "Generate Report",
      viewDetails: "View Details"
    },
    te: {
      title: "ప్రభుత్వ అడ్మిన్ డాష్‌బోర్డ్",
      subtitle: "తెలంగాణ వ్యవసాయ శాఖ - విశ్లేషణలు మరియు నిర్వహణ",
      overview: "అవలోకనం",
      farmers: "రైతులు",
      analytics: "విశ్లేషణలు",
      reports: "నివేదికలు",
      totalFarmers: "మొత్తం నమోదైన రైతులు",
      activeUsers: "నేడు సక్రియ వినియోగదారులు",
      soilTests: "నిర్వహించిన మట్టి పరీక్షలు",
      reportsGenerated: "రూపొందించిన నివేదికలు",
      districtCoverage: "జిల్లా కవరేజ్",
      mandalCoverage: "మండల కవరేజ్",
      recentActivity: "ఇటీవలి కార్యకలాపాలు",
      districtWise: "జిల్లా వారీ గణాంకాలు",
      exportData: "డేటాను ఎగుమతి చేయండి",
      generateReport: "నివేదికను రూపొందించండి",
      viewDetails: "వివరాలను చూడండి"
    }
  };

  const t = translations[language];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="farmers">{t.farmers}</TabsTrigger>
          <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
          <TabsTrigger value="reports">{t.reports}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.totalFarmers}</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalFarmers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+5.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.activeUsers}</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12.1% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.soilTests}</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.soilTests.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8.7% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.reportsGenerated}</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.reportsGenerated.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+15.3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.districtCoverage}</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.districts}</div>
                <p className="text-xs text-muted-foreground">Complete coverage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.mandalCoverage}</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.mandals}</div>
                <p className="text-xs text-muted-foreground">95% coverage</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>{t.recentActivity}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">{activity.farmer}</div>
                        <div className="text-sm text-gray-500">{activity.action} - {activity.location}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="farmers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.districtWise}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {districtData.map((district) => (
                  <div key={district.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{district.name}</h3>
                      <Button size="sm" variant="outline">{t.viewDetails}</Button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{district.farmers.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Farmers</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{district.active.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Active Users</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">{district.tests.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Soil Tests</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="mx-auto h-12 w-12 mb-2" />
                    <p>Analytics Chart Placeholder</p>
                    <p className="text-sm">Real charts would be integrated here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crop Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="mx-auto h-12 w-12 mb-2" />
                    <p>Crop Analytics Placeholder</p>
                    <p className="text-sm">Real charts would be integrated here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Monthly Farmer Registration Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Soil Analysis Summary Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Weather Advisory Impact Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  District-wise Usage Statistics
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Report Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <FileText className="mr-2 h-4 w-4" />
                  {t.generateReport}
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  {t.exportData}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
