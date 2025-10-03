import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Satellite, Search, Target, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border glass-panel">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="hover:bg-card/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Explorer
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="font-display text-5xl md:text-7xl glow-text">
              Missão TESS
            </h1>
            <p className="text-xl text-muted-foreground">
              Transiting Exoplanet Survey Satellite
            </p>
          </div>

          {/* Mission Overview */}
          <Card className="glass-panel p-8 space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <Satellite className="w-8 h-8 text-primary" />
              <h2 className="font-display text-3xl">Sobre a Missão</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Lançado em 18 de abril de 2018, o TESS (Transiting Exoplanet Survey Satellite) é um telescópio espacial 
              da NASA projetado para descobrir exoplanetas em órbita de estrelas próximas ao nosso Sistema Solar. 
              Usando o método de trânsito, o TESS monitora o brilho de milhares de estrelas, detectando pequenas 
              diminuições de luz causadas quando um planeta passa na frente de sua estrela hospedeira.
            </p>
          </Card>

          {/* Objectives */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-panel p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Search className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-display text-xl mb-3">Descoberta de Exoplanetas</h3>
              <p className="text-muted-foreground">
                Identificar milhares de novos exoplanetas candidatos, focando em planetas do tamanho da 
                Terra até Netuno em órbita de estrelas brilhantes próximas.
              </p>
            </Card>

            <Card className="glass-panel p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Target className="w-10 h-10 text-accent mb-4" />
              <h3 className="font-display text-xl mb-3">Zona Habitável</h3>
              <p className="text-muted-foreground">
                Priorizar a busca por planetas rochosos na zona habitável de suas estrelas, 
                onde água líquida pode existir na superfície.
              </p>
            </Card>

            <Card className="glass-panel p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <Globe className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display text-xl mb-3">Caracterização Futura</h3>
              <p className="text-muted-foreground">
                Fornecer alvos ideais para estudos de acompanhamento por telescópios maiores, 
                como o James Webb Space Telescope.
              </p>
            </Card>

            <Card className="glass-panel p-6 hover-lift animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Satellite className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-display text-xl mb-3">Cobertura do Céu</h3>
              <p className="text-muted-foreground">
                Observar 85% do céu ao longo de dois anos, dividido em 26 setores de 
                observação de 27 dias cada.
              </p>
            </Card>
          </div>

          {/* TOI Explanation */}
          <Card className="glass-panel p-8 space-y-4 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <h2 className="font-display text-3xl mb-4">O que são TOIs?</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              <strong className="text-primary">TOI (TESS Object of Interest)</strong> é a designação dada a 
              candidatos a exoplanetas detectados pelo TESS. Cada TOI passa por um processo rigoroso de 
              validação antes de ser confirmado como um exoplaneta real. O número TOI é atribuído sequencialmente 
              à medida que novos candidatos são identificados.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Os TOIs podem ter três status principais:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong className="text-secondary">Candidato:</strong> Detecção inicial que requer validação</li>
              <li><strong className="text-primary">Confirmado:</strong> Validado como exoplaneta real</li>
              <li><strong className="text-destructive">Falso Positivo:</strong> Descartado após análise detalhada</li>
            </ul>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-4 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <h3 className="font-display text-2xl">Pronto para Explorar?</h3>
            <Button 
              size="lg"
              onClick={() => window.location.href = '/'}
              className="bg-primary hover:bg-primary/90 text-primary-foreground neon-border px-8 py-6"
            >
              Descobrir Exoplanetas
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
