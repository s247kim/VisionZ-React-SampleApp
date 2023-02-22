import { GlobalStoreContextData } from "./globalContext";

type ReducerAction = {
  type: string;
  payload: any;
};

// assign this type as the default object for createContext()
type DataStoreContext = {
  state: GlobalStoreContextData;
  dispatch: React.Dispatch<ReducerAction>;
};

export type { ReducerAction, DataStoreContext };
