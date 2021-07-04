import { format } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const monthYear = (date) => format(new Date(date), 'MMM y');
