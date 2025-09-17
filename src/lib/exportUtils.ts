// Export utility functions for leads data

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
  project_details?: string;
  preferred_contact_method?: string;
  preferred_contact_time?: string;
  special_requirements?: string;
  notes?: string;
}

// Convert leads data to CSV format
export const convertToCSV = (leads: Lead[]): string => {
  const headers = [
    'ID',
    'Naam',
    'Email',
    'Telefoon',
    'Bedrijf',
    'Project Type',
    'Budget Range',
    'Status',
    'Locatie',
    'Timeline',
    'Aangemaakt',
    'Beschrijving',
    'Project Details',
    'Contact Methode',
    'Contact Tijd',
    'Speciale Wensen',
    'Notities'
  ];

  const rows = leads.map(lead => [
    lead.id,
    lead.name,
    lead.email,
    lead.phone || '',
    lead.company || '',
    getProjectTypeLabel(lead.project_type),
    getBudgetLabel(lead.budget_range),
    getStatusLabel(lead.status),
    lead.location || '',
    lead.timeline || '',
    formatDate(lead.created_at),
    cleanForCSV(lead.description || ''),
    cleanForCSV(lead.project_details || ''),
    lead.preferred_contact_method || '',
    lead.preferred_contact_time || '',
    cleanForCSV(lead.special_requirements || ''),
    cleanForCSV(lead.notes || '')
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  return csvContent;
};

// Create and download CSV file
export const downloadCSV = (csvContent: string, filename: string): void => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Generate Excel-compatible CSV (with BOM for UTF-8)
export const downloadExcelCSV = (leads: Lead[], filename: string): void => {
  const csvContent = convertToCSV(leads);
  // Add BOM for proper UTF-8 encoding in Excel
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Helper function to clean text for CSV (escape quotes, remove newlines)
const cleanForCSV = (text: string): string => {
  return text
    .replace(/"/g, '""') // Escape quotes
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .replace(/\r/g, ' ') // Replace carriage returns
    .trim();
};

// Helper function to format dates
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to get readable project type labels
const getProjectTypeLabel = (type?: string): string => {
  switch (type) {
    case 'ramen': return 'Ramen';
    case 'deuren': return 'Deuren';
    case 'schuifdeuren': return 'Schuifdeuren';
    case 'renovatie': return 'Renovatie';
    case 'nieuwbouw': return 'Nieuwbouw';
    default: return type || 'Onbekend';
  }
};

// Helper function to get readable budget labels
const getBudgetLabel = (budget?: string): string => {
  switch (budget) {
    case 'tot_5k': return '< €5.000';
    case '5k_15k': return '€5.000 - €15.000';
    case '15k_30k': return '€15.000 - €30.000';
    case 'boven_30k': return '> €30.000';
    default: return budget || 'Niet opgegeven';
  }
};

// Helper function to get readable status labels
const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'nieuw': return 'Nieuw';
    case 'in_behandeling': return 'In Behandeling';
    case 'offerte_verstuurd': return 'Offerte Verstuurd';
    case 'gewonnen': return 'Gewonnen';
    case 'verloren': return 'Verloren';
    default: return status;
  }
};

// Generate filename with current date and lead count
export const generateExportFilename = (leads: Lead[], format: 'csv' | 'excel'): string => {
  const date = new Date().toISOString().split('T')[0];
  const count = leads.length;
  const extension = format === 'excel' ? 'xlsx' : 'csv';
  return `compleet-kozijnen-leads-${date}-${count}items.${extension}`;
};

// Main export function
export const exportLeads = async (leads: Lead[], format: 'csv' | 'excel'): Promise<void> => {
  try {
    const filename = generateExportFilename(leads, format);
    
    if (format === 'csv' || format === 'excel') {
      // For now, both formats use CSV (can be extended to true Excel format later)
      downloadExcelCSV(leads, filename);
    }
    
    // Log export activity
    console.log(`Exported ${leads.length} leads as ${format.toUpperCase()}`, {
      filename,
      leadCount: leads.length,
      format,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Export failed:', error);
    throw new Error('Export mislukt. Probeer het opnieuw.');
  }
};

export default {
  convertToCSV,
  downloadCSV,
  downloadExcelCSV,
  exportLeads,
  generateExportFilename
};