import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SkuFormValidatorProps,
  SkuFormValidatorRules,
} from "../../../../type/components/SkuFormValidator";
import "./_style.scss";
import { Box, Typography } from "@mui/material";
import { cloneDeep } from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import createYupSchema from "./rulesMaker.ts";

const SkuFormValidator: React.FC<SkuFormValidatorProps> = forwardRef(
  (props, ref) => {
    const { list, mb = 10, layout = "vertical" } = props;

    const [ruleSchema, setRuleSchema] = React.useState<
      yup.ObjectSchema<{ [key: string]: unknown }>
    >({} as yup.ObjectSchema<{ [key: string]: unknown }>);

    // 提取表单验证规则
    useEffect(() => {
      const deepList = cloneDeep(list);

      const newRule = deepList
        .map((item) => {
          return item.rules;
        })
        .filter(Boolean);

      if (newRule.length === 0) return;
      setRuleSchema(createYupSchema(newRule as SkuFormValidatorRules[]));
    }, [list]);

    // 定义react hook form
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "all",
      reValidateMode: "onChange",
      resolver: ruleSchema && yupResolver(ruleSchema),
    });

    // 对组件外暴露的方法
    useImperativeHandle(ref, () => {
      return {
        // 手动触发提交事件
        submit: () => {},
        // 获取所有表单值
        getAllValue: () => {},
      };
    });

    /**
     * 表单提交
     * @param e
     */
    const onSubmit = (e: unknown) => {
      console.log("submit", e);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="sku-form">
        {list.map((item, index) => {
          return (
            <Box key={index} className={`mb-${mb}`}>
              <Controller
                name={item.name}
                control={control}
                defaultValue={item.defaultValue ?? ""}
                render={({ field }) => {
                  return (
                    <Box className={`sku-form_item sku-form_item-${layout}`}>
                      {/* 标题，如果设置了label就显示 */}
                      {item.label ? (
                        <Typography className="sku-form_label">
                          {item.label}
                        </Typography>
                      ) : (
                        <></>
                      )}
                      {/* 表单项 */}
                      {item.node ? (
                        React.cloneElement(item.node, {
                          ...field,
                          error: !!errors[item.name],
                          helperText: errors[item.name]?.message,
                        })
                      ) : (
                        <></>
                      )}
                    </Box>
                  );
                }}
              />
            </Box>
          );
        })}

        <button type="submit" className="sku-form_submit">
          提交
        </button>
      </form>
    );
  }
);

export default SkuFormValidator;
