import { format, formatRelative } from 'date-fns';

export const monthYear = (date) => format(new Date(date), 'MMM y');

export const defaultDate = (date) => formatRelative(new Date(date), Date.now());
