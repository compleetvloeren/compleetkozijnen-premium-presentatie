import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface AddressSuggestion {
  display: string;
  address: string;
  postalCode: string;
  city: string;
  houseNumber: string;
  street: string;
}

interface AddressSearchProps {
  onAddressSelect: (address: {
    address: string;
    postalCode: string;
    city: string;
  }) => void;
  errors?: {
    address?: string;
    postalCode?: string;
    city?: string;
  };
  className?: string;
}

export const AddressSearch: React.FC<AddressSearchProps> = ({
  onAddressSelect,
  errors,
  className
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const searchAddresses = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Using the free postal code API for Netherlands
      const response = await fetch(
        `https://api.pdok.nl/bzk/locatieserver/search/v3_1/suggest?q=${encodeURIComponent(searchQuery)}&rows=8&fq=type:adres`
      );
      
      if (response.ok) {
        const data = await response.json();
        const addressSuggestions: AddressSuggestion[] = data.response?.docs?.map((doc: any) => {
          console.log('API doc:', doc); // Debug log
          const parts = doc.weergavenaam.split(', ');
          const addressPart = parts[0] || '';
          const cityPart = parts[1] || '';
          
          // Extract house number and street
          const addressMatch = addressPart.match(/^(.+?)(\d+.*)$/);
          const street = addressMatch ? addressMatch[1].trim() : addressPart;
          const houseNumber = addressMatch ? addressMatch[2].trim() : '';
          
          // Get postal code from the API response
          const postalCode = doc.postcode || doc.postalcode || '';
          
          return {
            display: doc.weergavenaam,
            address: addressPart,
            postalCode: postalCode,
            city: cityPart,
            houseNumber,
            street
          };
        }) || [];
        
        setSuggestions(addressSuggestions);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAddresses(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(true);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setQuery(suggestion.display);
    setShowSuggestions(false);
    onAddressSelect({
      address: suggestion.address,
      postalCode: suggestion.postalCode,
      city: suggestion.city
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow for click
    setTimeout(() => setShowSuggestions(false), 200);
  };

  return (
    <div className={cn("relative", className)}>
      <Label htmlFor="address-search">Adres zoeken *</Label>
      <div className="relative">
        <Input
          ref={inputRef}
          id="address-search"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
          placeholder="Begin met typen van je adres..."
          className={`mt-1 ${errors?.address ? 'border-red-500' : ''}`}
          autoComplete="off"
        />
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-0.5">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={cn(
                "px-4 py-3 cursor-pointer text-sm hover:bg-muted transition-colors",
                selectedIndex === index && "bg-muted"
              )}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="font-medium text-foreground">
                {suggestion.display}
              </div>
            </div>
          ))}
        </div>
      )}

      {errors?.address && (
        <p className="text-sm text-red-500 mt-1">{errors.address}</p>
      )}
    </div>
  );
};