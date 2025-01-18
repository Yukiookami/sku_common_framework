type RouterObj = {
  name: string;
  path: string;
  component: React.LazyExoticComponent<React.FC>;
  meta?: {
    title: string;
    icon: string;
  };
  child?: RouterObj[];
};

export default RouterObj;
