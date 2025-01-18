import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Routerlink } from "../../assets/routerName";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const linkJump = () => {
    navigate(Routerlink["表单验证"]);
  };

  return (
    <div>
      <h1>Hello React with Vite</h1>
      <p>This is a basic React component.</p>
      <Button onClick={linkJump} variant="contained">
        跳转到fromcheck
      </Button>
    </div>
  );
};

export default Home;
