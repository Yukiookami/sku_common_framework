import React, { ChangeEvent, useRef } from "react";
import {
  DateInputProps,
  dataValue,
} from "../../../type/pageComponts/DateInputForRangeProps";
import { Box, TextField, Typography } from "@mui/material";
import "./_style.scss";

const DateInput: React.FC<DateInputProps> = (props) => {
  const { showDay = true, onGetDate, onChange, error } = props;
  const dataValue = useRef<dataValue>({ year: "", month: "", day: "" });

  const handleChange =
    (key: keyof dataValue) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dataValue.current[key] = e.target.value;
      onGetDate?.(dataValue.current);
      onChange?.(dataValue.current);
    };

  return (
    <Box className="date-input">
      <Box className="date-input__item">
        <TextField
          className="date-input_input"
          size="small"
          onChange={(e) => handleChange("year")(e)}
          error={error}
        ></TextField>
        <Typography className="date-input_text">年</Typography>
      </Box>
      <Box className="date-input__item">
        <TextField
          className="date-input_input"
          size="small"
          onChange={(e) => handleChange("month")(e)}
          error={error}
        ></TextField>
        <Typography className="date-input_text">月</Typography>
      </Box>
      <Box className="date-input__item">
        {showDay && (
          <>
            <TextField
              className="date-input_input"
              size="small"
              onChange={(e) => handleChange("day")(e)}
              error={error}
            ></TextField>
            <Typography className="date-input_text">日</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DateInput;
