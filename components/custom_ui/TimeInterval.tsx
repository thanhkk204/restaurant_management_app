import React, { useEffect, useState } from 'react';

interface TimeIntervalProps {
    reservationStartTime: string;
}

const TimeInterval: React.FC<TimeIntervalProps> = ({ reservationStartTime }) => {
  const [elapsedTime, setElapsedTime] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now: Date = new Date();
      const reservationDate: Date = new Date(reservationStartTime);
      const diff: number = now.getTime() - reservationDate.getTime();
      
      const hours: number = Math.floor(diff / (1000 * 60 * 60));
      const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds: number = Math.floor((diff % (1000 * 60)) / 1000);

      setElapsedTime(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [reservationStartTime]);

  return (
    <div>
      <p>{elapsedTime}</p>
    </div>
  );
};

export default TimeInterval;
