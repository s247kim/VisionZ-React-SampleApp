import { Dispatch, FC, SetStateAction } from "react";

import styles from "./todoGroup.styles.module.scss";
import { TodoGroupType } from "../todoGroupCollection.types";
import { TodoItemList } from "./todoItem";
import { v4 } from "uuid";

type TodoGroupProps = TodoGroupType & {
    setGroupDetails: Dispatch<SetStateAction<TodoGroupType[]>>;
};

export const TodoGroup: FC<TodoGroupProps> = ({
                                                  groupId,
                                                  groupTitle,
                                                  incompleteList,
                                                  completedList,
                                                  setGroupDetails
                                              }) => {

    const changeGroupTitle = (newTitle: string): void => {
        setGroupDetails(state => {
            const groupDetail = state.find(x => x.groupId === groupId);
            if (groupDetail) {
                groupDetail.groupTitle = newTitle;
                return [...state];
            }

            return state;
        });
    };

    const shouldAutoFocus = !groupTitle && !incompleteList.length && !completedList.length;

    const createNewItem = () => {
        setGroupDetails(state => {
            return state.map(groupDetail => {
                if (groupDetail.groupId === groupId) {
                    return {
                        ...groupDetail,
                        incompleteList: [...groupDetail.incompleteList, {
                            itemId: v4().toString(),
                            itemDetail: ""
                        }]
                    };
                }
                return groupDetail;
            });
        });
    };

    return <article className={styles.todoGroup}>
        <input type={"text"} className={"todo-title"} value={groupTitle} autoFocus={shouldAutoFocus}
               onChange={(event) => changeGroupTitle(event.target.value)}
               onKeyDown={(e) => e.code.toLowerCase() === "enter" && createNewItem()}/>

        <div className="todo-list-wrapper">
            <TodoItemList todoItemList={incompleteList} todoGroupId={groupId} setGroupDetails={setGroupDetails}/>

            {!!completedList.length &&
                <>
                    <hr/>
                    <TodoItemList todoItemList={completedList} todoGroupId={groupId} setGroupDetails={setGroupDetails}
                                  completed/>
                </>
            }
        </div>
    </article>;
};