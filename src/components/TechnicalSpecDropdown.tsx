import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import TechnicalTooltip from '@/components/TechnicalTooltip';
import { getTechnicalTerm } from '@/lib/technicalGlossary';

interface TechnicalSpec {
  key: string;
  label: string;
  value: string;
  description?: string;
  hasTooltip?: boolean;
}

interface TechnicalSpecDropdownProps {
  title: string;
  specs: TechnicalSpec[];
}

const TechnicalSpecDropdown = ({ title, specs }: TechnicalSpecDropdownProps) => {
  return (
    <Card className="card-tesla">
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="specs" className="border-0">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <h3 className="text-title">{title}</h3>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-4">
                {specs.map((spec) => (
                  <div key={spec.key} className="border-b border-border/30 pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-muted-foreground font-medium">
                        {spec.hasTooltip ? (
                          <TechnicalTooltip {...getTechnicalTerm(spec.key)}>
                            <span>{spec.label}</span>
                          </TechnicalTooltip>
                        ) : (
                          spec.label
                        )}
                      </span>
                      <span className="text-right font-semibold max-w-xs">{spec.value}</span>
                    </div>
                    {spec.description && (
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">{spec.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TechnicalSpecDropdown;