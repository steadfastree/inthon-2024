import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const TIMEZONE = 'Asia/Seoul';

/**
 * Date 객체나 ISO 문자열을 한국 시간 기준으로 포맷팅합니다.
 */
export const formatToKST = {
  /**
   * YYYY-MM-DD 형식으로 변환
   */
  date: (date: Date | string) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatInTimeZone(dateObj, TIMEZONE, 'yyyy-MM-dd');
  },

  /**
   * YYYY-MM-DD HH:mm 형식으로 변환
   */
  dateTime: (date: Date | string) => {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatInTimeZone(dateObj, TIMEZONE, 'yyyy-MM-dd HH:mm');
  },
};
