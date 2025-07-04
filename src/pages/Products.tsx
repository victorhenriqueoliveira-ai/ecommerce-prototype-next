
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Grid, List } from 'lucide-react';

// Mock products data - replace with Supabase data
const mockProducts = [
  {
    id: '1',
    name: 'Smartphone Galaxy A54 128GB Câmera Tripla',
    price: 1299.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    reviews: 2341,
    discount: 19,
    freeShipping: true,
    category: 'eletrônicos'
  },
  {
    id: '2',
    name: 'Notebook Lenovo IdeaPad 3i Intel Core i5',
    price: 2499.99,
    originalPrice: 2999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80',
    rating: 4.3,
    reviews: 1567,
    discount: 17,
    freeShipping: true,
    category: 'eletrônicos'
  },
  // Add more mock products...
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 3}`,
    name: `Produto ${i + 3} - Nome do Produto Exemplo`,
    price: Math.random() * 2000 + 100,
    originalPrice: Math.random() * 3000 + 200,
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=400&q=80`,
    rating: 3.5 + Math.random() * 1.5,
    reviews: Math.floor(Math.random() * 5000) + 100,
    discount: Math.floor(Math.random() * 50) + 10,
    freeShipping: Math.random() > 0.5,
    category: ['eletrônicos', 'moda', 'casa', 'esportes'][Math.floor(Math.random() * 4)]
  }))
];

const Products = () => {
  const [products] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'eletrônicos', label: 'Eletrônicos' },
    { value: 'moda', label: 'Moda' },
    { value: 'casa', label: 'Casa & Jardim' },
    { value: 'esportes', label: 'Esportes' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Mais Relevantes' },
    { value: 'price-low', label: 'Menor Preço' },
    { value: 'price-high', label: 'Maior Preço' },
    { value: 'rating', label: 'Melhor Avaliado' },
    { value: 'newest', label: 'Mais Recentes' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Produtos - ElegantShop | Encontre os Melhores Produtos</title>
        <meta 
          name="description" 
          content="Explore nossa ampla seleção de produtos com os melhores preços. Eletrônicos, moda, casa e jardim, esportes e muito mais!" 
        />
        <meta name="keywords" content="produtos, loja online, eletrônicos, moda, ofertas, e-commerce" />
        
        <meta property="og:title" content="Produtos - ElegantShop" />
        <meta property="og:description" content="Explore nossa ampla seleção de produtos com os melhores preços." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <a href="/" className="text-muted-foreground hover:text-primary">Início</a>
            <span className="text-muted-foreground">/</span>
            <span>Produtos</span>
          </nav>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Todos os Produtos</h1>
            <p className="text-muted-foreground">
              Encontre exatamente o que você procura em nossa vasta seleção
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8 p-4 bg-card rounded-lg border">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">
                {filteredProducts.length} produtos encontrados
              </span>
              {selectedCategory !== 'all' && (
                <Badge variant="secondary">
                  {categories.find(c => c.value === selectedCategory)?.label}
                </Badge>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Carregar Mais Produtos
            </Button>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Products;
