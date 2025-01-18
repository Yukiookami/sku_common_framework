import { BrowserRouter } from "react-router-dom";
import SkuRouters from "./routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SkuRouters />
    </BrowserRouter>
  );
};

export default App;
