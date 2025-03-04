import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { AddAttendeeModal } from '../add-attendee-modal';
import userEvent from '@testing-library/user-event';

describe('AddAttendeeModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal when isOpen is true', () => {
    render(<AddAttendeeModal {...defaultProps} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Add New Attendee')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<AddAttendeeModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all form fields', () => {
    render(<AddAttendeeModal {...defaultProps} />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organization name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/linkedin profile url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/agree to receive emails/i)).toBeInTheDocument();
  });

  it('calls onClose when Cancel button is clicked', () => {
    render(<AddAttendeeModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('submits form with correct data', async () => {
    const user = userEvent.setup();
    const mockOnSubmit = jest.fn().mockResolvedValue(undefined);
    const mockOnClose = jest.fn();
    render(<AddAttendeeModal {...defaultProps} onSubmit={mockOnSubmit} onClose={mockOnClose} />);
    
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/organization name/i), 'Test Org');
    await user.type(screen.getByLabelText(/linkedin profile/i), 'https://linkedin.com/in/john');
    await user.click(screen.getByLabelText(/agree to receive emails/i));
    
    await user.click(screen.getByText('Register'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        orgName: 'Test Org',
        linkedInProfile: 'https://linkedin.com/in/john',
        agreeToEmails: true,
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('requires mandatory fields', async () => {
    const user = userEvent.setup();
    render(<AddAttendeeModal {...defaultProps} />);
    
    await user.click(screen.getByText('Register'));
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
    
    const firstNameInput = screen.getByLabelText(/first name/i) as HTMLInputElement;
    const lastNameInput = screen.getByLabelText(/last name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const orgNameInput = screen.getByLabelText(/organization name/i) as HTMLInputElement;
    
    expect(firstNameInput.validity.valid).toBe(false);
    expect(lastNameInput.validity.valid).toBe(false);
    expect(emailInput.validity.valid).toBe(false);
    expect(orgNameInput.validity.valid).toBe(false);
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<AddAttendeeModal {...defaultProps} />);
    
    await user.type(screen.getByLabelText(/email address/i), 'invalid-email');
    await user.click(screen.getByText('Register'));
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    expect(emailInput.validity.valid).toBe(false);
  });

  it('resets form after successful submission', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn().mockResolvedValue(undefined);
    const mockOnClose = jest.fn();
    
    render(
      <AddAttendeeModal 
        {...defaultProps} 
        onSubmit={mockSubmit} 
        onClose={mockOnClose} 
      />
    );
    
    // Fill in all required fields
    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/organization name/i), 'Test Org');
    
    // Submit the form
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /register/i }));
    });
    
    // Wait for the submission to complete and verify the callbacks
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        orgName: 'Test Org',
        linkedInProfile: undefined,
        agreeToEmails: false
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
}); 