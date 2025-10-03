import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface PlanetCardProps {
  name: string;
  radius: number;
  temperature: number;
  status: 'candidate' | 'confirmed' | 'false-positive';
  probability: number;
  onView: () => void;
}

export const PlanetCard = ({ name, radius, temperature, status, probability, onView }: PlanetCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return 'bg-primary text-primary-foreground';
      case 'candidate':
        return 'bg-secondary text-secondary-foreground';
      case 'false-positive':
        return 'bg-destructive text-destructive-foreground';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'candidate':
        return 'Candidato';
      case 'false-positive':
        return 'Falso Positivo';
    }
  };

  return (
    <Card className="glass-panel p-6 hover-lift cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-display text-xl mb-1 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <Badge className={getStatusColor()}>{getStatusText()}</Badge>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{probability}%</div>
          <div className="text-xs text-muted-foreground">Probabilidade</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Raio:</span>
          <span className="font-semibold">{radius.toFixed(2)} R⊕</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Temperatura:</span>
          <span className="font-semibold">{temperature.toFixed(0)} K</span>
        </div>
      </div>

      <Button 
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        onClick={onView}
      >
        <Eye className="w-4 h-4 mr-2" />
        Visualizar em 3D
      </Button>
    </Card>
  );
};
