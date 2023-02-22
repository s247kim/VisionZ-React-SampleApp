import { FC, useReducer } from "react";
import styles from "./todoMain.styles.module.scss";
import { TodoGroupCollection } from "../components/todoGroupCollection";
import { GlobalStoreContext, initialGlobalContext } from "../components/context/globalContext";
import { reducerFunc } from "../components/context/globalReducer";

export const TodoMainPage: FC = () => {
  const [state, dispatch] = useReducer(reducerFunc, initialGlobalContext);
  return (
    <div className={styles.mainPage}>
      <header>
        <h1>VisionZ TODO APP</h1>
      </header>

      <main>
        <GlobalStoreContext.Provider value={{ state, dispatch }}>
          <TodoGroupCollection />
        </GlobalStoreContext.Provider>
      </main>
    </div>
  );
};
