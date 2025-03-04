import { AttendanceList } from "@/components/attendance/attendance-list";
import Band from "@/components/layout/band";
import Navbar from "@/components/layout/navbar";

interface EventPageProps {
  params: {
    id: string;
  };
}

export default function EventPage({ params }: EventPageProps) {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Band text="DevDay Attendance" backUrl="/" />
      <AttendanceList />
    </main>
  );
} 