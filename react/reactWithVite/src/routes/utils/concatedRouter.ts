import { concatArrays } from "../../utils";
import pageRouter from "../pageRouter";

// 拼接路由
export const concatRoutes = () => {
  const RouterArray = concatArrays(pageRouter);
  return RouterArray;
};
