export type SkuFormValidatorProps = {
  // 表单验证列表
  list: SkuFormValidatorList[];
  // 是否和需要底边距（最大40，默认10）
  mb?: number;
  // 标题和节点的布局（vertical垂直布局 horizontal横向布局）
  layout?: "vertical" | "horizontal";
  // 表单验证时机（all全部 onBlur失焦 onChange改变 onSubmit提交） 默认为all
  mode?: "all" | "onBlur" | "onChange" | "onSubmit";
  // label宽度 默认为100 上限为400
  labelWidth?: number;
  // 表单验证成功回调
  onSubmitSuccess?: function;
};

// 表单验证列表
export type SkuFormValidatorList = {
  // 表单项名称
  name: string;
  // 表单项标题
  label?: string;
  // 表单项值
  value?: string;
  // 表单项默认值
  defaultValue?:
    | string
    | number
    | boolean
    | string[]
    | number[]
    | object
    | object[];
  // 表单项验证规则
  rules?: SkuFormValidatorRules;
  // 表单项节点
  node?: React.ReactElement;
};

// 表单验证规则
interface SkuFormValidatorRules {
  name: string;
  type: SkuFormValidatorRuleType;
  typeMessage?: string;
  required?: boolean;
  requiredMessage?: string;
  pattern?: RegExp;
  patternMessage?: string;
  min?: number;
  minMessage?: string;
  max?: number;
  maxMessage?: string;
  length?: number;
  test?: SkuFormValidatorRuleTest[];
}

// 表单验证规则类型
export type SkuFormValidatorRuleType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object"
  | "mixed";

// 自定义表单验证规则
type SkuFormValidatorRuleTest = {
  // 验证规则名称(最好不要重复)
  testRuleName: string;
  // 验证失败提示信息
  message: string;
  // 验证函数
  function: function;
};
