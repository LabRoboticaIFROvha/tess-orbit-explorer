import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, RefreshCw } from "lucide-react";

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export interface FilterState {
  status?: string;
  radiusMin?: number;
  radiusMax?: number;
  tempMin?: number;
  tempMax?: number;
}

export const FilterBar = ({ onSearch, onFilterChange, onReset }: FilterBarProps) => {
  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h3 className="font-display text-xl">Filtros</h3>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome (ex: TOI-700)"
          className="pl-10 bg-input border-border"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Status Filter */}
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">Status</label>
        <Select onValueChange={(value) => onFilterChange({ status: value })}>
          <SelectTrigger className="bg-input border-border">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="confirmed">Confirmado</SelectItem>
            <SelectItem value="candidate">Candidato</SelectItem>
            <SelectItem value="false-positive">Falso Positivo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Radius Range */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Raio Mín (R⊕)</label>
          <Input 
            type="number" 
            placeholder="0.5"
            className="bg-input border-border"
            onChange={(e) => onFilterChange({ radiusMin: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Raio Máx (R⊕)</label>
          <Input 
            type="number" 
            placeholder="15"
            className="bg-input border-border"
            onChange={(e) => onFilterChange({ radiusMax: parseFloat(e.target.value) })}
          />
        </div>
      </div>

      {/* Temperature Range */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Temp Mín (K)</label>
          <Input 
            type="number" 
            placeholder="200"
            className="bg-input border-border"
            onChange={(e) => onFilterChange({ tempMin: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">Temp Máx (K)</label>
          <Input 
            type="number" 
            placeholder="2000"
            className="bg-input border-border"
            onChange={(e) => onFilterChange({ tempMax: parseFloat(e.target.value) })}
          />
        </div>
      </div>

      {/* Reset Button */}
      <Button 
        variant="outline" 
        className="w-full border-border hover:bg-card/50"
        onClick={onReset}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Limpar Filtros
      </Button>
    </div>
  );
};
