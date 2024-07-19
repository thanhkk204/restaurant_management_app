import React, { useEffect, useState } from 'react';

interface CountdownProps {
    reservationStartTime: string;
}

const TimeIntervalCountDown: React.FC<CountdownProps> = ({ reservationStartTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now: Date = new Date();
      const reservationDate: Date = new Date(reservationStartTime);
      const diff: number = reservationDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(`00 : 00 : 00`);
        return;
      }

      const hours: number = Math.floor(diff / (1000 * 60 * 60));
      const minutes: number = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds: number = Math.floor((diff % (1000 * 60)) / 1000);
      
      const formatTime = (time: number) => time.toString().padStart(2, '0');
      
      setTimeLeft(`${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}`);
    }, 1000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [reservationStartTime]);

  return (
    <div>
      <p>{timeLeft}</p>
    </div>
  );
};

export default TimeIntervalCountDown;
