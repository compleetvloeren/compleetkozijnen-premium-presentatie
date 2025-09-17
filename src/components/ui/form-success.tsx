import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FormSuccessProps {
  title: string;
  description: string;
  nextActions?: Array<{
    label: string;
    href: string;
    variant?: 'default' | 'outline';
  }>;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({
  title,
  description,
  nextActions = []
}) => {
  return (
    <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
      <CardContent className="p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-900 dark:text-green-100 mb-2">
            {title}
          </h3>
          <p className="text-green-700 dark:text-green-200">
            {description}
          </p>
        </div>

        {nextActions.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-green-600 dark:text-green-300 mb-4">
              Wat wilt u nu doen?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {nextActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Button 
                    variant={action.variant || 'default'} 
                    className="w-full sm:w-auto"
                  >
                    {action.label}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};