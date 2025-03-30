import React from 'react';
import './styles.css';
import { Alarm } from '../../hooks/useAlarms';

interface AlarmPopupProps {
    alarm: Alarm;
    onDismiss: () => void;
    onSnooze: () => void;
}

const AlarmPopup: React.FC<AlarmPopupProps> = ({ alarm, onDismiss, onSnooze }) => {
    return (
        <div className="alarm-popup">
            <div className="alarm-popup-content">
                <p>⏰ Alarm! {alarm.time}</p>
                {alarm.snoozeCount < 3 && (
                    <button onClick={onSnooze}>
                        Snooze 5 min ({3 - alarm.snoozeCount} left)
                    </button>
                )}
                <button onClick={onDismiss}>Dismiss</button>
            </div>
        </div>
    );
};

export default AlarmPopup;
