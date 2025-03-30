import React, { useEffect } from 'react';
import useClock from '../../hooks/useClock';
import useAlarms from '../../hooks/useAlarms';
import AlarmPopup from '../AlarmPopup';
import AlarmControls from '../AlarmControls';
import './styles.css';

const AnalogClock: React.FC = () => {
    const time = useClock();
    const { alarms, addAlarm, showAlarm, dismissAlarm, snoozeAlarm, checkAlarms } = useAlarms();

    useEffect(() => {
        checkAlarms(time);
    }, [time, checkAlarms]);

    const secondsDegrees = time.getSeconds() * 6;
    const minutesDegrees = time.getMinutes() * 6 + time.getSeconds() * 0.1;
    const hoursDegrees = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5;

    const ClockNumbers = () => {
        const numbers = [];
        for (let i = 1; i <= 12; i++) {
            const rotation = i * 30;
            numbers.push(
                <div key={i} className="number" style={{ transform: `rotate(${rotation}deg)` }}>
                    <span style={{ transform: `rotate(-${rotation}deg)` }}>{i}</span>
                </div>
            );
        }
        return numbers;
    }

    return (
        <div className="clock-container">
            <div className="clock">
                <div className="hand hour" style={{ transform: `rotate(${hoursDegrees}deg)` }} />
                <div className="hand minute" style={{ transform: `rotate(${minutesDegrees}deg)` }} />
                <div className="hand second" style={{ transform: `rotate(${secondsDegrees}deg)` }} />
                { ClockNumbers() }
            </div>

            <AlarmControls alarms={alarms} addAlarm={addAlarm} />

            {showAlarm && (
                <AlarmPopup
                    alarm={showAlarm}
                    onDismiss={dismissAlarm}
                    onSnooze={snoozeAlarm}
                />
            )}
        </div>
    );
};

export default AnalogClock;
