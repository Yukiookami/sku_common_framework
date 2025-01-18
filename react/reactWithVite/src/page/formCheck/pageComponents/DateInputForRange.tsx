import React, { forwardRef } from "react";
import {
  dataValue,
  DateInputForRangeGroup,
  DateInputForRangeKey,
  DateInputForRangeProps,
  DateInputForRangeValue,
} from "../../../type/pageComponts/DateInputForRangeProps";
import { Box, Typography } from "@mui/material";
import DateInput from "./DateInput";

const DateInputForRange: React.FC<DateInputForRangeProps> = forwardRef(
  (props, ref) => {
    const { onGetDate, onChange } = props;
    const DateInputForRangeValue: DateInputForRangeValue = {
      rangeStart: {
        start: { year: "", month: "", day: "" },
        end: { year: "", month: "", day: "" },
      },
      rangeEnd: {
        start: { year: "", month: "", day: "" },
        end: { year: "", month: "", day: "" },
      },
    };

    const handleChange =
      (group: DateInputForRangeGroup) =>
      (key: DateInputForRangeKey) =>
      (date: dataValue) => {
        DateInputForRangeValue[group][key] = date;
        onChange?.(DateInputForRangeValue);
        onGetDate?.(DateInputForRangeValue);
      };

    return (
      <Box className="date-input-for-range" ref={ref}>
        <Box className="date-input-for-range_item date-input-for-range_item-from">
          <DateInput
            onGetDate={(e) => handleChange("rangeStart")("start")(e)}
            onChange={(e) => handleChange("rangeStart")("start")(e)}
            showDay={false}
          />
          <Typography className="date-input-for-range_item-text">~</Typography>
          <DateInput
            onGetDate={(e) => handleChange("rangeStart")("start")(e)}
            onChange={(e) => handleChange("rangeStart")("end")(e)}
            showDay={false}
          />
        </Box>

        <Box className="date-input-for-range_item">
          <DateInput
            onGetDate={(e) => handleChange("rangeStart")("start")(e)}
            onChange={(e) => handleChange("rangeEnd")("start")(e)}
            showDay={true}
          />
          <Typography className="date-input-for-range_item-text">~</Typography>
          <DateInput
            onGetDate={(e) => handleChange("rangeStart")("start")(e)}
            onChange={(e) => handleChange("rangeEnd")("end")(e)}
            showDay={true}
          />
        </Box>
      </Box>
    );
  }
);

export default DateInputForRange;
