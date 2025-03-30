import React, { useRef, useState } from 'react';
import { Alarm } from '../../hooks/useAlarms';
import './styles.css';

interface AlarmControlsProps {
    alarms: Alarm[];
    addAlarm: (time: string) => void;
}

const AlarmControls: React.FC<AlarmControlsProps> = ({ alarms, addAlarm }) => {
    const alarmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');

    const handleAddAlarm = () => {
        const time = alarmRef.current?.value;
        if (!time) return;

        const alarmExists = alarms.some(alarm => alarm.time === time && alarm.active);

        if (alarmExists) {
            setError(`Alarm for ${time} already exists!`);
            setTimeout(() => setError(''), 3000);
        } else {
            addAlarm(time);
            alarmRef.current.value = '';
        }
    };

    return (
        <div className="alarm-controls">
            <div className="input-group">
                <div className="time-input-wrapper">
                    <input type="time" ref={alarmRef}/>
                </div>
                <button onClick={handleAddAlarm}>Set Alarm</button>
            </div>


            {error && <div className="toast-error">{error}</div>}

            <ul className="alarms-list">
                {alarms.map(alarm => (
                    <li key={alarm.id} className={alarm.active ? 'active' : 'inactive'}>
                        <span>{alarm.time}</span>
                        <span>{alarm.active ? '✅' : '❌'}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlarmControls;
