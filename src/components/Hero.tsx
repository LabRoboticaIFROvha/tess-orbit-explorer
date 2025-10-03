import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const scrollToExplorer = () => {
    document.getElementById('explorer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-6xl md:text-8xl mb-6 animate-fade-in">
          <span className="glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
            TESS
          </span>
          <br />
          <span className="text-foreground">Exoplanet Explorer</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Descubra e explore mundos além do nosso Sistema Solar em uma experiência 3D imersiva
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            onClick={scrollToExplorer}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg neon-border"
          >
            Explorar Exoplanetas
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => window.location.href = '/about'}
            className="border-border hover:bg-card/50 backdrop-blur-sm px-8 py-6 text-lg"
          >
            Sobre a Missão TESS
          </Button>
        </div>

        {/* Scroll Indicator */}
        <button 
          onClick={scrollToExplorer}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </button>
      </div>

      {/* Stars Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-foreground/30 rounded-full animate-glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};
