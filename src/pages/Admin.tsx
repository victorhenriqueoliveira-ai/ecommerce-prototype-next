import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Eye,
  Plus
} from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import AddProductForm from '@/components/admin/AddProductForm';
import OrderDetailsModal from '@/components/admin/OrderDetailsModal';

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  if (!user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  // Mock data - replace with Supabase queries
  const salesData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Fev', sales: 15000 },
    { month: 'Mar', sales: 18000 },
    { month: 'Abr', sales: 22000 },
    { month: 'Mai', sales: 25000 },
    { month: 'Jun', sales: 28000 },
  ];

  const topProducts = [
    { name: 'Smartphone Galaxy A54', sales: 145, revenue: 188350 },
    { name: 'Notebook Lenovo IdeaPad', sales: 89, revenue: 222500 },
    { name: 'Fone Bluetooth Premium', sales: 234, revenue: 37440 },
    { name: 'Smartwatch Fitness', sales: 156, revenue: 46800 },
  ];

  const categoryData = [
    { name: 'Eletrônicos', value: 45, color: '#8884d8' },
    { name: 'Moda', value: 25, color: '#82ca9d' },
    { name: 'Casa', value: 20, color: '#ffc658' },
    { name: 'Esportes', value: 10, color: '#ff7300' },
  ];

  const lowStockProducts = [
    { id: '1', name: 'Smartphone XYZ', stock: 3, minStock: 10 },
    { id: '2', name: 'Notebook ABC', stock: 1, minStock: 5 },
    { id: '3', name: 'Fone DEF', stock: 5, minStock: 15 },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'João Silva', total: 299.99, status: 'processing', date: '2024-01-15' },
    { id: 'ORD-002', customer: 'Maria Santos', total: 159.99, status: 'shipped', date: '2024-01-14' },
    { id: 'ORD-003', customer: 'Pedro Costa', total: 89.99, status: 'delivered', date: '2024-01-13' },
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: 'Pendente', variant: 'secondary' as const },
      'processing': { label: 'Processando', variant: 'default' as const },
      'shipped': { label: 'Enviado', variant: 'default' as const },
      'delivered': { label: 'Entregue', variant: 'default' as const }
    };
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const };
  };

  return (
    <>
      <Helmet>
        <title>Painel Administrativo - Fidee</title>
        <meta name="description" content="Painel de controle administrativo" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-muted-foreground">
              Gerencie sua loja e acompanhe as métricas
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="products">
                <Package className="h-4 w-4 mr-2" />
                Produtos
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Pedidos
              </TabsTrigger>
              <TabsTrigger value="customers">
                <Users className="h-4 w-4 mr-2" />
                Clientes
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Vendas do Mês
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">R$ 0,00</div>
                    <p className="text-xs text-muted-foreground">
                      0% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Pedidos
                    </CardTitle>
                    <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">
                      0% em relação ao mês anterior
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Produtos Ativos
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">
                      0 produtos com estoque baixo
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Clientes
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">
                      0 novos este mês
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Vendas por Mês</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`R$ ${value}`, 'Vendas']} />
                        <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vendas por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Top Products & Low Stock */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Produtos Mais Vendidos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topProducts.map((product, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {product.sales} vendas
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">R$ {product.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      Estoque Baixo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lowStockProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Mín: {product.minStock} unidades
                            </p>
                          </div>
                          <Badge variant="destructive">
                            {product.stock} restantes
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gerenciar Produtos</CardTitle>
                    <CardDescription>
                      Adicione, edite ou remova produtos da loja
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowAddProduct(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Lista de produtos será implementada com Supabase</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription>
                    Gerencie e acompanhe os pedidos dos clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Pedido</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadge(order.status).variant}>
                              {getStatusBadge(order.status).label}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(order.date).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
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

            <TabsContent value="customers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciar Clientes</CardTitle>
                  <CardDescription>
                    Visualize e gerencie informações dos clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Lista de clientes será implementada com Supabase</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Loja</CardTitle>
                  <CardDescription>
                    Configure as opções gerais da sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Configurações serão implementadas com Supabase</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Modals */}
      <AddProductForm 
        isOpen={showAddProduct} 
        onClose={() => setShowAddProduct(false)} 
      />
      
      <OrderDetailsModal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </>
  );
};

export default Admin;
