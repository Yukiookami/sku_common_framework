import React, { forwardRef, useEffect, useRef } from "react";
import {
  dataValue,
  DateInputForRangeGroup,
  DateInputForRangeKey,
  DateInputForRangeProps,
  DateInputForRangeValue,
} from "../../../type/pageComponts/DateInputForRangeProps";
import { Box, FormHelperText, Typography } from "@mui/material";
import DateInput from "./DateInput";

type Strategy = {
  [key: string]: (
    setStartGroupErrorMsg: (msg: string) => void,
    setEndGroupErrorMsg: (msg: string) => void
  ) => void;
};

const DateInputForRange: React.FC<DateInputForRangeProps> = forwardRef(
  (props, ref) => {
    const { onGetDate, onChange, error, helperText } = props;
    const [startGroupErrorMsg, setStartGroupErrorMsg] =
      React.useState<string>("");
    const [endGroupErrorMsg, setEndGroupErrorMsg] = React.useState<string>("");

    const DateInputForRangeValue = useRef<DateInputForRangeValue>({
      rangeStart: {
        start: { year: "", month: "", day: "" },
        end: { year: "", month: "", day: "" },
      },
      rangeEnd: {
        start: { year: "", month: "", day: "" },
        end: { year: "", month: "", day: "" },
      },
    });

    const handleChange =
      (group: DateInputForRangeGroup) =>
      (key: DateInputForRangeKey) =>
      (date: dataValue) => {
        DateInputForRangeValue.current[group][key] = date;
        onChange?.(DateInputForRangeValue.current);
        onGetDate?.(DateInputForRangeValue.current);
      };

    useEffect(() => {
      const errorStrategy: Strategy = {
        gapLessOneYear: (setStartGroupErrorMsg) => {
          setStartGroupErrorMsg("日期间隔不能超过一年");
          setEndGroupErrorMsg("");
        },
        dateFomartCheckForRangeStart: (setStartGroupErrorMsg) => {
          setStartGroupErrorMsg("日期格式不正确");
          setEndGroupErrorMsg("");
        },
        dateFomartCheckForRangeEnd: (_, setEndGroupErrorMsg) => {
          setEndGroupErrorMsg("日期格式不正确");
          setStartGroupErrorMsg("");
        },
        cannotSpanAcrossYears: (_, setEndGroupErrorMsg) => {
          setEndGroupErrorMsg("必须是同年度");
          setStartGroupErrorMsg("");
        },
        dateFomartCheckForRangeStartAnddateFomartCheckForRangeEnd: (
          setStartGroupErrorMsg,
          setEndGroupErrorMsg
        ) => {
          setStartGroupErrorMsg("日期格式不正确");
          setEndGroupErrorMsg("日期格式不正确");
        },
        gapLessOneYearAndcannotSpanAcrossYears: (
          setStartGroupErrorMsg,
          setEndGroupErrorMsg
        ) => {
          setStartGroupErrorMsg("日期间隔不能超过一年");
          setEndGroupErrorMsg("必须是同年度");
        },
        gapLessOneYearAnddateFomartCheckForRangeEnd: (
          setStartGroupErrorMsg,
          setEndGroupErrorMsg
        ) => {
          setStartGroupErrorMsg("日期间隔不能超过一年");
          setEndGroupErrorMsg("日期格式不正确");
        },
        gapLessOneYearAnddateFomartCheckForRangeStart: (
          setStartGroupErrorMsg,
          setEndGroupErrorMsg
        ) => {
          setStartGroupErrorMsg("日期间隔不能超过一年");
          setEndGroupErrorMsg("日期格式不正确");
        },
      };

      if (error && helperText && errorStrategy[helperText]) {
        errorStrategy[helperText](setStartGroupErrorMsg, setEndGroupErrorMsg);
      } else {
        setStartGroupErrorMsg("");
        setEndGroupErrorMsg("");
      }
    }, [error, helperText]);

    return (
      <Box className="date-input-for-range" ref={ref}>
        <Box className="date-input-for-range_item date-input-for-range_item-from">
          <DateInput
            onGetDate={(e) => handleChange("rangeStart")("start")(e)}
            onChange={(e) => handleChange("rangeStart")("start")(e)}
            showDay={false}
            error={!!startGroupErrorMsg}
          />
          <Typography className="date-input-for-range_item-text">~</Typography>
          <DateInput
            onGetDate={(e) => handleChange("rangeStart")("end")(e)}
            onChange={(e) => handleChange("rangeStart")("end")(e)}
            showDay={false}
            error={!!startGroupErrorMsg}
          />
        </Box>
        <FormHelperText error className="date-input-for-range_item-error">
          {startGroupErrorMsg && startGroupErrorMsg}
        </FormHelperText>

        <Box className="date-input-for-range_item">
          <DateInput
            onGetDate={(e) => handleChange("rangeEnd")("start")(e)}
            onChange={(e) => handleChange("rangeEnd")("start")(e)}
            showDay={true}
            error={!!endGroupErrorMsg}
          />
          <Typography className="date-input-for-range_item-text">~</Typography>
          <DateInput
            onGetDate={(e) => handleChange("rangeEnd")("end")(e)}
            onChange={(e) => handleChange("rangeEnd")("end")(e)}
            showDay={true}
            error={!!endGroupErrorMsg}
          />
        </Box>
        <FormHelperText error className="date-input-for-range_item-error">
          {endGroupErrorMsg && endGroupErrorMsg}
        </FormHelperText>
      </Box>
    );
  }
);

export default DateInputForRange;
