
import { useState, useEffect } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data - replace with real data from Supabase
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
    freeShipping: true
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
    freeShipping: true
  },
  {
    id: '3',
    name: 'Fone de Ouvido Bluetooth JBL Tune 510BT',
    price: 199.99,
    originalPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    reviews: 3421,
    discount: 33,
    freeShipping: false
  },
  {
    id: '4',
    name: 'Smart TV 55" 4K UHD Samsung Crystal',
    price: 2199.99,
    originalPrice: 2799.99,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    reviews: 987,
    discount: 21,
    freeShipping: true
  },
  {
    id: '5',
    name: 'Cafeteira Expresso Automática Philips',
    price: 899.99,
    originalPrice: 1199.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    reviews: 1234,
    discount: 25,
    freeShipping: true
  },
  {
    id: '6',
    name: 'Tênis Nike Air Max 270 Masculino',
    price: 599.99,
    originalPrice: 799.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    reviews: 4567,
    discount: 25,
    freeShipping: false
  },
  {
    id: '7',
    name: 'Relógio Smartwatch Apple Watch SE',
    price: 1899.99,
    originalPrice: 2299.99,
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    reviews: 2876,
    discount: 17,
    freeShipping: true
  },
  {
    id: '8',
    name: 'Câmera DSLR Canon EOS Rebel T7',
    price: 1799.99,
    originalPrice: 2199.99,
    image: 'https://images.unsplash.com/photo-1606983340126-26e4b8e87df5?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    reviews: 1098,
    discount: 18,
    freeShipping: true
  }
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState(mockProducts);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-muted-foreground">
              Os produtos mais vendidos e bem avaliados
            </p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="group">
              Ver Todos
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button - Mobile */}
        <div className="text-center mt-8 sm:hidden">
          <Link to="/products">
            <Button size="lg" className="w-full max-w-xs">
              Ver Mais Produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
