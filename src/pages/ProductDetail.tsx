
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Star, Heart, ShoppingCart, Plus, Minus, ArrowLeft, Share2 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data
  const mockProducts = {
    '1': {
      id: '1',
      name: 'Smartphone Galaxy A54 128GB',
      price: 1299.99,
      originalPrice: 1599.99,
      description: 'Smartphone Samsung Galaxy A54 com tela de 6.4" Super AMOLED, câmera tripla de 50MP, processador Exynos 1380 e bateria de 5000mAh. Perfeito para quem busca performance e qualidade fotográfica.',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
        'https://images.unsplash.com/photo-1525373612132-b3e820b9426c?w=500'
      ],
      rating: 4.5,
      reviews: 128,
      inStock: true,
      stockQuantity: 15,
      specs: {
        'Tela': '6.4" Super AMOLED',
        'Processador': 'Exynos 1380',
        'Memória': '6GB RAM + 128GB',
        'Câmera': '50MP + 12MP + 5MP',
        'Bateria': '5000mAh',
        'Sistema': 'Android 13'
      },
      features: [
        'Câmera tripla com IA',
        'Carregamento rápido 25W',
        'Resistente à água IP67',
        'Reconhecimento facial',
        'Leitor de digital na tela'
      ]
    },
    '2': {
      id: '2',
      name: 'Notebook Gamer RTX 4060',
      price: 2499.99,
      description: 'Notebook gamer com placa de vídeo RTX 4060, processador Intel i5 de 12ª geração, 16GB RAM e SSD 512GB. Ideal para jogos e trabalho pesado.',
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500'
      ],
      rating: 4.8,
      reviews: 89,
      inStock: true,
      stockQuantity: 8,
      specs: {
        'Processador': 'Intel Core i5-12450H',
        'Placa de Vídeo': 'NVIDIA RTX 4060',
        'Memória': '16GB DDR4',
        'Armazenamento': 'SSD 512GB NVMe',
        'Tela': '15.6" Full HD 144Hz',
        'Sistema': 'Windows 11'
      },
      features: [
        'Tela 144Hz para gaming',
        'Ray Tracing em tempo real',
        'DLSS 3.0',
        'Teclado RGB',
        'Sistema de refrigeração avançado'
      ]
    }
  };

  useEffect(() => {
    const productData = mockProducts[id as keyof typeof mockProducts];
    if (productData) {
      setProduct(productData);
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
    }

    toast({
      title: "Produto adicionado!",
      description: `${quantity}x ${product.name} adicionado ao carrinho`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: product?.name,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Button onClick={() => navigate('/products')}>
              Voltar aos Produtos
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - Fidee</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} - Fidee`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images[0]} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/products')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos Produtos
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-2 mb-6">
                  {product.originalPrice && product.originalPrice > product.price ? (
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                      </span>
                      <span className="text-lg text-muted-foreground line-through">
                        R$ {product.originalPrice.toFixed(2)}
                      </span>
                      <Badge variant="destructive">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </Badge>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </span>
                  )}
                  <p className="text-sm text-muted-foreground">
                    ou 12x de R$ {(product.price / 12).toFixed(2)} sem juros
                  </p>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  {product.inStock ? (
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      ✓ Em estoque ({product.stockQuantity} disponíveis)
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      Fora de estoque
                    </Badge>
                  )}
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium">Quantidade:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="min-w-8 text-center font-medium">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      disabled={quantity >= product.stockQuantity}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mb-6">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleWishlist}
                  >
                    <Heart 
                      className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Frete grátis para todo o Brasil
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Garantia de 1 ano
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Troca em até 30 dias
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descrição</TabsTrigger>
              <TabsTrigger value="specs">Especificações</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Sobre o Produto</h3>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  
                  {product.features && (
                    <>
                      <h4 className="font-semibold mb-3">Principais Características:</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="text-primary">•</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Especificações Técnicas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-3 border rounded">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Avaliações dos Clientes</h3>
                  
                  {/* Rating Summary */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-4xl font-bold">{product.rating}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Baseado em {product.reviews} avaliações
                      </p>
                    </div>
                  </div>

                  {/* Mock Reviews */}
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">João Silva</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">há 2 dias</span>
                      </div>
                      <p className="text-muted-foreground">
                        Excelente produto! Superou minhas expectativas. Recomendo muito!
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Maria Santos</span>
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="h-3 w-3 text-gray-300" />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">há 1 semana</span>
                      </div>
                      <p className="text-muted-foreground">
                        Muito bom produto, entrega rápida. Única coisa é que poderia vir com mais acessórios.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;
