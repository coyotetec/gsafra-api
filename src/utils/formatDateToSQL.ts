import { formatInTimeZone } from 'date-fns-tz';

export function formatDateToSQL(date: Date) {
  return formatInTimeZone(date, 'America/Belem', 'Y-MM-dd HH:mm:ss');
}
