
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, TrendingUp, MapPin, AlertCircle, Download, FileText, BarChart3, Globe, Droplets, ShoppingCart, Eye } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = ({ language }) => {
  const [stats, setStats] = useState({
    totalFarmers: 125420,
    activeUsers: 89234,
    soilTests: 45678,
    reportsGenerated: 98765,
    districts: 33,
    mandals: 584,
    totalOrders: 15432,
    waterUsage: 89456 // in acre-feet
  });

  const [soilAnalysisData] = useState([
    { district: 'Hyderabad', pH: 6.8, nitrogen: 245, phosphorus: 18, potassium: 156, tests: 4521 },
    { district: 'Warangal', pH: 7.2, nitrogen: 289, phosphorus: 22, potassium: 187, tests: 6789 },
    { district: 'Nizamabad', pH: 6.5, nitrogen: 201, phosphorus: 15, potassium: 143, tests: 5432 },
    { district: 'Karimnagar', pH: 7.0, nitrogen: 267, phosphorus: 20, potassium: 165, tests: 6543 },
    { district: 'Medak', pH: 6.9, nitrogen: 234, phosphorus: 17, potassium: 152, tests: 4321 }
  ]);

  const [orderData] = useState([
    { id: 'ORD001', farmer: 'Ramesh Kumar', district: 'Medak', product: 'NPK Fertilizer', quantity: '50 kg', amount: 2500, status: 'Delivered', date: '2024-01-15' },
    { id: 'ORD002', farmer: 'Lakshmi Devi', district: 'Warangal', product: 'Urea', quantity: '25 kg', amount: 1200, status: 'Processing', date: '2024-01-16' },
    { id: 'ORD003', farmer: 'Suresh Reddy', district: 'Nizamabad', product: 'Seeds - Cotton', quantity: '10 kg', amount: 3500, status: 'Shipped', date: '2024-01-14' },
    { id: 'ORD004', farmer: 'Padma Vathi', district: 'Karimnagar', product: 'Pesticide', quantity: '2 L', amount: 800, status: 'Delivered', date: '2024-01-13' }
  ]);

  const [waterUsageData] = useState([
    { district: 'Hyderabad', cropArea: 1250, waterUsed: 3750, efficiency: 85, recommendation: 'Good' },
    { district: 'Warangal', cropArea: 2100, waterUsed: 7350, efficiency: 78, recommendation: 'Optimize' },
    { district: 'Nizamabad', cropArea: 1890, waterUsed: 6615, efficiency: 92, recommendation: 'Excellent' },
    { district: 'Karimnagar', cropArea: 1650, waterUsed: 5775, efficiency: 88, recommendation: 'Good' },
    { district: 'Medak', cropArea: 1420, waterUsed: 4970, efficiency: 82, recommendation: 'Moderate' }
  ]);

  const [promotionData] = useState([
    { id: 'PROMO001', brand: 'Coromandel Fertilizers', product: 'Gromor NPK', discount: '15%', validTill: '2024-02-15', status: 'Active', clicks: 245 },
    { id: 'PROMO002', brand: 'IFFCO', product: 'Sagarika Complex', discount: '20%', validTill: '2024-02-20', status: 'Active', clicks: 189 },
    { id: 'PROMO003', brand: 'Nagarjuna Fertilizers', product: 'Crop Care Plus', discount: '12%', validTill: '2024-01-30', status: 'Expired', clicks: 156 },
    { id: 'PROMO004', brand: 'Godavari Biorefineries', product: 'Bio NPK', discount: '18%', validTill: '2024-02-25', status: 'Active', clicks: 298 }
  ]);

  const chartConfig = {
    tests: { label: "Tests", color: "#22c55e" },
    nitrogen: { label: "Nitrogen", color: "#3b82f6" },
    phosphorus: { label: "Phosphorus", color: "#f59e0b" },
    potassium: { label: "Potassium", color: "#ef4444" }
  };

  const translations = {
    en: {
      title: "Government Admin Dashboard",
      subtitle: "Telangana Agriculture Department - Analytics & Management",
      overview: "Overview",
      soilAnalysis: "Soil Analysis",
      orderTracking: "Order Tracking",
      waterUsage: "Water Usage",
      promotions: "Promotions",
      totalFarmers: "Total Registered Farmers",
      activeUsers: "Active Users Today",
      soilTests: "Soil Tests Conducted",
      reportsGenerated: "Reports Generated",
      totalOrders: "Total Orders",
      waterUsageTotal: "Water Usage (Acre-feet)",
      districtCoverage: "District Coverage",
      mandalCoverage: "Mandal Coverage",
      soilAnalysisTitle: "District-wise Soil Analysis Data",
      orderTrackingTitle: "Recent Orders & Farmer Activity",
      waterManagement: "Water Usage Management by Region",
      promotionManagement: "Product Promotions Management",
      exportData: "Export Data",
      generateReport: "Generate Report",
      viewDetails: "View Details",
      district: "District",
      farmer: "Farmer",
      product: "Product",
      status: "Status",
      amount: "Amount",
      date: "Date",
      efficiency: "Efficiency",
      recommendation: "Recommendation"
    },
    te: {
      title: "ప్రభుత్వ అడ్మిన్ డాష్‌బోర్డ్",
      subtitle: "తెలంగాణ వ్యవసాయ శాఖ - విశ్లేషణలు మరియు నిర్వహణ",
      overview: "అవలోకనం",
      soilAnalysis: "మట్టి విశ్లేషణ",
      orderTracking: "ఆర్డర్ ట్రాకింగ్",
      waterUsage: "నీటి వినియోగం",
      promotions: "ప్రమోషన్లు",
      totalFarmers: "మొత్తం నమోదైన రైతులు",
      activeUsers: "నేడు సక్రియ వినియోగదారులు",
      soilTests: "నిర్వహించిన మట్టి పరీక్షలు",
      reportsGenerated: "రూపొందించిన నివేదికలు",
      totalOrders: "మొత్తం ఆర్డర్లు",
      waterUsageTotal: "నీటి వినియోగం (ఎకరె-అడుగులు)",
      districtCoverage: "జిల్లా కవరేజ్",
      mandalCoverage: "మండల కవరేజ్",
      soilAnalysisTitle: "జిల్లా వారీ మట్టి విశ్లేషణ డేటా",
      orderTrackingTitle: "ఇటీవలి ఆర్డర్లు మరియు రైతు కార్యకలాపాలు",
      waterManagement: "ప్రాంతం వారీ నీటి వినియోగ నిర్వహణ",
      promotionManagement: "ఉత్పత్తి ప్రమోషన్ల నిర్వహణ",
      exportData: "డేటాను ఎగుమతి చేయండి",
      generateReport: "నివేదికను రూపొందించండి",
      viewDetails: "వివరాలను చూడండి",
      district: "జిల్లా",
      farmer: "రైతు",
      product: "ఉత్పత్తి",
      status: "స్థితి",
      amount: "మొత్తం",
      date: "తేదీ",
      efficiency: "సామర్థ్యం",
      recommendation: "సిఫార్సు"
    }
  };

  const t = translations[language];

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="soil">{t.soilAnalysis}</TabsTrigger>
          <TabsTrigger value="orders">{t.orderTracking}</TabsTrigger>
          <TabsTrigger value="water">{t.waterUsage}</TabsTrigger>
          <TabsTrigger value="promotions">{t.promotions}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <CardTitle className="text-sm font-medium">{t.totalOrders}</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+8.7% from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{t.waterUsageTotal}</CardTitle>
                <Droplets className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.waterUsage.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Regional monitoring</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>District-wise Soil Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={soilAnalysisData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="district" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="tests" fill="var(--color-tests)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Usage Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waterUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="district" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="efficiency" stroke="#22c55e" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="soil" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t.soilAnalysisTitle}</CardTitle>
                <CardDescription>Comprehensive soil nutrient analysis by district</CardDescription>
              </div>
              <Button onClick={() => exportToCSV(soilAnalysisData, 'soil-analysis-data')} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.district}</TableHead>
                    <TableHead>pH Level</TableHead>
                    <TableHead>Nitrogen (kg/ha)</TableHead>
                    <TableHead>Phosphorus (kg/ha)</TableHead>
                    <TableHead>Potassium (kg/ha)</TableHead>
                    <TableHead>Total Tests</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {soilAnalysisData.map((row) => (
                    <TableRow key={row.district}>
                      <TableCell className="font-medium">{row.district}</TableCell>
                      <TableCell>{row.pH}</TableCell>
                      <TableCell>{row.nitrogen}</TableCell>
                      <TableCell>{row.phosphorus}</TableCell>
                      <TableCell>{row.potassium}</TableCell>
                      <TableCell>{row.tests.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Soil Nutrient Analysis Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={soilAnalysisData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="district" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="nitrogen" fill="var(--color-nitrogen)" />
                    <Bar dataKey="phosphorus" fill="var(--color-phosphorus)" />
                    <Bar dataKey="potassium" fill="var(--color-potassium)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t.orderTrackingTitle}</CardTitle>
                <CardDescription>Monitor farmer orders and activity in real-time</CardDescription>
              </div>
              <Button onClick={() => exportToCSV(orderData, 'order-tracking-data')} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>{t.farmer}</TableHead>
                    <TableHead>{t.district}</TableHead>
                    <TableHead>{t.product}</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>{t.amount}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.date}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.farmer}</TableCell>
                      <TableCell>{order.district}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          order.status === 'Delivered' ? 'default' :
                          order.status === 'Shipped' ? 'secondary' : 'outline'
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="water" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t.waterManagement}</CardTitle>
                <CardDescription>Monitor water usage estimates and efficiency by region</CardDescription>
              </div>
              <Button onClick={() => exportToCSV(waterUsageData, 'water-usage-data')} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.district}</TableHead>
                    <TableHead>Crop Area (Acres)</TableHead>
                    <TableHead>Water Used (Acre-feet)</TableHead>
                    <TableHead>{t.efficiency} (%)</TableHead>
                    <TableHead>{t.recommendation}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waterUsageData.map((row) => (
                    <TableRow key={row.district}>
                      <TableCell className="font-medium">{row.district}</TableCell>
                      <TableCell>{row.cropArea.toLocaleString()}</TableCell>
                      <TableCell>{row.waterUsed.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          row.efficiency >= 90 ? 'default' :
                          row.efficiency >= 80 ? 'secondary' : 'destructive'
                        }>
                          {row.efficiency}%
                        </Badge>
                      </TableCell>
                      <TableCell>{row.recommendation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t.promotionManagement}</CardTitle>
                <CardDescription>Manage product promotions from local fertilizer brands</CardDescription>
              </div>
              <Button onClick={() => exportToCSV(promotionData, 'promotion-data')} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Promo ID</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>{t.product}</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Valid Till</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotionData.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">{promo.id}</TableCell>
                      <TableCell>{promo.brand}</TableCell>
                      <TableCell>{promo.product}</TableCell>
                      <TableCell>{promo.discount}</TableCell>
                      <TableCell>{promo.validTill}</TableCell>
                      <TableCell>
                        <Badge variant={promo.status === 'Active' ? 'default' : 'destructive'}>
                          {promo.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{promo.clicks}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
