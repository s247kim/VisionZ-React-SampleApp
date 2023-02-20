import { createContext, Dispatch, FC, PropsWithChildren, useContext, useReducer } from "react";

import { initTodoManageStore, TodoManageAction, TodoManageStore } from "./todoManage.types";
import { todoManageReducer } from "./todoManage.reducer";

const TodoManageActionContext = createContext<Dispatch<TodoManageAction> | undefined>(undefined);
const TodoManageStoreContext = createContext<TodoManageStore | undefined>(undefined);

export const useTodoManageAction = (): Dispatch<TodoManageAction> => {
    const context = useContext(TodoManageActionContext);
    if (!context) {
        throw new Error("useTodoManageAction must be used within a TodoManageProvider");
    }
    return context;
};

export const useTodoManageStore = (): TodoManageStore => {
    const context = useContext(TodoManageStoreContext);
    if (!context) {
        throw new Error("useTodoManageStore must be used within a TodoManageProvider");
    }
    return context;
};

export const TodoManageProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, action] = useReducer(todoManageReducer, null, initTodoManageStore);

    return (
        <TodoManageActionContext.Provider value={action}>
            <TodoManageStoreContext.Provider value={state}>{children}</TodoManageStoreContext.Provider>
        </TodoManageActionContext.Provider>
    );
};
