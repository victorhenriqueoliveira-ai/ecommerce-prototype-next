
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  User, 
  Search,
  Menu,
  Heart
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [cartCount] = useState(3); // Mock cart count
  const [isLoggedIn] = useState(false); // Mock auth state

  const NavLinks = () => (
    <>
      <Link to="/" className="text-foreground hover:text-primary transition-colors">
        Início
      </Link>
      <Link to="/products" className="text-foreground hover:text-primary transition-colors">
        Produtos
      </Link>
      <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
        Categorias
      </Link>
      <Link to="/deals" className="text-foreground hover:text-primary transition-colors">
        Ofertas
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-border/30">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Frete grátis para compras acima de R$ 99</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/track" className="text-muted-foreground hover:text-primary transition-colors">
              Rastrear Pedido
            </Link>
            <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
              Ajuda
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">E</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">ElegantShop</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            {isLoggedIn ? (
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Cadastrar</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="sm:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                  {!isLoggedIn && (
                    <div className="flex flex-col gap-2 pt-4 border-t">
                      <Link to="/login">
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full">Cadastrar</Button>
                      </Link>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden sm:flex items-center gap-8 py-3 border-t border-border/30">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
};

export default Header;
