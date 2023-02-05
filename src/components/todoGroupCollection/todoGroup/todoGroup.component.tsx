import { FC } from "react";

import styles from "./todoGroup.styles.module.scss";
import { TodoGroupType } from "../todoGroupCollection.types";
import { TodoItemList } from "./todoItem";

type TodoGroupProps = Omit<TodoGroupType, "groupId">

export const TodoGroup: FC<TodoGroupProps> = ({ groupTitle, incompleteList, completedList }) => {
    return <article className={styles.todoGroup}>
        <h2 className={"todo-title"}>{groupTitle}</h2>

        <TodoItemList todoItemList={incompleteList}/>
        <TodoItemList todoItemList={completedList} completed/>
    </article>;
};