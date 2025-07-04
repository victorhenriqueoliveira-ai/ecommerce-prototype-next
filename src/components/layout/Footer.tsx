
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">E</span>
              </div>
              <span className="text-lg font-bold gradient-text">ElegantShop</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Sua loja online de confiança com os melhores produtos e preços.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Siga-nos:</span>
              <div className="flex gap-2">
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Facebook
                </Link>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Instagram
                </Link>
              </div>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Atendimento</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-muted-foreground hover:text-primary transition-colors">
                Central de Ajuda
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Fale Conosco
              </Link>
              <Link to="/track" className="block text-muted-foreground hover:text-primary transition-colors">
                Rastrear Pedido
              </Link>
              <Link to="/returns" className="block text-muted-foreground hover:text-primary transition-colors">
                Trocas e Devoluções
              </Link>
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold mb-4">Sobre</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                Quem Somos
              </Link>
              <Link to="/careers" className="block text-muted-foreground hover:text-primary transition-colors">
                Trabalhe Conosco
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>

          {/* Payment & Security */}
          <div>
            <h3 className="font-semibold mb-4">Pagamento e Segurança</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Formas de pagamento:</p>
                <div className="flex flex-wrap gap-2">
                  <div className="px-2 py-1 bg-muted rounded text-xs">PIX</div>
                  <div className="px-2 py-1 bg-muted rounded text-xs">Cartão</div>
                  <div className="px-2 py-1 bg-muted rounded text-xs">Boleto</div>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Segurança:</p>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-muted rounded text-xs">SSL</div>
                  <div className="px-2 py-1 bg-muted rounded text-xs">Dados Protegidos</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 ElegantShop. Todos os direitos reservados.
          </p>
          <p className="text-muted-foreground text-sm">
            CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
