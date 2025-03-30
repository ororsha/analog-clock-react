import { useState, useCallback } from 'react';

export interface Alarm {
    id: number;
    time: string; // "HH:mm"
    active: boolean;
    snoozeCount: number;
}

const useAlarms = () => {
    const [alarms, setAlarms] = useState<Alarm[]>([]);
    const [showAlarm, setShowAlarm] = useState<Alarm | null>(null);


    const checkAlarms = useCallback((now: Date) => {
        const currentTime = now.toTimeString().slice(0, 5);
        alarms.forEach(alarm => {
            if (alarm.active && alarm.time === currentTime) {
                setShowAlarm(alarm);
            }
        });
    }, [alarms]);

    const addAlarm = (time: string) => {
        setAlarms(prevAlarms => [
            ...prevAlarms,
            { id: Date.now(), time, active: true, snoozeCount: 0 }
        ]);
    };

    const dismissAlarm = () => {
        setAlarms(prev => prev.map(alarm => alarm.id === showAlarm?.id ? { ...alarm, active: false } : alarm));
        setShowAlarm(null);
    };

    const snoozeAlarm = () => {
        if (showAlarm && showAlarm.snoozeCount < 3) {
            const snoozeTime = new Date(Date.now() + 5 * 60000);
            const newTime = snoozeTime.toTimeString().slice(0, 5);
            setAlarms(prev =>
                prev.map(alarm =>
                    alarm.id === showAlarm.id
                        ? { ...alarm, time: newTime, snoozeCount: alarm.snoozeCount + 1 }
                        : alarm
                )
            );
            setShowAlarm(null);
        } else {
            dismissAlarm();
        }
    };

    return { alarms, addAlarm, showAlarm, dismissAlarm, snoozeAlarm, checkAlarms };
};

export default useAlarms;
