
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  freeShipping?: boolean;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });

    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: product.name,
    });
  };

  const discountedPrice = product.originalPrice && product.discount 
    ? product.originalPrice * (1 - product.discount / 100)
    : product.price;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group hover-lift cursor-pointer h-full">
        <div className="relative overflow-hidden">
          {/* Discount Badge */}
          {product.discount && (
            <Badge 
              variant="destructive" 
              className="absolute top-2 left-2 z-10"
            >
              -{product.discount}%
            </Badge>
          )}
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleWishlist}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} 
            />
          </Button>

          {/* Product Image */}
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              className="w-full" 
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Free Shipping Badge */}
          {product.freeShipping && (
            <Badge variant="secondary" className="mb-2 text-xs">
              Frete Grátis
            </Badge>
          )}

          {/* Product Name */}
          <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="space-y-1">
            {product.originalPrice && product.originalPrice > product.price ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-primary">
                  R$ {discountedPrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-primary">
                R$ {product.price.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
