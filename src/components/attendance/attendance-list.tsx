"use client";

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AddAttendeeModal } from "./add-attendee-modal";

interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  orgName: string;
  linkedInProfile?: string;
  isPresent: boolean;
}

const mockAttendees: Attendee[] = [
  {
    firstName: "Darren",
    lastName: "Mitchell",
    email: "darren@mistral.ai",
    orgName: "Mistral",
    linkedInProfile: "http://djjd",
    isPresent: false,
  },
  {
    firstName: "Tom",
    lastName: "Chen",
    email: "tom@alloha.ai",
    orgName: "alloha.ai",
    linkedInProfile: "http://djjd",
    isPresent: false,
  },
  {
    firstName: "Ilsa",
    lastName: "Rodriguez",
    email: "ilsa@missisipi.ai",
    orgName: "missisipi.ai",
    linkedInProfile: "http://djjd",
    isPresent: false,
  },
];

export function AttendanceList() {
  const [attendees, setAttendees] = React.useState(mockAttendees);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAddAttendee = (newAttendee: Omit<Attendee, 'isPresent'>) => {
    setAttendees(prev => [...prev, { ...newAttendee, isPresent: false }]);
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
          <div
            key={index}
            className="grid grid-cols-12 gap-4 border-b p-4 last:border-0"
          >
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
                onChange={() => {
                  setAttendees(prev =>
                    prev.map((a, i) =>
                      i === index ? { ...a, isPresent: !a.isPresent } : a
                    )
                  );
                }}
                className="h-5 w-5 rounded border-gray-300 text-sahaj-violet focus:ring-sahaj-violet"
              />
            </div>
          </div>
        ))}
      </div>

      <AddAttendeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAttendee}
      />
    </div>
  );
} 