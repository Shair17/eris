import {useEffect, useState} from 'react';

export const useGreeting = () => {
  const [today, setDate] = useState<Date>(new Date());
  const hour = today.getHours();
  const greeting = `${
    (hour < 12 && 'Buenos días') ||
    (hour < 18 && 'Buenas tardes') ||
    'Buenas noches'
  }`;

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return greeting;
};
