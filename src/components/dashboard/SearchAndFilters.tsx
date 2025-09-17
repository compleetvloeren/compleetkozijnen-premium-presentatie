import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, RotateCcw } from 'lucide-react';

interface SearchAndFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  projectTypeFilter: string;
  setProjectTypeFilter: (type: string) => void;
  budgetFilter: string;
  setBudgetFilter: (budget: string) => void;
  onReset: () => void;
  totalResults: number;
  filteredResults: number;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  projectTypeFilter,
  setProjectTypeFilter,
  budgetFilter,
  setBudgetFilter,
  onReset,
  totalResults,
  filteredResults
}) => {
  const hasFilters = statusFilter !== 'all' || projectTypeFilter !== 'all' || budgetFilter !== 'all' || searchTerm.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Zoek op naam, email, bedrijf of locatie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statussen</SelectItem>
            <SelectItem value="nieuw">Nieuw</SelectItem>
            <SelectItem value="in_behandeling">In Behandeling</SelectItem>
            <SelectItem value="offerte_verstuurd">Offerte Verstuurd</SelectItem>
            <SelectItem value="gewonnen">Gewonnen</SelectItem>
            <SelectItem value="verloren">Verloren</SelectItem>
          </SelectContent>
        </Select>

        <Select value={projectTypeFilter} onValueChange={setProjectTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Project Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle types</SelectItem>
            <SelectItem value="ramen">Ramen</SelectItem>
            <SelectItem value="deuren">Deuren</SelectItem>
            <SelectItem value="schuifdeuren">Schuifdeuren</SelectItem>
            <SelectItem value="renovatie">Renovatie</SelectItem>
            <SelectItem value="nieuwbouw">Nieuwbouw</SelectItem>
          </SelectContent>
        </Select>

        <Select value={budgetFilter} onValueChange={setBudgetFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle budgetten</SelectItem>
            <SelectItem value="tot_5k">&lt; €5.000</SelectItem>
            <SelectItem value="5k_15k">€5.000 - €15.000</SelectItem>
            <SelectItem value="15k_30k">€15.000 - €30.000</SelectItem>
            <SelectItem value="boven_30k">&gt; €30.000</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="outline" onClick={onReset} className="flex items-center space-x-2">
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
        )}
      </div>

      {/* Active Filters and Results Count */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div className="flex flex-wrap gap-2">
          {statusFilter !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Status: {statusFilter.replace('_', ' ')}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setStatusFilter('all')} 
              />
            </Badge>
          )}
          
          {projectTypeFilter !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Type: {projectTypeFilter}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setProjectTypeFilter('all')} 
              />
            </Badge>
          )}
          
          {budgetFilter !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>Budget: {budgetFilter}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setBudgetFilter('all')} 
              />
            </Badge>
          )}
          
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>"{searchTerm}"</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => setSearchTerm('')} 
              />
            </Badge>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          {filteredResults} van {totalResults} leads
          {hasFilters && filteredResults !== totalResults && (
            <span className="ml-1">(gefilterd)</span>
          )}
        </div>
      </div>
    </div>
  );
};