import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from '@/components/BackButton';
import * as navigationHook from '@/hooks/useNavigation';

// Mock the useNavigation hook
jest.mock('@/hooks/useNavigation', () => ({
  useNavigation: jest.fn(),
}));

describe('BackButton', () => {
  const mockGoBack = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    (navigationHook.useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
      canGoBack: true,
    });
  });

  it('renders correctly with default props', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /back/i });
    
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Back');
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('calls goBack when clicked', () => {
    render(<BackButton />);
    const button = screen.getByRole('button', { name: /back/i });
    
    fireEvent.click(button);
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('doesn\'t render when canGoBack is false', () => {
    (navigationHook.useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
      canGoBack: false,
    });
    
    const { container } = render(<BackButton />);
    expect(container.firstChild).toBeNull();
  });

  it('uses custom label when provided', () => {
    render(<BackButton label="Go Back" />);
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<BackButton showLabel={false} />);
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  it('calls custom back handler when provided', () => {
    const customBackHandler = jest.fn();
    render(<BackButton onCustomBack={customBackHandler} />);
    
    const button = screen.getByRole('button', { name: /back/i });
    fireEvent.click(button);
    
    expect(customBackHandler).toHaveBeenCalledTimes(1);
    expect(mockGoBack).not.toHaveBeenCalled();
  });

  it('renders even when canGoBack is false if onCustomBack is provided', () => {
    (navigationHook.useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
      canGoBack: false,
    });
    
    const customBackHandler = jest.fn();
    render(<BackButton onCustomBack={customBackHandler} />);
    
    const button = screen.getByRole('button', { name: /back/i });
    expect(button).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<BackButton className="custom-class" />);
    const button = screen.getByRole('button', { name: /back/i });
    expect(button).toHaveClass('custom-class');
  });
}); 