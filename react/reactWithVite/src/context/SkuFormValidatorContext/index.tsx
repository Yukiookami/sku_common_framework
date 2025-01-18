import React, { createContext } from "react";
import {
  IFormContextData,
  IFormContext,
} from "../../type/context/SkuFormValidatorContext";

const TkFormContext = createContext<{
  formContext: IFormContextData;
  setFormContext: (formContext: IFormContextData) => void;
}>({
  formContext: {},
  setFormContext: () => {},
});

const TkFormContextProvider: React.FC<IFormContext> = (props) => {
  const [formContext, setFormContext] = React.useState<IFormContextData>({});

  return (
    <TkFormContext.Provider value={{ formContext, setFormContext }}>
      {props.children}
    </TkFormContext.Provider>
  );
};

export default TkFormContextProvider;
