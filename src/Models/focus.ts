// src/Models/focus.ts

/** FocusSession represents one completed focus session   
 * Demonstrates Typescript's type system and class syntax, with properties and methods to manage focus sessions.    
 * 
 */
export interface FocusSession {
    id: string; // Unique identifier for the focus session
    taskName: string; // Name of the task being focused on
    durationSeconds: number; // Duration of the focus session in seconds
    startAt: number; 
    endAt: number;
}
export function formatDuration(totalSeconds: number): string {

    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
}