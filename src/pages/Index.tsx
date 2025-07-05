
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Fidee - E-commerce com os Melhores Produtos e Preços</title>
        <meta 
          name="description" 
          content="Descubra milhares de produtos com qualidade garantida, entrega rápida e os melhores preços do mercado. Eletrônicos, moda, casa e muito mais!" 
        />
        <meta name="keywords" content="e-commerce, loja online, produtos, eletrônicos, moda, casa, ofertas" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Fidee - E-commerce com os Melhores Produtos e Preços" />
        <meta property="og:description" content="Descubra milhares de produtos com qualidade garantida, entrega rápida e os melhores preços do mercado." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Fidee",
            "description": "E-commerce com os melhores produtos e preços",
            "url": window.location.origin,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${window.location.origin}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          <HeroSection />
          <FeaturedProducts />
          
          {/* Categories Preview */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                Explore por Categoria
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Eletrônicos', image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=400&q=80', count: '2.5k+' },
                  { name: 'Moda', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80', count: '1.8k+' },
                  { name: 'Casa & Jardim', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80', count: '3.2k+' },
                  { name: 'Esportes', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80', count: '950+' }
                ].map((category) => (
                  <div key={category.name} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm opacity-90">{category.count} produtos</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <h3 className="font-semibold mb-2">Entrega Rápida</h3>
                  <p className="text-muted-foreground">Receba seus produtos em até 24h nas principais capitais</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="font-semibold mb-2">Compra Segura</h3>
                  <p className="text-muted-foreground">Seus dados protegidos com criptografia SSL</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">↩️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Troca Fácil</h3>
                  <p className="text-muted-foreground">30 dias para trocas e devoluções sem complicação</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
