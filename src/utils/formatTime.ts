import dayjs from 'dayjs';

export function formatTimes(time: string){
  return  dayjs(time).format("MM-DD-HH:mm:ss");
}
