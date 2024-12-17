import { format } from 'date-fns';

export const formatEventDate = (date: Date): string => {
  return format(date, 'EEEE, MMMM do, yyyy');
};

export const formatMessageDate = (date: Date): string => {
  return format(date, 'PPP');
};