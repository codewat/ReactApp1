// src/components/SessionList.tsx

import  type{ FocusSession } from '../Models/focus'; 
import { formatDuration } from '../Models/focus';

interface SessionListProps {
    sessions: FocusSession[];
}
/** SessionList component displays a list of completed focus sessions. It receives an array of FocusSession objects as props and renders each session's task name, duration, and timestamps in a user-friendly format. */
export function SessionList({ sessions }: SessionListProps) {
    return (
        <section className="sessionCard">
            <h2 className="sessionTitle">Session History</h2>
            

            {sessions.length === 0 ? (
                <p className="empty"> No completed sessions yet. Start one if you like!</p>
            ) : (
                <ul className="sessionList">
                    {sessions.map((s) => (
                        <li className="sessionItem" key={s.id}>
                            <div className="sessionTask">{s.taskName}</div>
                            <div className="sessionMeta">
                                Duration: <strong>{s.durationSeconds}s</strong>
                                <span className="muted"> ({formatDuration(s.durationSeconds)})</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default SessionList;