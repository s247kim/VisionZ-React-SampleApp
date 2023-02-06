import { FC } from "react";

import styles from "./todoGroup.styles.module.scss";
import { TodoGroupType } from "../todoGroupCollection.types";
import { TodoItemList } from "./todoItem";

type TodoGroupProps = Omit<TodoGroupType, "groupId"> & {
    changeGroupTitle: (newTitle: string) => void;
};

export const TodoGroup: FC<TodoGroupProps> = ({ groupTitle, incompleteList, completedList, changeGroupTitle }) => {
    return <article className={styles.todoGroup}>
        <input type={"text"} className={"todo-title"} value={groupTitle}
               onChange={(event) => changeGroupTitle(event.target.value)}/>

        <TodoItemList todoItemList={incompleteList}/>

        {!!completedList.length &&
            <>
                <hr/>
                <TodoItemList todoItemList={completedList} completed/>
            </>
        }
    </article>;
};