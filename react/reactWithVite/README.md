# React 与 Vite

## 初始化安装

如果没有安装 `yarn`，请先安装 `yarn`。

```bash
npm install -g yarn
```

如果`yarn`的运行被阻止，在 windows 下可以

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

安装 react 脚手架

```bash
yarn create vite [reactWithVite]
```

安装 react-router-dom

```bash
yarn add react-router-dom
yarn add @types/react-router-dom -D
```

安装 Axios

```bash
yarn add axios
yarn add @types/axios -D
```

安装 storybook

```bash
yarn add -D @storybook/react
```

安装 MUI

```bash
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled
```

安装 scss

```bash
yarn add sass
```

安装 normalize.css

```bash
yarn add normalize.css
```

安装 react-hook-form + yup

```bash
yarn add react-hook-form yup @hookform/resolvers
```

安装 lodash

```bash
yarn add lodash
```

## 启动项目

```bash
yarn dev
```

## Todo

- [x] 增加对 mixed 的支持
- [ ] 给表单添加 label 相关的样式，让它可以选择对齐方式间距等
- [ ] 让表单可以选择行内表单还是换行
- [ ] 整理 form 成果，增加目录描述
- [ ] 把策略模式的语义定义掉
- [ ] 尝试解决复杂校验
- [ ] 表单按钮增加可选显影

- [ ] 把表单的按钮替换为封装后的按钮
