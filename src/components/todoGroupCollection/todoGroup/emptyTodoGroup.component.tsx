import { FC } from "react";

import styles from "./todoGroup.styles.module.scss";

export const EmptyTodoGroup: FC = () => {

    return <article className={[styles.todoGroup, styles.emptyTodoGroup].join(" ")}></article>;
};
