import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbPage, 
  BreadcrumbSeparator,
  BreadcrumbEllipsis 
} from '@/components/ui/breadcrumb';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbData {
  label: string;
  href?: string;
}

interface ResponsiveBreadcrumbProps {
  items?: BreadcrumbData[];
  maxVisibleItems?: number;
}

const ResponsiveBreadcrumb: React.FC<ResponsiveBreadcrumbProps> = ({ 
  items, 
  maxVisibleItems = 2 
}) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from URL if items not provided
  const generateBreadcrumbs = (): BreadcrumbData[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbData[] = [
      { label: 'Home', href: '/' }
    ];

    // Build breadcrumbs from URL path
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Custom labels for common paths
      let label = segment;
      switch (segment) {
        case 'producten':
          label = 'Producten';
          break;
        case 'gealan':
          label = 'GEALAN';
          break;
        case 'schueco':
          label = 'SCHÜCO';
          break;
        case 's9000-base':
          label = 'S-9000 Base';
          break;
        case 's9000-haax':
          label = 'S-9000 Haax';
          break;
        case 's9000-slim':
          label = 'S-9000 Slim';
          break;
        case 's9000-styl':
          label = 'S-9000 Styl';
          break;
        case 'ramen':
          label = 'Raamsystemen';
          break;
        case 'deuren':
          label = 'Deursystemen';
          break;
        case 'schuifdeuren':
          label = 'Schuifdeuren';
          break;
        case 'over-ons':
          label = 'Over Ons';
          break;
        case 'contact':
          label = 'Contact';
          break;
        case 'offerte':
          label = 'Offerte';
          break;
        case 'service':
          label = 'Service';
          break;
        default:
          // Capitalize and replace hyphens
          label = segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }

      // Don't include href for the last item (current page)
      const isLastItem = index === pathSegments.length - 1;
      breadcrumbs.push({
        label,
        href: isLastItem ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = items || generateBreadcrumbs();

  // Always show the last maxVisibleItems, with ellipsis if needed
  const shouldShowEllipsis = breadcrumbs.length > maxVisibleItems;
  const visibleBreadcrumbs = breadcrumbs.slice(-maxVisibleItems); // Take last N items

  // Check if we need to insert ellipsis
  const needsEllipsis = shouldShowEllipsis && breadcrumbs.length > maxVisibleItems;
  const showEllipsisAtStart = needsEllipsis;

  return (
    <div className="bg-background border-b border-border/40 relative z-30 mt-16 md:mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Show ellipsis at start if needed */}
            {showEllipsisAtStart && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              </>
            )}

            {visibleBreadcrumbs.map((breadcrumb, index) => {
              const isLast = index === visibleBreadcrumbs.length - 1;
              
              return (
                <React.Fragment key={`breadcrumb-${index}`}>
                  <BreadcrumbItem>
                    {breadcrumb.href ? (
                      <BreadcrumbLink asChild>
                        <Link 
                          to={breadcrumb.href}
                          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <span>{breadcrumb.label}</span>
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="font-medium">
                        {breadcrumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  
                  {/* Regular separator */}
                  {!isLast && (
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default ResponsiveBreadcrumb;