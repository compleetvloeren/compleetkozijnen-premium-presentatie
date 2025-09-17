import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, FileSpreadsheet, FileText, Loader2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project_type?: string;
  budget_range?: string;
  status: string;
  location?: string;
  timeline?: string;
  created_at: string;
  description?: string;
}

interface ExportOptionsProps {
  leads: Lead[];
  filteredLeads: Lead[];
  onExport: (format: 'csv' | 'excel', data: Lead[]) => Promise<void>;
  isExporting: boolean;
  className?: string;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({
  leads,
  filteredLeads,
  onExport,
  isExporting,
  className
}) => {
  const exportOptions = [
    {
      format: 'csv' as const,
      icon: FileText,
      label: 'CSV Export',
      description: 'Compatibel met Excel en andere spreadsheet programma\'s'
    },
    {
      format: 'excel' as const,
      icon: FileSpreadsheet,
      label: 'Excel Export',
      description: 'Volledig geformatteerd Excel bestand'
    }
  ];

  const generateFileName = (format: string) => {
    const date = new Date().toISOString().split('T')[0];
    const count = filteredLeads.length;
    return `compleet-kozijnen-leads-${date}-${count}items.${format}`;
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Export Leads</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exportOptions.map((option) => (
            <div key={option.format} className="space-y-2">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center space-y-2"
                onClick={() => onExport(option.format, filteredLeads)}
                disabled={isExporting || filteredLeads.length === 0}
              >
                {isExporting ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <option.icon className="h-6 w-6" />
                )}
                <div className="text-center">
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {option.description}
                  </div>
                </div>
              </Button>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Totaal leads:</span>
            <Badge variant="secondary">{leads.length}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Gefilterde leads:</span>
            <Badge variant="default">{filteredLeads.length}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Bestandsnaam:</span>
            <span className="text-xs font-mono truncate">
              {generateFileName('csv')}
            </span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>Export bevat alle zichtbare leads op dit moment</span>
          </div>
          <p>
            Het geëxporteerde bestand bevat alle lead informatie inclusief 
            contactgegevens, projectdetails en status.
          </p>
        </div>

        {filteredLeads.length === 0 && (
          <div className="text-center text-muted-foreground py-4">
            <Download className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Geen leads om te exporteren</p>
            <p className="text-xs">Pas je filters aan om leads te zien</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};