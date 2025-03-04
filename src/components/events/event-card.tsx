"use client";

import { DevDayEvent } from "@/types/event";
import { Calendar, MapPin, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: DevDayEvent;
}

export function EventCard({ event }: EventCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/events/${event.id}`)}
      className="group cursor-pointer rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-sahaj-purple group-hover:text-sahaj-violet">
          {event.title}
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-sm ${
            event.status === "upcoming"
              ? "bg-blue-100 text-blue-700"
              : event.status === "ongoing"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
        </span>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="h-4 w-4" />
          <span>{event.attendeeCount} Attendees</span>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-gray-600">{event.description}</p>
    </div>
  );
} 