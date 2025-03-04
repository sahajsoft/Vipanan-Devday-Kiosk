export interface DevDayEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendeeCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  orgName: string;
  linkedInProfile?: string;
  isPresent: boolean;
  agreeToEmails?: boolean;
} 