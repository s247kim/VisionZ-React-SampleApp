import { FC, useCallback, useContext } from "react";
import styles from "./todoGroup.styles.module.scss";
import { TodoGroupType } from "../todoGroupCollection.types";
import { TodoItemList } from "./todoItem";
import { v4 } from "uuid";
import { GlobalStoreContext } from "../../context/globalContext";

type GroupDetailData = {
  groupDetail: TodoGroupType;
};

export const TodoGroup: FC = ({ groupDetail }: GroupDetailData) => {
  const { groupId, groupTitle, incompleteList, completedList } = groupDetail;
  const {
    state: { todoGroupCollectionData },
    dispatch,
  } = useContext(GlobalStoreContext);
  const changeGroupTitle = (newTitle: string): void => {
    const foundGroup = todoGroupCollectionData?.find(
      (groupToChangeTitle) => groupToChangeTitle.groupId === groupId
    );
    if (foundGroup) {
      // 여기서 dispatch로 UPDATE_GROUP_TITLE_DATA를 부르고 싶은데 payload를 어떻게 전달해야 하는지 감이 안 와
    }
  };

  const shouldAutoFocus = !groupTitle && !incompleteList.length && !completedList.length;

  const createNewItem = useCallback(() => {
    setGroupDetails((state) => {
      return state.map((groupToCreateNewItem) => {
        if (groupToCreateNewItem.groupId === groupId) {
          return {
            ...groupToCreateNewItem,
            incompleteList: [
              ...groupToCreateNewItem.incompleteList,
              {
                itemId: v4().toString(),
                itemDetail: "",
              },
            ],
          };
        }
        return groupToCreateNewItem;
      });
    });
  }, [groupId, setGroupDetails]);

  return (
    <article className={styles.todoGroup}>
      <input
        type={"text"}
        className={"todo-title"}
        value={groupTitle}
        autoFocus={shouldAutoFocus}
        onChange={(event) => changeGroupTitle(event.target.value)}
        onKeyDown={(e) => e.code.toLowerCase() === "enter" && createNewItem()}
      />

      <div className="todo-list-wrapper" onClick={() => !incompleteList.length && createNewItem()}>
        <TodoItemList todoItemList={incompleteList} todoGroupId={groupId} />

        {!!completedList.length && (
          <>
            <hr />
            <TodoItemList todoItemList={completedList} todoGroupId={groupId} completed />
          </>
        )}
      </div>
    </article>
  );
};
