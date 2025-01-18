interface IFormContext {
  children: React.ReactNode;
}

interface IFormContextData {
  preventSubmit?: {
    [key: string]: boolean | undefined;
  };
}

export type { IFormContextData, IFormContext };
