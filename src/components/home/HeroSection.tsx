
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/10"></div>
      
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                🔥 Ofertas Imperdíveis
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Encontre os
                <span className="gradient-text block">
                  Melhores Produtos
                </span>
                com os melhores preços
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-md">
                Descubra milhares de produtos com qualidade garantida, 
                entrega rápida e os melhores preços do mercado.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Produtos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Clientes</div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Avaliação</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="group">
                  Ver Produtos
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/deals">
                <Button variant="outline" size="lg">
                  Ver Ofertas
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
                alt="Shopping Experience"
                className="w-full h-80 object-cover rounded-2xl"
                loading="lazy"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-card border border-border/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium">Entrega Rápida</div>
                    <div className="text-xs text-muted-foreground">Em 24h</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-card border border-border/50 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs">%</span>
                  </div>
                  <div>
                    <div className="text-xs font-medium">Até 70% OFF</div>
                    <div className="text-xs text-muted-foreground">Em produtos selecionados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
