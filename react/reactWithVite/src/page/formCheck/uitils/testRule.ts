import { TestContext } from "yup";
import { DateInputForRangeValue } from "./../../../type/pageComponts/DateInputForRangeProps.d";
import {
  validateDateInput,
  gapLessOneYear,
  cannotSpanAcrossYears,
  validateDateRange,
} from "./dateCheck";
export const TestFunc = {
  dataPicker: {
    // 日期格式校验
    dateFomartCheckForRange: (
      obj: DateInputForRangeValue,
      context: TestContext
    ) => {
      const { rangeStart, rangeEnd } = obj;

      // Start 和 End 的日期校验结果
      let resultStartStart = true; // rangeStart?.start 的校验结果
      let resultStartEnd = true; // rangeStart?.end 的校验结果
      let resultStart = true; // 综合结果，只有两个都为 true 才为 true

      let resultEndStart = true; // rangeEnd?.start 的校验结果
      let resultEndEnd = true; // rangeEnd?.end 的校验结果
      let resultEnd = true; // 综合结果，只有两个都为 true 才为 true

      let resultGapLessOneYear = true; // 检查日期间隔是否超过一年
      let resultCannotSpanAcrossYears = true; // 检查是否跨年

      // 错误信息
      let errorMessage = "";

      // 校验 rangeStart.start
      if (
        rangeStart?.start.year ||
        rangeStart?.start.month ||
        rangeStart?.start.day
      ) {
        resultStartStart = !validateDateInput(rangeStart.start, true);
      } else {
        resultStartStart = false;
      }

      // 校验 rangeStart.end
      if (
        rangeStart?.end.year ||
        rangeStart?.end.month ||
        rangeStart?.end.day
      ) {
        resultStartEnd = !validateDateInput(rangeStart.end, true);
      } else {
        resultStartEnd = false;
      }

      // 综合结果：只有 rangeStart.start 和 rangeStart.end 都为 true 时，resultStart 才为 true
      resultStart = resultStartStart && resultStartEnd;

      // 校验 rangeEnd.start
      if (
        rangeEnd?.start.year ||
        rangeEnd?.start.month ||
        rangeEnd?.start.day
      ) {
        resultEndStart = !validateDateInput(rangeEnd.start);
      } else {
        resultEndStart = false;
      }

      // 校验 rangeEnd.end
      if (rangeEnd?.end.year || rangeEnd?.end.month || rangeEnd?.end.day) {
        resultEndEnd = !validateDateInput(rangeEnd.end);
      } else {
        resultEndEnd = false;
      }

      // 综合结果：只有 rangeEnd.start 和 rangeEnd.end 都为 true 时，resultEnd 才为 true
      resultEnd = resultEndStart && resultEndEnd;

      // 替换为 validateDateRange 比较日期大小
      if (
        rangeStart?.start &&
        rangeStart?.end &&
        !validateDateRange(rangeStart.start, rangeStart.end)
      ) {
        resultStart = false;
      }

      if (
        rangeEnd?.start &&
        rangeEnd?.end &&
        !validateDateRange(rangeEnd.start, rangeEnd.end)
      ) {
        resultEnd = false;
      }

      // 检查 Start 的日期是否超过一年
      resultGapLessOneYear = gapLessOneYear(obj);

      // 检查 End 的日期是否跨年
      resultCannotSpanAcrossYears = cannotSpanAcrossYears(obj);

      // 错误信息映射
      const errorMapping = {
        gapLessOneYearAndcannotSpanAcrossYears:
          !resultGapLessOneYear && !resultCannotSpanAcrossYears,
        gapLessOneYearAnddateFomartCheckForRangeEnd:
          !resultGapLessOneYear && !resultEnd,
        gapLessOneYearAnddateFomartCheckForRangeStart:
          !resultGapLessOneYear && !resultStart,
        gapLessOneYear: !resultGapLessOneYear,
        cannotSpanAcrossYears: !resultCannotSpanAcrossYears,
        dateFomartCheckForRangeStartAnddateFomartCheckForRangeEnd:
          !resultStart && !resultEnd,
        dateFomartCheckForRangeStart: !resultStart,
        dateFomartCheckForRangeEnd: !resultEnd,
      };

      // 找到第一个匹配的错误信息
      errorMessage =
        (Object.keys(errorMapping) as Array<keyof typeof errorMapping>).find(
          (key) => errorMapping[key]
        ) || "";

      // 返回结果
      if (errorMessage === "") {
        return true;
      }
      return context.createError({
        message: errorMessage,
      });
    },
  },
};
