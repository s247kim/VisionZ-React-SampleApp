import { FC, ReactElement } from "react";

import styles from "./todoItemList.styles.module.scss";
import { Checkbox } from "../../../shared/checkbox";
import { TodoItem } from "./todoItem.component";
import { TodoItemType, useTodoManageAction } from "../../../../contexts/todoManage";

type TodoItemListProps = {
    completed?: boolean
    groupId: string;
    todoItems: TodoItemType;
};

export const TodoItemList: FC<TodoItemListProps> = ({
                                                        completed: isCompleted,
                                                        groupId,
                                                        todoItems,
                                                    }) => {
    const todoManageAction = useTodoManageAction();

    const changeCompletionStatus = (itemId: string, isChecked: boolean) => {
        todoManageAction({ type: "changeCompletionStatus", value: { groupId, itemId, isChecked } });
    };

    const TodoItemComponentList: ReactElement[] = [];
    todoItems.forEach((itemText, itemId) => {
        TodoItemComponentList.push(
            <div key={itemId} className={`todo-item-container`}>
                <Checkbox disabled={!itemText.trim()} checked={isCompleted}
                          handleCheckedStateChange={changeCompletionStatus.bind(null, itemId)}/>
                <TodoItem completed={isCompleted} autoFocus={!itemText}
                          groupId={groupId} itemId={itemId} itemText={itemText}/>
            </div>
        );
    });

    return <div className={[styles.todoItemList, isCompleted ? styles.completed : "incomplete"].join(" ")}>
        {TodoItemComponentList}
    </div>;
};

TodoItemList.displayName = "TodoItemList";