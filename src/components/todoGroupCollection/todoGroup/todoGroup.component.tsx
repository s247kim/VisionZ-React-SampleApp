import { FC } from "react";

import styles from './todoGroup.styles.module.scss';
import { TodoGroupType } from "../todoGroupCollection.types";

type TodoGroupProps = Omit<TodoGroupType, 'groupId'>

export const TodoGroup: FC<TodoGroupProps> = ({ groupTitle }) => {
    return <article className={styles.todoGroup}>
        <h2 className={"todo-title"}>{groupTitle}</h2>

    </article>;
};