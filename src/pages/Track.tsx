
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Package, MapPin, Clock, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Track = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock tracking data
  const mockTrackingData = {
    'BR123456789': {
      orderId: 'ORD-001',
      status: 'shipped',
      estimatedDelivery: '2024-01-20',
      updates: [
        { date: '2024-01-15 10:30', status: 'Pedido realizado', location: 'São Paulo, SP' },
        { date: '2024-01-16 14:20', status: 'Pagamento confirmado', location: 'São Paulo, SP' },
        { date: '2024-01-17 09:15', status: 'Produto separado', location: 'Centro de Distribuição - SP' },
        { date: '2024-01-18 16:45', status: 'Produto enviado', location: 'Centro de Distribuição - SP' },
        { date: '2024-01-19 08:30', status: 'Em trânsito', location: 'Rio de Janeiro, RJ' }
      ]
    },
    'BR987654321': {
      orderId: 'ORD-002',
      status: 'delivered',
      estimatedDelivery: '2024-01-18',
      deliveredDate: '2024-01-18',
      updates: [
        { date: '2024-01-10 11:00', status: 'Pedido realizado', location: 'São Paulo, SP' },
        { date: '2024-01-11 15:30', status: 'Pagamento confirmado', location: 'São Paulo, SP' },
        { date: '2024-01-12 10:20', status: 'Produto separado', location: 'Centro de Distribuição - SP' },
        { date: '2024-01-13 14:15', status: 'Produto enviado', location: 'Centro de Distribuição - SP' },
        { date: '2024-01-18 16:30', status: 'Produto entregue', location: 'Rio de Janeiro, RJ' }
      ]
    }
  };

  const handleTrack = async () => {
    if (!trackingCode.trim()) {
      setError('Digite um código de rastreamento');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const info = mockTrackingData[trackingCode as keyof typeof mockTrackingData];
    
    if (info) {
      setTrackingInfo(info);
    } else {
      setError('Código de rastreamento não encontrado');
      setTrackingInfo(null);
    }

    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    if (status === 'delivered') return 'bg-green-100 text-green-800';
    if (status === 'shipped') return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <>
      <Helmet>
        <title>Rastrear Pedido - Fidee</title>
        <meta name="description" content="Acompanhe o status do seu pedido em tempo real" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Rastrear Pedido</h1>
              <p className="text-muted-foreground">
                Digite o código de rastreamento para acompanhar seu pedido
              </p>
            </div>

            {/* Search Form */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Input
                    placeholder="Digite o código de rastreamento (ex: BR123456789)"
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleTrack()}
                  />
                  <Button onClick={handleTrack} disabled={loading}>
                    <Search className="h-4 w-4 mr-2" />
                    {loading ? 'Buscando...' : 'Rastrear'}
                  </Button>
                </div>
                {error && (
                  <p className="text-destructive text-sm mt-2">{error}</p>
                )}
              </CardContent>
            </Card>

            {/* Tracking Results */}
            {trackingInfo && (
              <div className="space-y-6">
                {/* Order Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Pedido #{trackingInfo.orderId}</span>
                      <Badge className={getStatusColor(trackingInfo.status)}>
                        {trackingInfo.status === 'delivered' ? 'Entregue' : 
                         trackingInfo.status === 'shipped' ? 'Enviado' : 'Em Processamento'}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <span>Código: {trackingCode}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>
                          {trackingInfo.status === 'delivered' 
                            ? `Entregue em ${new Date(trackingInfo.deliveredDate).toLocaleDateString('pt-BR')}`
                            : `Previsão: ${new Date(trackingInfo.estimatedDelivery).toLocaleDateString('pt-BR')}`
                          }
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tracking Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Movimentação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trackingInfo.updates.map((update: any, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${
                              index === 0 ? 'bg-primary' : 'bg-green-500'
                            }`}></div>
                            {index !== trackingInfo.updates.length - 1 && (
                              <div className="w-px h-8 bg-border mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{update.status}</p>
                              <Badge variant="outline" className="text-xs">
                                {new Date(update.date).toLocaleString('pt-BR')}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 mt-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{update.location}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Confirmation */}
                {trackingInfo.status === 'delivered' && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <div>
                          <h3 className="font-semibold text-green-800">Pedido Entregue</h3>
                          <p className="text-green-700">
                            Seu pedido foi entregue com sucesso em {new Date(trackingInfo.deliveredDate).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Help Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Precisa de Ajuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    • O código de rastreamento é enviado por email após o envio do produto
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Códigos de exemplo para teste: BR123456789, BR987654321
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Em caso de dúvidas, entre em contato conosco
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Track;
