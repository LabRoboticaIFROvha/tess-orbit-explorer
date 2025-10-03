import { useState } from "react";
import { Hero } from "@/components/Hero";
import { PlanetViewer3D } from "@/components/PlanetViewer3D";
import { PlanetDataPanel } from "@/components/PlanetDataPanel";
import { FilterBar, FilterState } from "@/components/FilterBar";
import { PlanetCard } from "@/components/PlanetCard";
import { Button } from "@/components/ui/button";
import { Plus, Info } from "lucide-react";

// Mock data for exoplanets
const mockPlanets = [
  {
    name: "TOI-700 d",
    radius: 1.19,
    period: 37.42,
    temperature: 268,
    insolation: 0.86,
    distance: 31.1,
    status: 'confirmed' as const,
    probability: 95,
    color: "#4A90E2",
    orbitRadius: 4,
  },
  {
    name: "TOI-1452 b",
    radius: 1.67,
    period: 11.06,
    temperature: 326,
    insolation: 3.7,
    distance: 30.3,
    status: 'confirmed' as const,
    probability: 92,
    color: "#E74C3C",
    orbitRadius: 3.5,
  },
  {
    name: "TOI-2180 b",
    radius: 11.5,
    period: 260.7,
    temperature: 450,
    insolation: 2.1,
    distance: 68.2,
    status: 'confirmed' as const,
    probability: 88,
    color: "#F39C12",
    orbitRadius: 5,
  },
  {
    name: "TOI-1231 b",
    radius: 3.5,
    period: 24.2,
    temperature: 330,
    insolation: 4.2,
    distance: 27.5,
    status: 'candidate' as const,
    probability: 78,
    color: "#9B59B6",
    orbitRadius: 4.2,
  },
  {
    name: "TOI-421 b",
    radius: 2.68,
    period: 16.1,
    temperature: 890,
    insolation: 12.3,
    distance: 52.1,
    status: 'candidate' as const,
    probability: 71,
    color: "#E67E22",
    orbitRadius: 3.8,
  },
  {
    name: "TOI-892 b",
    radius: 1.95,
    period: 45.3,
    temperature: 385,
    insolation: 2.8,
    distance: 43.7,
    status: 'false-positive' as const,
    probability: 35,
    color: "#7F8C8D",
    orbitRadius: 4.5,
  },
];

const Index = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(mockPlanets[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({});

  const filteredPlanets = mockPlanets.filter(planet => {
    if (searchQuery && !planet.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.status && filters.status !== 'all' && planet.status !== filters.status) {
      return false;
    }
    if (filters.radiusMin && planet.radius < filters.radiusMin) {
      return false;
    }
    if (filters.radiusMax && planet.radius > filters.radiusMax) {
      return false;
    }
    if (filters.tempMin && planet.temperature < filters.tempMin) {
      return false;
    }
    if (filters.tempMax && planet.temperature > filters.tempMax) {
      return false;
    }
    return true;
  });

  const handleReset = () => {
    setSearchQuery("");
    setFilters({});
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-border glass-panel">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="font-display text-2xl glow-text">TESS Explorer</div>
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/about'}
            className="border-border hover:bg-card/50"
          >
            <Info className="w-4 h-4 mr-2" />
            Sobre a Missão
          </Button>
        </div>
      </nav>

      {/* Main Explorer Section */}
      <section id="explorer" className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Filters */}
          <div className="lg:col-span-3">
            <FilterBar 
              onSearch={setSearchQuery}
              onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
              onReset={handleReset}
            />
          </div>

          {/* Middle Column - 3D Viewer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-3xl">Visualização 3D</h2>
              <Button 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Carregar Novos TOIs
              </Button>
            </div>
            
            <PlanetViewer3D 
              planetData={{
                radius: selectedPlanet.radius * 0.3,
                color: selectedPlanet.color,
                orbitRadius: selectedPlanet.orbitRadius,
              }}
            />

            <div className="text-center text-sm text-muted-foreground bg-card/30 p-4 rounded-lg">
              🖱️ Clique e arraste para rotacionar • 🔍 Scroll para zoom • ✋ Clique direito para mover
            </div>
          </div>

          {/* Right Column - Planet Data */}
          <div className="lg:col-span-3">
            <PlanetDataPanel planet={selectedPlanet} />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="mt-16">
          <h2 className="font-display text-3xl mb-8">
            Catálogo de Exoplanetas
            <span className="text-muted-foreground text-xl ml-3">
              ({filteredPlanets.length} resultados)
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlanets.map((planet) => (
              <PlanetCard
                key={planet.name}
                name={planet.name}
                radius={planet.radius}
                temperature={planet.temperature}
                status={planet.status}
                probability={planet.probability}
                onView={() => setSelectedPlanet(planet)}
              />
            ))}
          </div>

          {filteredPlanets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                Nenhum exoplaneta encontrado com os filtros selecionados
              </p>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="mt-4 border-border hover:bg-card/50"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
