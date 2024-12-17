import React from 'react';
import { formatEventDate } from '@/utils/date';

interface EventDetailsProps {
  title: string;
  date: Date;
  time: string;
  venue: string;
  address: string;
}

export const EventDetails: React.FC<EventDetailsProps> = ({
  title,
  date,
  time,
  venue,
  address,
}) => {
  return (
    <div className="space-y-2">
      <h3 className="text-2xl font-serif mb-4">{title}</h3>
      <p className="text-lg">{formatEventDate(date)}</p>
      <p>{time}</p>
      <p className="font-medium">{venue}</p>
      <p className="text-gray-600">{address}</p>
    </div>
  );
};