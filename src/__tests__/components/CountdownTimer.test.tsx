import { render, screen } from '@testing-library/react';
import CountdownTimer from '@/components/CountdownTimer';

describe('CountdownTimer', () => {
  beforeEach(() => {
    // Mock Date.now to return a consistent date for testing
    jest.spyOn(Date, 'now').mockImplementation(() => new Date('2024-07-01').getTime());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the timer correctly with default props', () => {
    render(<CountdownTimer />);
    
    // Check if the default label is rendered
    expect(screen.getByText('Contest Ends In:')).toBeInTheDocument();
    
    // Check if time units are displayed
    expect(screen.getByText('Days')).toBeInTheDocument();
    expect(screen.getByText('Hrs')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<CountdownTimer label="Custom Timer Label" />);
    expect(screen.getByText('Custom Timer Label')).toBeInTheDocument();
  });

  it('renders with custom endDate', () => {
    // Set end date to exactly 5 days from mocked current date
    const endDate = new Date('2024-07-06');
    render(<CountdownTimer endDate={endDate} />);
    
    // Find the days value (should be 5)
    const daysElement = screen.getAllByText(/\d+/)[0];
    expect(daysElement.textContent).toBe('05');
  });

  it('calls onComplete when timer ends', () => {
    // Mock the timer to be in the past
    const pastDate = new Date('2024-06-30');
    const onCompleteMock = jest.fn();
    
    render(<CountdownTimer endDate={pastDate} onComplete={onCompleteMock} />);
    
    // onComplete should be called for past dates
    expect(onCompleteMock).toHaveBeenCalled();
    
    // All time values should be zero
    const timeValues = screen.getAllByText('00');
    expect(timeValues.length).toBe(4); // days, hours, minutes, seconds
  });

  it('applies custom className', () => {
    render(<CountdownTimer className="custom-class" />);
    const container = screen.getByText('Contest Ends In:').closest('div');
    expect(container).toHaveClass('custom-class');
  });
}); 