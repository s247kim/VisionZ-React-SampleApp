import { TodoGroupType, TodoItemType } from "../../todoGroupCollection.types";
import { Dispatch, FC, SetStateAction } from "react";

import styles from "./todoItemList.styles.module.scss";
import { Checkbox } from "../../../shared/checkbox";
import { TodoItem } from "./todoItem.component";

type TodoItemListProps = {
    completed?: boolean
    todoItemList: TodoItemType[];
    todoGroupId: string;
    setGroupDetails: Dispatch<SetStateAction<TodoGroupType[]>>;
};

export const TodoItemList: FC<TodoItemListProps> = ({
                                                        completed: isCompleted,
                                                        todoItemList,
                                                        todoGroupId,
                                                        setGroupDetails
                                                    }) => {
    const changeDetail = (itemId: string, newDetail: string) => {
        setGroupDetails(state => {
            const groupDetail = state.find(x => x.groupId === todoGroupId);
            if (groupDetail) {
                const item = groupDetail.incompleteList.find(x => x.itemId === itemId);
                if (item) {
                    item.itemDetail = newDetail;
                    return [...state];
                }
            }

            return state;
        });
    };

    return <div className={[styles.todoItemList, isCompleted ? styles.completed : "incomplete"].join(" ")}>
        {todoItemList?.map(({ itemId, itemDetail }) => {
            return <div key={itemId} className={`todo-item-container`}>
                <Checkbox disabled={!itemDetail} checked={isCompleted}
                          handleCheckedStateChange={() => console.log("hello")}/>
                <TodoItem itemDetail={itemDetail} completed={isCompleted}
                          handleItemDetailChange={changeDetail.bind(null, itemId)}/>
            </div>;
        })}
    </div>;
};