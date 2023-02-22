import { createContext } from "react";
import { testData } from "./testData";
import { TodoGroupType } from "../todoGroupCollection/todoGroupCollection.types";
import { DataStoreContext } from "./types";

export type GlobalStoreContextData = {
  todoGroupCollectionData: TodoGroupType[];
};

export const initialGlobalContext: TodoGroupType[] = testData;

export const GlobalStoreContext = createContext({} as DataStoreContext);
