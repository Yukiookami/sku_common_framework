export type dataValue = {
  year: string;
  month: string;
  day: string;
};

export type DateInputForRangeValue = {
  rangeStart: {
    start: dataValue;
    end: dataValue;
  };
  rangeEnd: {
    start: dataValue;
    end: dataValue;
  };
};

export type DateInputForRangeGroup = "rangeStart" | "rangeEnd";
export type DateInputForRangeKey = "start" | "end";

export type DateInputForRangeProps = {
  showDay?: boolean;
  onGetDate?: (date: DateInputForRangeValue) => void;
  onChange?: (date: DateInputForRangeValue) => void;
  error?: boolean;
  helperText?: string;
};

export type DateInputProps = {
  showDay?: boolean;
  onGetDate?: (date: dataValue) => void;
  onChange?: (date: dataValue) => void;
  error?: boolean;
};
