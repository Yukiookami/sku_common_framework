import { lazy } from "react";
import RouterObj from "../type/router/router";
import { Routerlink } from "../assets/routerName";

// 首页
const Home = lazy(() => import("../page/home/index"));
// 表单验证
const FormCheckPage = lazy(() => import("../page/formCheck/index"));

const pageRouter: RouterObj[] = [
  // 首页
  {
    name: "首页",
    path: Routerlink["首页"],
    component: Home,
  },
  // 表单验证
  {
    name: "表单验证",
    path: Routerlink["表单验证"],
    component: FormCheckPage,
  },
];

export default pageRouter;
