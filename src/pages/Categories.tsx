
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid, List, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todas as Categorias', count: 156 },
    { id: 'electronics', name: 'Eletrônicos', count: 45 },
    { id: 'fashion', name: 'Moda', count: 38 },
    { id: 'home', name: 'Casa e Jardim', count: 29 },
    { id: 'sports', name: 'Esportes', count: 22 },
    { id: 'books', name: 'Livros', count: 18 },
    { id: 'beauty', name: 'Beleza', count: 15 },
  ];

  const mockProducts = [
    {
      id: '1',
      name: 'Smartphone Galaxy A54',
      price: 1299.99,
      originalPrice: 1599.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
      rating: 4.5,
      reviews: 128,
      category: 'electronics'
    },
    {
      id: '2',
      name: 'Notebook Gamer',
      price: 2499.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300',
      rating: 4.8,
      reviews: 89,
      category: 'electronics'
    },
    {
      id: '3',
      name: 'Tênis Esportivo',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
      rating: 4.3,
      reviews: 67,
      category: 'sports'
    },
    {
      id: '4',
      name: 'Vestido Feminino',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300',
      rating: 4.6,
      reviews: 45,
      category: 'fashion'
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(product => product.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Categorias - Fidee</title>
        <meta name="description" content="Explore produtos por categoria na Fidee" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Categorias</h1>
            <p className="text-muted-foreground">
              Encontre produtos organizados por categoria
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar de Categorias */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    Categorias
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50 hover:bg-muted'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Grid de Produtos */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredProducts.length} produtos encontrados
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Categories;
