import dayjs, { Dayjs } from 'dayjs';

export const format = (str: string, ...args: any[]) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    const k = parseInt(index, 10);
    return args.length > k ? args[k] : '';
  });
};

export const formatDate = (d: string | Dayjs | number, f: string) => {
  return dayjs(d).format(f || 'YYYY-MM-DD HH:mm:ss');
};

export const byte2Kilobyte = (val: number) => {
  return (val / 1024).toFixed(2);
};
