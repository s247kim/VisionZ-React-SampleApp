import { TodoItemType } from "../../todoGroupCollection.types";
import { FC } from "react";

import styles from "./todoItemList.styles.module.scss";
import { Checkbox } from "../../../shared/checkbox";
import { TodoItem } from "./todoItem.component";

type TodoItemListProps = {
    completed?: boolean
    todoItemList: TodoItemType[];
};

export const TodoItemList: FC<TodoItemListProps> = ({ completed: isCompleted, todoItemList }) => {
    return <div className={[styles.todoItemList, isCompleted ? styles.completed : "incomplete"].join(" ")}>
        {todoItemList?.map(({ itemId, itemDetail }) => {
            return <div key={itemId} className={`todo-item-container`}>
                <Checkbox checked={isCompleted}/>
                <TodoItem itemDetail={itemDetail}/>
            </div>;
        })}
    </div>;
};