import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { dummySessions } from "../assets/asset";
import { useNavigate, Link } from "react-router-dom";
import EmptySessions from "../components/sessions/EmptySessions";
import SessionCard from "../components/sessions/SessionCard";

const Sessions = () => {
  const [sessions, setSessions] = useState(dummySessions);
  const [selectedSession, setSelectedSession] = useState(null);
  const navigate = useNavigate();

  const openSessionDetails = (sessionId) => {
    const session = sessions.find(
      (s) => s.id === sessionId || s.meetingId === sessionId,
    );

    if (session) {
      setSelectedSession(session);
    }
  };
  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
      <Link
        to="/dashboard"
        className="flex items-center text-sm gap-1 mb-4 text-white/80 hover:text-slate-900 transition-colors"
      >
        <ArrowLeftIcon size={14} /> Go to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-medium tracking-tight text-white/90">
          Meeting Sessions
        </h1>
      </div>

      {sessions.length === 0 ? (
        <EmptySessions />
      ) : (
        <div>
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onOpenDetails={openSessionDetails}
              onRejoin={(meetingId) => navigate(`/meeting/${meetingId}`)}
            />
          ))}
        </div>
      )}

      {/* Session Details */}
      <p>Session Detail Modal</p>
    </main>
  );
};

export default Sessions;
