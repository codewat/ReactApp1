// src/components/FocusControls.tsx
import React from 'react';

interface FocusControlsProps {
    taskInput: string;
    isRunning: boolean;
    onTaskChange: (value: string) => void;
    onStart: () => void;
    onStop: () => void;
   // onReset: () => void;
}
/** FocusControls component provides the user interface for starting and stopping focus sessions. for the user 
 * input + Start/Stop buttons. It receives props to manage the task input and session state, and calls the appropriate handlers when buttons are clicked.
 * event handlers for starting and stopping focus sessions, as well as managing the task input state. It also conditionally renders the Start and Stop buttons based on whether a session is currently running.
 onChange, onClick 
*/
 export function FocusControls({
    taskInput, isRunning, onTaskChange, onStart, onStop }: 
    FocusControlsProps) {
        const canStart = taskInput.trim() !== '' && !isRunning;

        function handleSubmit(e: React.FormEvent) {
            e.preventDefault();
            if (canStart) 
                onStart();
        }

    return (
        <form className="controls" onSubmit={handleSubmit}>
            <label className="label" htmlFor='taskName'>
                Task Name:
            </label>
                <input
                    id="taskName"
                    className ="input"
                    type="text"
                    value={taskInput} 
                    onChange={(e) => onTaskChange(e.target.value)}
                        placeholder="Study React Hooks"
                        disabled={isRunning}
                    />
                    <div className="buttonRow">
    <button 
        className={`btn ${canStart ? 'active-start' : 'disabled-btn'}`} 
        type="submit" 
        disabled={!canStart}
    >
        Start
    </button>
    
    <button 
        className={`btn ${isRunning ? 'active-stop' : 'disabled-btn'}`} 
        type="button" 
        onClick={onStop} 
        disabled={!isRunning}
    >
        Stop
    </button>
</div>
        </form>
    );
    }
               
    
export default FocusControls;