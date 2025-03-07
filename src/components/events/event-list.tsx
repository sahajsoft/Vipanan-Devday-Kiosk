"use client";

import { DevDayEvent } from "@/types/event";
import { EventCard } from "./event-card";
import { useMemo, useState } from "react";

// Status priority for sorting
const STATUS_PRIORITY: Record<string, number> = {
  ongoing: 1,
  upcoming: 2,
  completed: 3,
};

type StatusFilter = 'all' | 'ongoing' | 'upcoming' | 'completed';

// Mock data - in a real application, this would come from an API
const MOCK_EVENTS: DevDayEvent[] = [
  {
    id: "1",
    title: "DevDay 2024 - Q1",
    date: "March 15, 2024",
    location: "Bangalore Office",
    description: "Join us for an exciting day of technical discussions, workshops, and networking with fellow developers.",
    attendeeCount: 45,
    status: "upcoming",
  },
  {
    id: "2",
    title: "DevDay 2023 - Q4",
    date: "December 10, 2023",
    location: "Virtual Event",
    description: "End-of-year DevDay featuring presentations on our latest technical achievements and future roadmap.",
    attendeeCount: 78,
    status: "completed",
  },
  {
    id: "3",
    title: "DevDay 2023 - Q3",
    date: "September 22, 2023",
    location: "Mumbai Office",
    description: "A special edition DevDay focusing on AI and machine learning innovations within our teams.",
    attendeeCount: 62,
    status: "completed",
  },
  {
    id: "4",
    title: "DevDay 2024 - Q2",
    date: "April 15, 2024",
    location: "Mumbai Office",
    description: "Quarterly DevDay event focusing on latest developments and innovations.",
    attendeeCount: 55,
    status: "ongoing",
  },
];

export function EventList() {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  const filteredEvents = useMemo(() => {
    // First, filter events if a status is selected
    const filtered = selectedStatus === 'all' 
      ? MOCK_EVENTS 
      : MOCK_EVENTS.filter(event => event.status === selectedStatus);

    // Then sort by status priority and date
    return filtered.sort((a, b) => {
      // First sort by status priority
      const statusDiff = STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
      if (statusDiff !== 0) return statusDiff;
      
      // If status is the same, sort by date (most recent first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [selectedStatus]);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-sahaj-purple">DevDay Events</h1>
        <p className="mt-2 text-gray-600">
          Select an event to manage attendance and view details
        </p>
      </div>

      {/* Status filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <StatusFilterButton 
          status="all" 
          label="All Events"
          selectedStatus={selectedStatus} 
          onClick={() => setSelectedStatus('all')} 
        />
        <StatusFilterButton 
          status="ongoing" 
          label="Ongoing"
          selectedStatus={selectedStatus} 
          onClick={() => setSelectedStatus('ongoing')} 
        />
        <StatusFilterButton 
          status="upcoming" 
          label="Upcoming"
          selectedStatus={selectedStatus} 
          onClick={() => setSelectedStatus('upcoming')} 
        />
        <StatusFilterButton 
          status="completed" 
          label="Completed"
          selectedStatus={selectedStatus} 
          onClick={() => setSelectedStatus('completed')} 
        />
      </div>

      {filteredEvents.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

interface StatusFilterButtonProps {
  status: StatusFilter;
  label: string;
  selectedStatus: StatusFilter;
  onClick: () => void;
}

function StatusFilterButton({ status, label, selectedStatus, onClick }: StatusFilterButtonProps) {
  const getButtonStyles = () => {
    if (status === 'all') {
      return selectedStatus === 'all'
        ? 'bg-sahaj-purple text-white'
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
    if (status === 'ongoing') {
      return selectedStatus === 'ongoing'
        ? 'bg-green-600 text-white'
        : 'bg-green-100 text-green-700 hover:bg-green-200';
    }
    if (status === 'upcoming') {
      return selectedStatus === 'upcoming'
        ? 'bg-blue-600 text-white'
        : 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    }
    return selectedStatus === 'completed'
      ? 'bg-gray-600 text-white'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm transition-colors ${getButtonStyles()}`}
    >
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[200px] rounded-lg border-2 border-dashed">
      <p className="text-gray-500">No events found for the selected status</p>
    </div>
  );
} 