import React, { useEffect, useRef } from "react";
import { skuFromList } from "./parts";
import { cloneDeep } from "lodash";
import { Box, TextField } from "@mui/material";
import SkuFormValidator from "../../components/common/atom/SkuFormValidator";
import DateInputForRange from "./pageComponents/DateInputForRange";
import "./_style.scss";

type NodeStrategyType = Record<string, () => React.ReactElement>;
/**
 * 表单验证页面, 用于展示表单验证组件
 */
const FormCheckPage: React.FC = () => {
  const formListForRender = useRef(cloneDeep(skuFromList));
  const [formList, setFormList] = React.useState(formListForRender.current);

  useEffect(() => {
    const nodeStrategy: NodeStrategyType = {
      datePicker: () => <DateInputForRange />,
      age: () => <TextField size="small" label="年龄" />,
      textInput: () => <TextField size="small" label="文本输入" />,
    };

    // 创建 formList 的深拷贝，确保我们在设置新状态时使用的是新的对象引用
    const updatedFormList = cloneDeep(formListForRender.current);

    updatedFormList.forEach((item) => {
      if (nodeStrategy[item.name]) {
        item.node = nodeStrategy[item.name]();
      }
    });

    // 使用更新后的表单列表设置新的状态
    setFormList(updatedFormList);
  }, []);

  return (
    <Box className="form-check-page">
      <SkuFormValidator mb={10} list={formList} layout="horizontal" />
    </Box>
  );
};

export default FormCheckPage;
