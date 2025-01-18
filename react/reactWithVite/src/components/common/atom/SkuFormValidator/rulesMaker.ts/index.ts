import * as yup from "yup";
import {
  SkuFormValidatorRules,
  SkuFormValidatorRuleType,
} from "../../../../../type/components/SkuFormValidator";

const createYupSchema = (
  rules: SkuFormValidatorRules[]
): yup.ObjectSchema<{ [key: string]: unknown }> => {
  let schema = yup.object().shape({});

  // 构建验证规则策略
  const ruleStrategy: Record<
    SkuFormValidatorRuleType,
    () => yup.Schema<unknown, unknown>
  > = {
    string: () => yup.string(),
    number: () => yup.number(),
    boolean: () => yup.boolean(),
    array: () => yup.array(),
    object: () => yup.object(),
    mixed: () => yup.mixed(),
  };

  rules.forEach((rule) => {
    if (rule.type && ruleStrategy[rule.type]) {
      let fieldSchema = ruleStrategy[rule.type]();

      // 非空验证
      if (rule.required) {
        fieldSchema = fieldSchema.required(rule.requiredMessage);
      } else {
        fieldSchema = fieldSchema.notRequired();
      }

      // 当传入类型提示时，使用传入的类型提示
      if (rule.typeMessage) {
        fieldSchema = fieldSchema.typeError(rule.typeMessage);
      }

      // 如果是字符串类型并且有正则验证
      if (rule.pattern && rule.type === "string") {
        // 使用类型断言确保是字符串架构
        fieldSchema = (fieldSchema as yup.StringSchema).matches(rule.pattern, {
          message: rule.patternMessage,
        });
      }

      // 如果是数字类型并且有最小值限制
      if (rule.min !== undefined && rule.type === "number") {
        // 使用类型断言确保是数字架构
        fieldSchema = (fieldSchema as yup.NumberSchema).min(
          rule.min,
          rule.minMessage
        );
      }

      // 如果是数字类型并且有最大值限制
      if (rule.max !== undefined && rule.type === "number") {
        // 使用类型断言确保是数字架构
        fieldSchema = (fieldSchema as yup.NumberSchema).max(
          rule.max,
          rule.maxMessage
        );
      }

      // 如果是字符串类型并且有长度限制
      if (rule.test) {
        fieldSchema = fieldSchema.test(
          "custom-test",
          rule.test.message,
          rule.test.function
        );
      }

      schema = schema.concat(
        yup.object().shape({
          [rule.name]: fieldSchema,
        })
      );
    } else {
      console.warn(`不支持的类型或未定义的类型规则: ${rule.name}`);
    }
  });

  return schema;
};

export default createYupSchema;
