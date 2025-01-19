import { SkuFormValidatorList } from "../../type/components/SkuFormValidator";
import { TestFunc } from "./uitils/testRule";

export const skuFromList: SkuFormValidatorList[] = [
  {
    name: "datePicker",
    label: "日期选择",
    rules: {
      name: "datePicker",
      type: "mixed",
      test: [
        {
          testRuleName: "dateFomartCheckForRange",
          message: "",
          function: TestFunc.dataPicker.dateFomartCheckForRange,
        },
      ],
    },
  },
  {
    name: "age",
    label: "年龄",
    rules: {
      name: "age",
      type: "number",
      typeMessage: "年龄必须是数字",
      required: true,
      requiredMessage: "年龄不能为空",
      min: 0,
      minMessage: "年龄不能小于0岁",
      max: 140,
      maxMessage: "年龄不能大于140岁",
    },
  },
  {
    name: "numberRangeInput",
    label: "范围输入",
  },
  {
    name: "numberInput",
    label: "数字输入",
  },
  {
    name: "textInput",
    label: "文本输入",
    rules: {
      name: "textInput",
      type: "string",
      required: true,
      requiredMessage: "文本输入不能为空",
      pattern: /^[a-zA-Z0-9]{1,10}$/,
      patternMessage: "文本输入必须是1-10位字母或数字",
    },
  },
];
