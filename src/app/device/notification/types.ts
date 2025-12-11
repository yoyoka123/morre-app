
export interface NotificationSchedule {
  id: string;
  start: string;
  end: string;
  days: number[]; // 0 = Sun, 1 = Mon, ..., 6 = Sat
}

export interface NotificationSettings {
  enabled: boolean;
  schedules: NotificationSchedule[];
}

export const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  schedules: [
    {
      id: '1',
      start: '18:00',
      end: '07:00',
      days: [1, 2, 3, 4, 5, 6] // Mon-Sat
    }
  ]
};

export const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export function formatDays(days: number[]): string {
  if (days.length === 7) return '每天';
  if (days.length === 0) return '单次';
  
  // Sort days
  const sorted = [...days].sort();
  
  // Check for weekdays (Mon-Fri: 1,2,3,4,5)
  const isWeekdays = sorted.length === 5 && sorted.every((d, i) => d === i + 1);
  if (isWeekdays) return '工作日';

  // Check for weekends (Sat, Sun: 0,6)
  const isWeekends = sorted.length === 2 && sorted.includes(0) && sorted.includes(6);
  if (isWeekends) return '周末';

  return '每周' + sorted.map(d => WEEKDAYS[d]).join('、');
}

