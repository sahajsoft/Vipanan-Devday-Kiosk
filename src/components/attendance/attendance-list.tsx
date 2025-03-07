"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AddAttendeeModal } from "./add-attendee-modal";
import { Attendee } from "@/types/event";

// Mock data - in a real application, this would come from an API
const MOCK_ATTENDEES: Attendee[] = [
  {
    firstName: "Darren",
    lastName: "Mitchell",
    email: "darren@mistral.ai",
    orgName: "Mistral",
    linkedInProfile: "http://linkedin.com/in/darren-mitchell",
    isPresent: false,
    agreeToEmails: true,
  },
  {
    firstName: "Tom",
    lastName: "Chen",
    email: "tom@alloha.ai",
    orgName: "alloha.ai",
    linkedInProfile: "http://linkedin.com/in/tom-chen",
    isPresent: false,
    agreeToEmails: false,
  },
  {
    firstName: "Ilsa",
    lastName: "Rodriguez",
    email: "ilsa@missisipi.ai",
    orgName: "missisipi.ai",
    linkedInProfile: "http://linkedin.com/in/ilsa-rodriguez",
    isPresent: false,
    agreeToEmails: true,
  },
];

export function AttendanceList() {
  const [attendees, setAttendees] = useState<Attendee[]>(MOCK_ATTENDEES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddAttendee = (newAttendee: Omit<Attendee, 'isPresent'>) => {
    setAttendees(prev => [...prev, { ...newAttendee, isPresent: false }]);
  };

  const toggleAttendeePresence = (index: number) => {
    setAttendees(prev =>
      prev.map((attendee, i) =>
        i === index ? { ...attendee, isPresent: !attendee.isPresent } : attendee
      )
    );
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">DevDay Attendance</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-sahaj-violet px-4 py-2 text-white hover:bg-opacity-90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Attendee</span>
        </button>
      </div>

      <AttendanceTable 
        attendees={attendees} 
        onTogglePresence={toggleAttendeePresence} 
      />

      <AddAttendeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAttendee}
      />
    </div>
  );
}

interface AttendanceTableProps {
  attendees: Attendee[];
  onTogglePresence: (index: number) => void;
}

function AttendanceTable({ attendees, onTogglePresence }: AttendanceTableProps) {
  if (attendees.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] rounded-lg border-2 border-dashed">
        <p className="text-gray-500">No attendees registered yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <div className="grid grid-cols-12 gap-4 border-b bg-muted/50 p-4 font-medium">
        <div className="col-span-2">First Name</div>
        <div className="col-span-2">Last Name</div>
        <div className="col-span-2">Organization</div>
        <div className="col-span-2">Email</div>
        <div className="col-span-2">LinkedIn</div>
        <div className="col-span-2 text-right">Status</div>
      </div>

      {attendees.map((attendee, index) => (
        <AttendeeRow 
          key={`${attendee.email}-${index}`}
          attendee={attendee}
          onTogglePresence={() => onTogglePresence(index)}
        />
      ))}
    </div>
  );
}

interface AttendeeRowProps {
  attendee: Attendee;
  onTogglePresence: () => void;
}

function AttendeeRow({ attendee, onTogglePresence }: AttendeeRowProps) {
  return (
    <div className="grid grid-cols-12 gap-4 border-b p-4 last:border-0">
      <div className="col-span-2">{attendee.firstName}</div>
      <div className="col-span-2">{attendee.lastName}</div>
      <div className="col-span-2">{attendee.orgName}</div>
      <div className="col-span-2">
        <a href={`mailto:${attendee.email}`} className="text-sahaj-violet hover:underline">
          {attendee.email}
        </a>
      </div>
      <div className="col-span-2">
        {attendee.linkedInProfile && (
          <Link 
            href={attendee.linkedInProfile}
            className="text-sahaj-violet hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Profile
          </Link>
        )}
      </div>
      <div className="col-span-2 flex justify-end">
        <input
          type="checkbox"
          checked={attendee.isPresent}
          onChange={onTogglePresence}
          className="h-5 w-5 rounded border-gray-300 text-sahaj-violet focus:ring-sahaj-violet"
        />
      </div>
    </div>
  );
} 