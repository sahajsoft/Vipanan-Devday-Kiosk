import { render, screen, fireEvent } from '@testing-library/react';
import Band from '../band';
import { ConfirmationContext } from '@/context/confirmation-context';

// Mock the router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('Band Component', () => {
  const defaultProps = {
    text: 'Test Band',
    backUrl: '/back',
  };

  const renderWithContext = (props: any, contextValue = { ask: false, change: jest.fn() }) => {
    return render(
      <ConfirmationContext.Provider value={contextValue}>
        <Band {...props} />
      </ConfirmationContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the band text correctly', () => {
    renderWithContext(defaultProps);
    expect(screen.getByText('Test Band')).toBeInTheDocument();
  });

  it('renders back button when backUrl is provided', () => {
    renderWithContext(defaultProps);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not render back button when backUrl is null', () => {
    renderWithContext({ ...defaultProps, backUrl: null });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('navigates directly when confirmation is not required', () => {
    renderWithContext(defaultProps);
    fireEvent.click(screen.getByRole('button'));
    expect(mockPush).toHaveBeenCalledWith('/back');
  });

  it('shows confirmation when required', () => {
    renderWithContext(defaultProps, { ask: true, change: jest.fn() });
    fireEvent.click(screen.getByRole('button'));
    // Add assertions for confirmation modal when implemented
  });

  it('applies correct styling', () => {
    renderWithContext(defaultProps);
    const band = screen.getByRole('header-band');
    expect(band).toHaveClass('h-[6.375rem]', 'bg-sahaj-purple');
  });
}); 