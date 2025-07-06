
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Package, CreditCard, MapPin, Clock, ExternalLink, X } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  paymentMethod?: string;
  trackingCode?: string;
  shippingAddress?: string;
  canCancel?: boolean;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelOrder?: (orderId: string) => void;
}

const OrderDetailsModal = ({ order, isOpen, onClose, onCancelOrder }: OrderDetailsModalProps) => {
  const [cancelling, setCancelling] = useState(false);

  if (!order) return null;

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { label: 'Pendente', variant: 'secondary' as const, color: 'bg-yellow-100 text-yellow-800' },
      'processing': { label: 'Processando', variant: 'default' as const, color: 'bg-blue-100 text-blue-800' },
      'shipped': { label: 'Enviado', variant: 'default' as const, color: 'bg-green-100 text-green-800' },
      'delivered': { label: 'Entregue', variant: 'default' as const, color: 'bg-green-100 text-green-800' }
    };
    return statusMap[status as keyof typeof statusMap] || { label: status, variant: 'secondary' as const, color: 'bg-gray-100 text-gray-800' };
  };

  const handleCancelOrder = async () => {
    if (!onCancelOrder) return;
    setCancelling(true);
    await onCancelOrder(order.id);
    setCancelling(false);
    onClose();
  };

  const statusInfo = getStatusBadge(order.status);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Pedido #{order.id}</span>
            <Badge className={statusInfo.color}>
              {statusInfo.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Status do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Pedido realizado - {new Date(order.date).toLocaleDateString('pt-BR')}</span>
                </div>
                {order.status !== 'pending' && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Pagamento confirmado</span>
                  </div>
                )}
                {(order.status === 'shipped' || order.status === 'delivered') && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Produto enviado</span>
                  </div>
                )}
                {order.status === 'delivered' && (
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Produto entregue</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Itens do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">R$ {order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Informações de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Método: {order.paymentMethod || 'Cartão de Crédito'}</p>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          {order.shippingAddress && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{order.shippingAddress}</p>
              </CardContent>
            </Card>
          )}

          {/* Tracking */}
          {order.trackingCode && (
            <Card>
              <CardHeader>
                <CardTitle>Rastreamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Código: {order.trackingCode}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/track?code=${order.trackingCode}`} target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Rastrear
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            {order.canCancel && order.status === 'pending' && (
              <Button 
                variant="destructive" 
                onClick={handleCancelOrder}
                disabled={cancelling}
              >
                <X className="h-4 w-4 mr-2" />
                {cancelling ? 'Cancelando...' : 'Cancelar Pedido'}
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
