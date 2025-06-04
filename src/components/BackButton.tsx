import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/useNavigation';
import { ButtonVariant, ButtonSize } from '@/components/ui/button-new';

interface BackButtonProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  showLabel?: boolean;
  onCustomBack?: () => void;
}

const BackButton = ({
  className = '',
  variant = 'ghost',
  size = 'md',
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
      leftIcon={<ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />}
    >
      {showLabel && label}
    </Button>
  );
};

export default BackButton; 