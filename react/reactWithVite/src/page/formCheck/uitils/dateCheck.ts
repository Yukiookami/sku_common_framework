import {
  dataValue,
  DateInputForRangeValue,
} from "../../../type/pageComponts/DateInputForRangeProps";

export const areDatesInSameJapaneseYear = (
  start: dataValue,
  end: dataValue
): boolean => {
  const parseToDate = (dateObj: dataValue): Date => {
    const year = parseInt(dateObj.year, 10);
    const month = parseInt(dateObj.month || "1", 10) - 1; // 月份从 0 开始
    const day = parseInt(dateObj.day || "1", 10); // 默认日为 1
    return new Date(year, month, day);
  };

  const getJapaneseFiscalYear = (date: Date): number => {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0 表示 1 月，3 表示 4 月
    return month >= 3 ? year : year - 1;
  };

  const startDate = parseToDate(start);
  const endDate = parseToDate(end);

  return getJapaneseFiscalYear(startDate) === getJapaneseFiscalYear(endDate);
};

/**
 * 校验日期输入是否合法
 * @param date
 * @returns
 */
export const validateDateInput = (
  date: { year: string; month: string; day?: string },
  daySkip?: boolean
): string | null => {
  const { year, month, day } = date;

  // 检查年份、月份、日期是否为数字
  if (year && !/^\d+$/.test(year)) {
    return "年份必须是数字";
  }
  if (
    month &&
    (!/^\d+$/.test(month) ||
      parseInt(month, 10) < 1 ||
      parseInt(month, 10) > 12)
  ) {
    return "月份必须是数字且在 1 到 12 之间";
  }
  if (day && (!/^\d+$/.test(day) || parseInt(day, 10) < 1)) {
    return "日期必须是数字且大于 0";
  }

  // 如果 daySkip 为 true，不校验日期
  if (daySkip) {
    if (year && month) {
      return null;
    } else {
      return "请填写完整的年份和月份";
    }
  }

  // 如果月份和年份合法，检查日期是否在该月份的最大范围内
  if (year && month && day) {
    const yearNum = parseInt(year, 10);
    const monthNum = parseInt(month, 10);
    const dayNum = parseInt(day, 10);

    // 获取该月的最大天数
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate(); // `monthNum, 0` 返回指定月份的最大日期

    if (dayNum > daysInMonth) {
      return `该月份的最大日期是 ${daysInMonth}`;
    }
  } else {
    // 如果年份和月份不完整，返回错误信息
    return "请填写完整的年份和月份";
  }

  // 如果没有错误，返回 null
  return null;
};

/**
 * 检查日期间隔是否超过一年
 * @param obj
 * @returns
 */
export const gapLessOneYear = (obj: DateInputForRangeValue) => {
  const { rangeStart } = obj;

  // 当开始年份，开始月份，结束年份，结束月份都有值时，进行校验
  if (
    rangeStart?.start.year &&
    rangeStart?.start.month &&
    rangeStart?.end.year &&
    rangeStart?.end.month
  ) {
    const startYear = parseInt(rangeStart.start.year);
    const startMonth = parseInt(rangeStart.start.month);
    const endYear = parseInt(rangeStart.end.year);
    const endMonth = parseInt(rangeStart.end.month);

    // 日期间隔不能超过一年
    if (endYear - startYear > 1) {
      return false;
    } else if (endYear - startYear === 1) {
      if (startMonth < endMonth) {
        return false;
      }
    }
  }

  return true;
};

/**
 * 检查日期是否跨年
 * @param obj
 * @returns
 * @description 日期选择的开始日期和结束日期必须是同一年
 */
export const cannotSpanAcrossYears = (obj: DateInputForRangeValue) => {
  const { rangeEnd } = obj;

  // 当开始年份，开始月份，开始日期，结束年份，结束月份，结束日期都有值时，进行校验
  if (
    rangeEnd?.start.year &&
    rangeEnd?.start.month &&
    rangeEnd?.start.day &&
    rangeEnd?.end.year &&
    rangeEnd?.end.month &&
    rangeEnd?.end.day
  ) {
    return areDatesInSameJapaneseYear(rangeEnd.start, rangeEnd.end);
  }

  return true;
};

/**
 * 比较两个日期对象，检查 start 是否不能比 end 的值小
 * @param start - 起始日期对象 { year: string, month: string, day?: string }
 * @param end - 结束日期对象 { year: string, month: string, day?: string }
 * @returns true 表示合法，false 表示 start 比 end 小
 */
export const validateDateRange = (
  start: { year: string; month: string; day?: string },
  end: { year: string; month: string; day?: string }
): boolean => {
  // 转换为数字进行比较
  const startYear = parseInt(start.year, 10);
  const startMonth = parseInt(start.month, 10);
  const startDay = start.day ? parseInt(start.day, 10) : null;

  const endYear = parseInt(end.year, 10);
  const endMonth = parseInt(end.month, 10);
  const endDay = end.day ? parseInt(end.day, 10) : null;

  // 按优先级逐层比较：年 -> 月 -> 日
  if (startYear < endYear) {
    return true; // start 的年份小于 end 的年份，合法
  }
  if (startYear === endYear) {
    if (startMonth < endMonth) {
      return true; // 同一年但 start 的月份小于 end 的月份，合法
    }
    if (startMonth === endMonth) {
      // 如果日期存在，则比较日期；否则认为合法
      if (startDay !== null && endDay !== null) {
        if (startDay <= endDay) {
          return true; // 同一年同月且日期合法
        }
      } else {
        return true; // 如果没有传递日期，只比较到月，合法
      }
    }
  }

  // 其他情况都是不合法的
  return false;
};
