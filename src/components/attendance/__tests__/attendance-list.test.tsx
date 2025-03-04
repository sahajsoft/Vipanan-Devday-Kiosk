import { render, screen, fireEvent } from '@testing-library/react';
import { AttendanceList } from '../attendance-list';

describe('AttendanceList Component', () => {
  it('renders the attendance list header', () => {
    render(<AttendanceList />);
    expect(screen.getByText('DevDay Attendance')).toBeInTheDocument();
  });

  it('renders the add attendee button', () => {
    render(<AttendanceList />);
    const addButton = screen.getByRole('button', { name: /add attendee/i });
    expect(addButton).toBeInTheDocument();
  });

  it('renders table headers correctly', () => {
    render(<AttendanceList />);
    const headers = ['First Name', 'Last Name', 'Organization', 'Email', 'LinkedIn', 'Status'];
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('renders mock attendees', () => {
    render(<AttendanceList />);
    expect(screen.getByText('Darren')).toBeInTheDocument();
    expect(screen.getByText('Mitchell')).toBeInTheDocument();
    expect(screen.getByText('Mistral')).toBeInTheDocument();
  });

  it('opens modal when add button is clicked', () => {
    render(<AttendanceList />);
    const addButton = screen.getByRole('button', { name: /add attendee/i });
    fireEvent.click(addButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('toggles attendance status when checkbox is clicked', () => {
    render(<AttendanceList />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('renders email as clickable link', () => {
    render(<AttendanceList />);
    const emailLink = screen.getByRole('link', { name: 'darren@mistral.ai' });
    expect(emailLink).toHaveAttribute('href', 'mailto:darren@mistral.ai');
  });

  it('renders LinkedIn profile as clickable link when available', () => {
    render(<AttendanceList />);
    const linkedInLinks = screen.getAllByText('View Profile');
    expect(linkedInLinks[0]).toHaveAttribute('target', '_blank');
    expect(linkedInLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });
}); 