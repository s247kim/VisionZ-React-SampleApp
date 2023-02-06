import { Dispatch, FC, SetStateAction } from "react";

import styles from "./todoGroup.styles.module.scss";
import { TodoGroupType } from "../todoGroupCollection.types";
import { TodoItemList } from "./todoItem";

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

    return <article className={styles.todoGroup}>
        <input type={"text"} className={"todo-title"} value={groupTitle} autoFocus={shouldAutoFocus}
               onChange={(event) => changeGroupTitle(event.target.value)}/>

        <TodoItemList todoItemList={incompleteList} todoGroupId={groupId} setGroupDetails={setGroupDetails}/>

        {!!completedList.length &&
            <>
                <hr/>
                <TodoItemList todoItemList={completedList} todoGroupId={groupId} setGroupDetails={setGroupDetails}
                              completed/>
            </>
        }
    </article>;
};