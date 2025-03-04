import { EventList } from "@/components/events/event-list";
import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <EventList />
    </main>
  );
}
