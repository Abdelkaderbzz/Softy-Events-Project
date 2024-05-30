import { format, getTime, formatDistanceToNow, add, startOfMonth, endOfMonth } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
export function CurrentDate() {
  return fDate(new Date(), 'yyyy-MM-dd');
}
export function addOneHour(date: InputValue) {
  return date
    ? add(new Date(date), {
        hours: 1,
      })
    : add(new Date(), {
        hours: 1,
      });
}
export function differentThanCurrent(date: Date, type: string) {
  const currentDate = new Date();
  switch (type) {
    case 'year':
      return fDate(date, 'yyyy') !== fDate(currentDate, 'yyyy');
    case 'month':
      return fDate(date, 'MM') !== fDate(currentDate, 'MM');
    default:
      return fDate(date, 'dd') !== fDate(currentDate, 'dd');
  }
}
export function getMonthName(date: Date) {
  return date.toLocaleDateString('default', { month: 'long' });
}
export const getStartAndEndOfMonth = () => {
  const now = new Date();
  const dateStartOfMonth = startOfMonth(now);
  const dateEndOfMonth = endOfMonth(now);
  return {
    startOfMonth: dateStartOfMonth,
    endOfMonth: dateEndOfMonth,
  };
};
