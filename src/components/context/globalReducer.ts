import { GlobalStoreContextData } from "./globalContext";
import { ReducerAction } from "./types";

const reducerFunc = (state: GlobalStoreContextData, action: ReducerAction) => {
  switch (action.type) {
    case "UPDATE_TODO_GROUP_DATA":
      return [...state.todoGroupCollectionData, action.payload];
    default:
      return state;
  }
};

export { reducerFunc };
