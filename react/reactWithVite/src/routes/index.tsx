import { Navigate, Route, Routes } from "react-router-dom";
import React, { lazy, ReactNode, Suspense } from "react";
import RouterObj from "../type/router/router";
import { concatRoutes } from "./utils/concatedRouter";

// 懒加载错误页面
const Error404 = lazy(() => import("../page/error/error404"));

// 动态生成路由的函数
const generateRoute = (routes: RouterObj[]): ReactNode => {
  return routes.map((route) => (
    <Route
      path={route.path}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          {/* 确保route.component已经是React元素 */}
          {React.createElement(route.component, { key: route.path })}
          {/* 如果有子路由，递归生成 */}
          {route.child && <Routes>{generateRoute(route.child)}</Routes>}
        </Suspense>
      }
      key={route.path}
    />
  ));
};

// 路由组件定义
const SkuRouters = () => {
  return (
    <Routes>
      {/* 默认重定向至首页 */}
      <Route path="/" element={<Navigate replace to="/home" />} />

      {/* 动态生成的路由 */}
      {generateRoute(concatRoutes())}

      {/* 404 页面 */}
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default SkuRouters;
