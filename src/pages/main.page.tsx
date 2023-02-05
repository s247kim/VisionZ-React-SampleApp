import { FC } from "react";

import styles from "./main.module.scss";
import { TodoGroupCollection } from "../components/todoGroupCollection";

export const MainPage: FC = () => {
    return (
        <div className={styles.mainPage}>
            <header>
                <h1>VisionZ TODO APP</h1>
            </header>

            <main>
                <TodoGroupCollection/>
            </main>
        </div>
    );
};