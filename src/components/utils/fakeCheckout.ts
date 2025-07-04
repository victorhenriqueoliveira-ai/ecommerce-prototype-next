
// Simulação da integração com AbacatePay
export interface CheckoutData {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  total: number;
}

export interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  paymentUrl?: string;
  pixCode?: string;
  boletoUrl?: string;
  error?: string;
}

// Simula o processamento do checkout
export const fakeCheckout = async (data: CheckoutData): Promise<CheckoutResponse> => {
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simula diferentes cenários baseado no email
  if (data.customer.email.includes('error')) {
    return {
      success: false,
      error: 'Erro no processamento do pagamento. Tente novamente.'
    };
  }

  // Simula sucesso
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const response: CheckoutResponse = {
    success: true,
    orderId
  };

  // Adiciona dados específicos do método de pagamento
  switch (data.paymentMethod) {
    case 'credit_card':
      response.paymentUrl = `https://payment.abacatepay.com/card/${orderId}`;
      break;
    case 'pix':
      response.pixCode = `00020126580014BR.GOV.BCB.PIX0136${orderId}520400005303986540${data.total.toFixed(2)}5802BR5925ElegantShop6009SAO PAULO62070503***6304`;
      break;
    case 'boleto':
      response.boletoUrl = `https://payment.abacatepay.com/boleto/${orderId}`;
      break;
  }

  console.log('Fake Checkout processed:', response);
  return response;
};

// Simula consulta de status do pedido
export const getOrderStatus = async (orderId: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const statuses = ['pending', 'processing', 'shipped', 'delivered'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    orderId,
    status: randomStatus,
    updatedAt: new Date().toISOString(),
    trackingCode: randomStatus === 'shipped' || randomStatus === 'delivered' 
      ? `BR${Math.random().toString().substr(2, 9)}` 
      : undefined
  };
};
