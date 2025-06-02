import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/useNavigation';

interface BackButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  label?: string;
  showLabel?: boolean;
  onCustomBack?: () => void;
}

const BackButton = ({
  className = '',
  variant = 'ghost',
  size = 'default',
  label = 'Back',
  showLabel = true,
  onCustomBack
}: BackButtonProps) => {
  const { goBack, canGoBack } = useNavigation();

  if (!canGoBack && !onCustomBack) return null;

  const handleClick = () => {
    if (onCustomBack) {
      onCustomBack();
    } else {
      goBack();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={`group ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform" />
      {showLabel && <span>{label}</span>}
    </Button>
  );
};

export default BackButton; 