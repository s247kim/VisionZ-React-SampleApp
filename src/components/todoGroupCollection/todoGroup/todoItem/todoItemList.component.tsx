import { TodoItemType } from "../../todoGroupCollection.types";
import { FC, useEffect, useRef } from "react";

import styles from "./todoItemList.styles.module.scss";
import { Checkbox } from "../../../shared/checkbox";
import { TodoItem } from "./todoItem.component";

type TodoItemListProps = {
    completed?: boolean
    todoItemList: TodoItemType[];
};

export const TodoItemList: FC<TodoItemListProps> = ({ completed: isCompleted, todoItemList }) => {
    const firstEmptyInputRef = useRef<HTMLInputElement>(null);
    const isEmpty = !isCompleted && todoItemList.length === 0;

    useEffect(() => {
        if (isEmpty) {
            firstEmptyInputRef.current?.focus();
        }
    }, [isEmpty]);

    if (isEmpty) {
        return <div className={styles.todoItemList}>
            <div className={`todo-item-container`}>
                <Checkbox/>
                <TodoItem ref={firstEmptyInputRef} itemDetail={""}/>
            </div>
        </div>;
    }

    return <div className={[styles.todoItemList, isCompleted ? styles.completed : "incomplete"].join(" ")}>
        {todoItemList?.map(({ itemId, itemDetail }) => {
            return <div key={itemId} className={`todo-item-container`}>
                <Checkbox checked={isCompleted}/>
                <TodoItem itemDetail={itemDetail} completed={isCompleted}/>
            </div>;
        })}
    </div>;
};