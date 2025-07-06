import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    brand: 'all',
    rating: 'all',
    inStock: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock product data
  const mockProducts = [
    {
      id: '1',
      name: 'Smartphone Galaxy A54 128GB',
      price: 1299.99,
      originalPrice: 1599.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      rating: 4.5,
      reviews: 128,
      category: 'electronics',
      brand: 'Samsung',
      inStock: true,
      discount: 19
    },
    {
      id: '2',
      name: 'Notebook Gamer RTX 4060',
      price: 2499.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300',
      rating: 4.8,
      reviews: 89,
      category: 'electronics',
      brand: 'Dell',
      inStock: true
    },
    {
      id: '3',
      name: 'Tênis Esportivo Nike Air',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
      rating: 4.3,
      reviews: 67,
      category: 'sports',
      brand: 'Nike',
      inStock: true,
      discount: 33
    },
    {
      id: '4',
      name: 'Vestido Feminino Elegante',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300',
      rating: 4.6,
      reviews: 45,
      category: 'fashion',
      brand: 'Zara',
      inStock: false
    },
    {
      id: '5',
      name: 'Fone Bluetooth Sony',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300',
      rating: 4.4,
      reviews: 92,
      category: 'electronics',
      brand: 'Sony',
      inStock: true
    },
    {
      id: '6',
      name: 'Cafeteira Espresso',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300',
      rating: 4.7,
      reviews: 156,
      category: 'home',
      brand: 'Nespresso',
      inStock: true,
      discount: 25
    }
  ];

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'electronics', label: 'Eletrônicos' },
    { value: 'fashion', label: 'Moda' },
    { value: 'home', label: 'Casa e Jardim' },
    { value: 'sports', label: 'Esportes' }
  ];

  const brands = [
    { value: 'all', label: 'Todas as Marcas' },
    { value: 'Samsung', label: 'Samsung' },
    { value: 'Dell', label: 'Dell' },
    { value: 'Nike', label: 'Nike' },
    { value: 'Sony', label: 'Sony' },
    { value: 'Zara', label: 'Zara' },
    { value: 'Nespresso', label: 'Nespresso' }
  ];

  const priceRanges = [
    { value: 'all', label: 'Todos os Preços' },
    { value: '0-100', label: 'Até R$ 100' },
    { value: '100-500', label: 'R$ 100 - R$ 500' },
    { value: '500-1000', label: 'R$ 500 - R$ 1000' },
    { value: '1000+', label: 'Acima de R$ 1000' }
  ];

  // Filter and search logic
  const filteredProducts = mockProducts.filter(product => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesBrand = product.brand.toLowerCase().includes(query);
      const matchesCategory = product.category.toLowerCase().includes(query);
      
      if (!matchesName && !matchesBrand && !matchesCategory) {
        return false;
      }
    }

    // Category filter
    if (filters.category !== 'all' && product.category !== filters.category) {
      return false;
    }

    // Brand filter
    if (filters.brand !== 'all' && product.brand !== filters.brand) {
      return false;
    }

    // Price range filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (filters.priceRange === '1000+') {
        if (product.price < 1000) return false;
      } else {
        if (product.price < min || product.price > max) return false;
      }
    }

    // Stock filter
    if (filters.inStock && !product.inStock) {
      return false;
    }

    // Rating filter
    if (filters.rating !== 'all') {
      const minRating = Number(filters.rating);
      if (product.rating < minRating) return false;
    }

    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      priceRange: 'all',
      brand: 'all',
      rating: 'all',
      inStock: false
    });
  };

  return (
    <>
      <Helmet>
        <title>{searchQuery ? `"${searchQuery}" - Busca` : 'Produtos'} - Fidee</title>
        <meta name="description" content={searchQuery ? `Resultados da busca por "${searchQuery}"` : 'Explore nossa seleção completa de produtos'} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Produtos'}
            </h1>
            <p className="text-muted-foreground">
              {sortedProducts.length} produtos encontrados
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <SlidersHorizontal className="h-5 w-5" />
                      Filtros
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Limpar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <Label className="font-medium mb-2 block">Categoria</Label>
                    <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <Label className="font-medium mb-2 block">Marca</Label>
                    <Select value={filters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map(brand => (
                          <SelectItem key={brand.value} value={brand.value}>
                            {brand.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <Label className="font-medium mb-2 block">Faixa de Preço</Label>
                    <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map(range => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <Label className="font-medium mb-2 block">Avaliação Mínima</Label>
                    <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as Avaliações</SelectItem>
                        <SelectItem value="4">4+ estrelas</SelectItem>
                        <SelectItem value="3">3+ estrelas</SelectItem>
                        <SelectItem value="2">2+ estrelas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Stock Filter */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="inStock" 
                      checked={filters.inStock}
                      onCheckedChange={(checked) => handleFilterChange('inStock', checked)}
                    />
                    <Label htmlFor="inStock">Apenas em estoque</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevância</SelectItem>
                      <SelectItem value="price-low">Menor Preço</SelectItem>
                      <SelectItem value="price-high">Maior Preço</SelectItem>
                      <SelectItem value="rating">Melhor Avaliado</SelectItem>
                      <SelectItem value="name">Nome A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {searchQuery && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Busca: "{searchQuery}"
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Products */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Tente ajustar os filtros ou fazer uma nova busca
                  </p>
                  <Button onClick={clearFilters}>
                    Limpar Filtros
                  </Button>
                </div>
              ) : (
                <div className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
                }>
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Products;
