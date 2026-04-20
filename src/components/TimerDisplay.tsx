// src/components/TimerDisplay.tsx

import { formatDuration } from '../Models/focus';

interface TimerDisplayProps {
    seconds: number;
    isRunning: boolean;
}
/** TimerDisplay component shows the current focus session's task name and elapsed time. It receives props for the elapsed time in seconds and the task name, and uses the formatDuration function to display the time in a user-friendly format. */
export function TimerDisplay({ seconds, isRunning }: TimerDisplayProps) {
    return (
        <section className="timeCard" aria-live='polite'>
            <div className="timerTop">
                <h2 className="timerTitle">Live Timer</h2>
                <span className={`statusDot ${isRunning ? 'on' : 'off'}`}></span>
                {isRunning ? 'Running' : 'Stopped'}
                </div> 
            <div className="timerValue">
                {seconds}s <span className="timerPretty">({formatDuration(seconds)})</span>
                
                </div>
                
        
        </section>
      
    );
}

export default TimerDisplay;