import { format, formatRelative } from 'date-fns';

export const monthYear = (date: string) => format(new Date(date), 'MMM y');

export const defaultDate = (date: string) =>
  formatRelative(new Date(date), Date.now());
