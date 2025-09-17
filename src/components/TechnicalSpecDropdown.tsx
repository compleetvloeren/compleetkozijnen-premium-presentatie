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
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="specs" className="border-0">
          <AccordionTrigger className="py-2 px-0 hover:no-underline text-white/90 hover:text-white text-sm">
            <span className="text-left">{title}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-2">
            <div className="space-y-2">
              {specs.map((spec) => (
                <div key={spec.key} className="border-b border-white/10 pb-2 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <span className="text-white/70 text-xs font-medium">
                      {spec.hasTooltip ? (
                        <TechnicalTooltip {...getTechnicalTerm(spec.key)}>
                          <span>{spec.label}</span>
                        </TechnicalTooltip>
                      ) : (
                        spec.label
                      )}
                    </span>
                    <span className="text-right font-semibold text-white text-xs max-w-xs">{spec.value}</span>
                  </div>
                  {spec.description && (
                    <p className="text-xs text-white/60 leading-relaxed mt-1">{spec.description}</p>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TechnicalSpecDropdown;