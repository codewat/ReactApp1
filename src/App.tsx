// src/App.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { FocusControls } from "./components/FocusControls";
import { SessionList } from "./components/SessionList";
import { TimerDisplay } from "./components/TimerDisplay";
import type { FocusSession } from "./Models/focus";
import { formatDuration } from "./Models/focus";

/**
 * App demonstrates:
 * - useState for state management
 * - useEffect for timer lifecycle (start/stop/cleanup)
 * - TypeScript interfaces for sessions
 * - Rendering lists from state
 */
export default function App() {
  const [taskInput, setTaskInput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [activeTaskName, setActiveTaskName] = useState<string>("");
  const [sessions, setSessions] = useState<FocusSession[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const totalFocusedSeconds = useMemo(() => {
    return sessions.reduce((sum, s) => sum + s.durationSeconds, 0);
  }, [sessions]);

  function startSession() {
    const trimmed = taskInput.trim();
    if (!trimmed) return;

    setIsRunning(true);
    setActiveTaskName(trimmed);
    setElapsedSeconds(0);
    startTimeRef.current = Date.now();
  }

  function stopSession() {
    if (!isRunning) return;

    const endAt = Date.now();
    const startAt = startTimeRef.current ?? endAt;

    const finalDuration = Math.max(
      0,
      Math.floor((endAt - startAt) / 1000)
    );

    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(endAt);

    const newSession: FocusSession = {
      id,
      taskName: activeTaskName || taskInput.trim() || "Untitled Task",
      durationSeconds: finalDuration,
      startAt,
      endAt,
    };

    setSessions((prev) => [newSession, ...prev]);

    setIsRunning(false);
    setElapsedSeconds(0);
    setActiveTaskName("");
    setTaskInput("");
    startTimeRef.current = null;
  }

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      const startedAt = startTimeRef.current;
      if (startedAt !== null) {
        const seconds = Math.floor((Date.now() - startedAt) / 1000);
        setElapsedSeconds(seconds);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  return (
    <main className="app">
      <h1>Focus Tracker</h1>

      <p className="subtitle">
        Track your focus sessions and review completed work.
      </p>

      <FocusControls
        taskInput={taskInput}
        onTaskChange={setTaskInput}
        isRunning={isRunning}
        onStart={startSession}
        onStop={stopSession}
      />

      <TimerDisplay
        seconds={elapsedSeconds}
        isRunning={isRunning}
       // activeTaskName={activeTaskName}
      />

      <section className="summaryCard">
        <h2>Total Focus Time</h2>
        <p>{formatDuration(totalFocusedSeconds)}</p>
      </section>

      <SessionList sessions={sessions} />
    </main>
  );
}