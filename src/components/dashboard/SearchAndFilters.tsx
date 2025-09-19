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
    <div className="space-y-3 sm:space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
        <Input
          placeholder="Zoek op naam, email, bedrijf..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 sm:pl-10 text-sm h-9 sm:h-10"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
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
          <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
            <SelectValue placeholder="Type" />
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
          <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle budgetten</SelectItem>
            <SelectItem value="tot_5k">&lt; €5k</SelectItem>
            <SelectItem value="5k_15k">€5k - €15k</SelectItem>
            <SelectItem value="15k_30k">€15k - €30k</SelectItem>
            <SelectItem value="boven_30k">&gt; €30k</SelectItem>
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="outline" onClick={onReset} className="h-9 sm:h-10 text-xs sm:text-sm px-2 sm:px-4">
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasFilters && (
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {statusFilter !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1">
              <span>Status: {statusFilter.replace('_', ' ')}</span>
              <X 
                className="h-2 w-2 sm:h-3 sm:w-3 cursor-pointer ml-1" 
                onClick={() => setStatusFilter('all')} 
              />
            </Badge>
          )}
          
          {projectTypeFilter !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1">
              <span>Type: {projectTypeFilter}</span>
              <X 
                className="h-2 w-2 sm:h-3 sm:w-3 cursor-pointer ml-1" 
                onClick={() => setProjectTypeFilter('all')} 
              />
            </Badge>
          )}
          
          {budgetFilter !== 'all' && (
            <Badge variant="secondary" className="flex items-center space-x-1 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1">
              <span>Budget: {budgetFilter}</span>
              <X 
                className="h-2 w-2 sm:h-3 sm:w-3 cursor-pointer ml-1" 
                onClick={() => setBudgetFilter('all')} 
              />
            </Badge>
          )}
          
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center space-x-1 text-[10px] sm:text-xs px-1 sm:px-2 py-0.5 sm:py-1">
              <span>"{searchTerm}"</span>
              <X 
                className="h-2 w-2 sm:h-3 sm:w-3 cursor-pointer ml-1" 
                onClick={() => setSearchTerm('')} 
              />
            </Badge>
          )}
        </div>
      )}

      {/* Results Counter */}
      <div className="flex justify-between items-center text-xs sm:text-sm text-muted-foreground">
        <span>
          {filteredResults} van {totalResults} leads
          {hasFilters && filteredResults !== totalResults && (
            <span className="ml-1">(gefilterd)</span>
          )}
        </span>
      </div>
    </div>
  );
};