import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Thermometer, Ruler, Clock, Sun, Star, AlertCircle } from "lucide-react";

interface PlanetData {
  name: string;
  radius: number; // Earth radii
  period: number; // days
  temperature: number; // Kelvin
  insolation: number; // Earth flux
  distance: number; // parsecs
  status: 'candidate' | 'confirmed' | 'false-positive';
  probability: number; // 0-100
}

interface PlanetDataPanelProps {
  planet: PlanetData;
}

export const PlanetDataPanel = ({ planet }: PlanetDataPanelProps) => {
  const getStatusColor = () => {
    switch (planet.status) {
      case 'confirmed':
        return 'bg-primary text-primary-foreground';
      case 'candidate':
        return 'bg-secondary text-secondary-foreground';
      case 'false-positive':
        return 'bg-destructive text-destructive-foreground';
    }
  };

  const getStatusText = () => {
    switch (planet.status) {
      case 'confirmed':
        return 'Confirmado';
      case 'candidate':
        return 'Candidato';
      case 'false-positive':
        return 'Falso Positivo';
    }
  };

  const getProbabilityColor = () => {
    if (planet.probability >= 80) return 'text-primary';
    if (planet.probability >= 50) return 'text-secondary';
    return 'text-accent';
  };

  return (
    <Card className="glass-panel p-6 space-y-6 h-fit sticky top-4">
      <div>
        <h2 className="font-display text-3xl mb-2 glow-text">{planet.name}</h2>
        <Badge className={getStatusColor()}>{getStatusText()}</Badge>
      </div>

      {/* Probability Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Probabilidade de ser Exoplaneta
          </span>
          <span className={`font-bold ${getProbabilityColor()}`}>
            {planet.probability}%
          </span>
        </div>
        <Progress value={planet.probability} className="h-2" />
      </div>

      <div className="h-px bg-border" />

      {/* Planet Data */}
      <div className="space-y-4">
        <DataItem
          icon={<Ruler className="w-5 h-5" />}
          label="Raio"
          value={`${planet.radius.toFixed(2)} R⊕`}
          description="Raios terrestres"
        />

        <DataItem
          icon={<Clock className="w-5 h-5" />}
          label="Período Orbital"
          value={`${planet.period.toFixed(2)} dias`}
          description="Tempo de uma órbita completa"
        />

        <DataItem
          icon={<Thermometer className="w-5 h-5" />}
          label="Temperatura de Equilíbrio"
          value={`${planet.temperature.toFixed(0)} K`}
          description={`${(planet.temperature - 273.15).toFixed(0)} °C`}
        />

        <DataItem
          icon={<Sun className="w-5 h-5" />}
          label="Insolação"
          value={`${planet.insolation.toFixed(2)} S⊕`}
          description="Fluxo terrestre"
        />

        <DataItem
          icon={<Star className="w-5 h-5" />}
          label="Distância da Estrela"
          value={`${planet.distance.toFixed(2)} pc`}
          description="Parsecs"
        />
      </div>
    </Card>
  );
};

const DataItem = ({ 
  icon, 
  label, 
  value, 
  description 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  description: string;
}) => (
  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
    <div className="text-primary mt-1">{icon}</div>
    <div className="flex-1">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="font-semibold text-lg">{value}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  </div>
);
