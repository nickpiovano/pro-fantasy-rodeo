import React from 'react';
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button-new";
import { Plus } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  actionIcon = <Plus className="h-4 w-4 mr-2" />,
  onAction,
  className = '',
}) => {
  return (
    <Card className={`border-2 border-red-600 mb-6 overflow-hidden shadow-lg ${className}`}>
      <CardHeader className="bg-gradient-to-r from-red-700 to-red-600 text-white p-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && (
              <p className="text-red-100 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          
          {actionLabel && onAction && (
            <Button 
              variant="secondary"
              className="bg-white text-red-700 hover:bg-gray-100"
              onClick={onAction}
              leftIcon={actionIcon}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
};

export default PageHeader; 