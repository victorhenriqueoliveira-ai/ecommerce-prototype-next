
import { X, Package, CreditCard, MapPin, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    id: string;
    customer: string;
    total: number;
    status: string;
    date: string;
  } | null;
}

const OrderDetailsModal = ({ isOpen, onClose, order }: OrderDetailsModalProps) => {
  if (!isOpen || !order) return null;

  // Mock detailed order data
  const orderDetails = {
    id: order.id,
    customer: {
      name: order.customer,
      email: 'cliente@email.com',
      phone: '(11) 99999-9999'
    },
    items: [
      {
        id: '1',
        name: 'Smartphone Galaxy A54',
        price: 1299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100'
      },
      {
        id: '2',
        name: 'Capinha Protetora',
        price: 29.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544461503-9ad53c1e0ac2?w=100'
      }
    ],
    shipping: {
      address: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      method: 'Correios PAC',
      cost: 15.99
    },
    payment: {
      method: 'Cartão de Crédito',
      cardLast4: '1234',
      installments: 3,
      status: 'Aprovado',
      transactionId: 'TXN-123456789'
    },
    totals: {
      subtotal: 1329.98,
      shipping: 15.99,
      discount: 0,
      total: order.total
    },
    timeline: [
      { status: 'Pedido Realizado', date: '2024-01-15 10:30', completed: true },
      { status: 'Pagamento Aprovado', date: '2024-01-15 10:35', completed: true },
      { status: 'Preparando Envio', date: '2024-01-15 14:20', completed: true },
      { status: 'Enviado', date: '2024-01-16 09:15', completed: order.status === 'shipped' || order.status === 'delivered' },
      { status: 'Entregue', date: '', completed: order.status === 'delivered' }
    ]
  };

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Detalhes do Pedido {order.id}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={getStatusBadge(order.status).variant}>
                {getStatusBadge(order.status).label}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {new Date(order.date).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações do Cliente
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{orderDetails.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{orderDetails.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{orderDetails.customer.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Itens do Pedido
            </h3>
            <div className="space-y-3">
              {orderDetails.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qtd: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">R$ {item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Shipping Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Endereço de Entrega
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="font-medium">{orderDetails.shipping.address}</p>
                <p>{orderDetails.shipping.city}, {orderDetails.shipping.state}</p>
                <p>CEP: {orderDetails.shipping.zipCode}</p>
                <Separator className="my-3" />
                <div className="flex justify-between text-sm">
                  <span>Método de envio:</span>
                  <span className="font-medium">{orderDetails.shipping.method}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Custo do frete:</span>
                  <span className="font-medium">R$ {orderDetails.shipping.cost.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Informações de Pagamento
              </h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Método:</span>
                    <span className="font-medium">{orderDetails.payment.method}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cartão:</span>
                    <span className="font-medium">****{orderDetails.payment.cardLast4}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Parcelas:</span>
                    <span className="font-medium">{orderDetails.payment.installments}x</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status:</span>
                    <Badge variant="default" className="text-xs">
                      {orderDetails.payment.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ID Transação:</span>
                    <span className="font-mono text-xs">{orderDetails.payment.transactionId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline do Pedido
            </h3>
            <div className="space-y-3">
              {orderDetails.timeline.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.status}
                    </p>
                    {step.date && (
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Totals */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Resumo do Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>R$ {orderDetails.totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete:</span>
                <span>R$ {orderDetails.totals.shipping.toFixed(2)}</span>
              </div>
              {orderDetails.totals.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto:</span>
                  <span>-R$ {orderDetails.totals.discount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>R$ {orderDetails.totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsModal;
