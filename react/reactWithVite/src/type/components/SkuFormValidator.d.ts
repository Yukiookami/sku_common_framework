export type SkuFormValidatorProps = {
  // 表单验证列表
  list: SkuFormValidatorList[];
  // 是否和需要底边距（最大40，默认10）
  mb?: number;
  // 标题和节点的布局（vertical垂直布局 horizontal横向布局）
  layout?: "vertical" | "horizontal";
};

// 表单验证列表
export type SkuFormValidatorList = {
  // 表单项名称
  name: string;
  // 表单项标题
  label: string;
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
  type?: SkuFormValidatorRuleType;
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
  test?: {
    message: string;
    function: (value: unknown) => boolean;
  };
}

// 表单验证规则类型
export type SkuFormValidatorRuleType =
  | "string"
  | "number"
  | "boolean"
  | "array"
  | "object"
  | "mixed";
