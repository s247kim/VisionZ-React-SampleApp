import { FC } from "react";

import styles from "./todoMain.styles.module.scss";
import { TodoGroupCollection } from "../components/todoGroupCollection";
import { TodoManageProvider } from "../contexts/todoManage";

export const TodoMainPage: FC = () => {
    return (
        <div className={styles.mainPage}>
            <header>
                <h1>VisionZ TODO APP</h1>
            </header>

            <main>
                <TodoManageProvider>
                    <TodoGroupCollection/>
                </TodoManageProvider>
            </main>
        </div>
    );
};