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

    const changeCompletionStatus = (itemId: string, isChecked: boolean) => {
        setGroupDetails(state => {
            const groupDetail = state.find(x => x.groupId === todoGroupId);
            if (groupDetail) {
                // if the new state is checked -> find item from incompleteList and put it to completedList
                const list = isChecked ? groupDetail.incompleteList : groupDetail.completedList;
                const itemIndex = list.findIndex(x => x.itemId === itemId);
                if (itemIndex > -1) {
                    isChecked ? groupDetail.completedList.push(list[itemIndex]) : groupDetail.incompleteList.push(list[itemIndex]);
                    list.splice(itemIndex, 1);
                    return [...state];
                }
            }

            return state;
        });
    };

    return <div className={[styles.todoItemList, isCompleted ? styles.completed : "incomplete"].join(" ")}>
        {todoItemList?.map(({ itemId, itemDetail }) => {
            return <div key={itemId} className={`todo-item-container`}>
                <Checkbox disabled={!itemDetail.trim()} checked={isCompleted}
                          handleCheckedStateChange={changeCompletionStatus.bind(null, itemId)}/>
                <TodoItem itemDetail={itemDetail} completed={isCompleted} autoFocus={!itemDetail}
                          handleItemDetailChange={changeDetail.bind(null, itemId)}/>
            </div>;
        })}
    </div>;
};