
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Flame, Percent, Tag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 32
  });

  const flashDeals = [
    {
      id: '1',
      name: 'Smartphone Premium',
      price: 899.99,
      originalPrice: 1299.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      rating: 4.7,
      reviews: 234,
      discount: 31,
      sold: 68,
      total: 100
    },
    {
      id: '2',
      name: 'Fone Bluetooth Premium',
      price: 159.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      rating: 4.5,
      reviews: 189,
      discount: 47,
      sold: 45,
      total: 80
    },
    {
      id: '3',
      name: 'Smartwatch Fitness',
      price: 199.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      rating: 4.6,
      reviews: 156,
      discount: 43,
      sold: 32,
      total: 60
    },
  ];

  const dailyDeals = [
    {
      id: '4',
      name: 'Notebook Ultrabook',
      price: 1899.99,
      originalPrice: 2499.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300',
      rating: 4.8,
      reviews: 98,
      discount: 24
    },
    {
      id: '5',
      name: 'Câmera Digital',
      price: 679.99,
      originalPrice: 899.99,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300',
      rating: 4.4,
      reviews: 67,
      discount: 24
    },
    {
      id: '6',
      name: 'Tablet 10 polegadas',
      price: 449.99,
      originalPrice: 599.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
      rating: 4.3,
      reviews: 89,
      discount: 25
    },
  ];

  return (
    <>
      <Helmet>
        <title>Ofertas - Melhores Promoções | Fidee</title>
        <meta name="description" content="Aproveite as melhores ofertas e promoções da Fidee. Descontos imperdíveis em eletrônicos, moda e muito mais!" />
        <meta property="og:title" content="Ofertas - Melhores Promoções | Fidee" />
        <meta property="og:description" content="Aproveite as melhores ofertas e promoções da Fidee. Descontos imperdíveis!" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-8 mb-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Super Ofertas</h1>
            </div>
            <p className="text-xl opacity-90 mb-6">
              Descontos imperdíveis por tempo limitado!
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-lg font-semibold">Termina em:</span>
              </div>
              <div className="flex gap-2">
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <span className="text-2xl font-bold">{timeLeft.hours}</span>
                  <span className="text-sm block">horas</span>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <span className="text-2xl font-bold">{timeLeft.minutes}</span>
                  <span className="text-sm block">min</span>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2">
                  <span className="text-2xl font-bold">{timeLeft.seconds}</span>
                  <span className="text-sm block">seg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flash Sales */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Flame className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold">Flash Sale</h2>
              <Badge variant="destructive" className="animate-pulse">
                Últimas Horas!
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashDeals.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      -{product.discount}%
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 truncate">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-red-600">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vendidos: {product.sold}</span>
                        <span>{product.total} unidades</span>
                      </div>
                      <Progress value={(product.sold / product.total) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                      <Badge variant={product.sold > product.total * 0.8 ? "destructive" : "secondary"}>
                        {product.sold > product.total * 0.8 ? "Quase Esgotado!" : "Disponível"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Daily Deals */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Percent className="h-6 w-6 text-blue-500" />
              <h2 className="text-2xl font-bold">Ofertas do Dia</h2>
              <Badge variant="outline">
                <Tag className="h-4 w-4 mr-1" />
                Até 50% OFF
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dailyDeals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Deals;
