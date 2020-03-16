import dayjs from 'dayjs';

export function formatTimes(time: string, type?: string) {
  if (!type) return dayjs(time).format('MM-DD-HH:mm:ss');
  return dayjs(time).format(type);
}
