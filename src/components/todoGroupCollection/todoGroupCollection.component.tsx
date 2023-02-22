import { FC, useContext, useCallback, useRef } from "react";
import styles from "./todoGroupCollection.styles.module.scss";
import { EmptyTodoGroup, TodoGroup } from "./todoGroup";
import { v4 } from "uuid";
import { GlobalStoreContext } from "../context/globalContext";

export const TodoGroupCollection: FC = () => {
  const { state, dispatch } = useContext(GlobalStoreContext);
  // console.log(`state: ${Array.isArray(state)}`); // true
  // const currentTodoGroupRef = useRef<TodoGroupType[] | null>(null);

  const createNewGroup = useCallback(() => {
    dispatch({
      type: "UPDATE_TODO_GROUP_DATA",
      payload: {
        groupId: v4().toString(),
        groupTitle: "",
        incompleteList: [],
        completedList: [],
      },
    });

    // currentTodoGroupRef.current = groupDetails;
  }, [dispatch]);

  return (
    <section className={styles.todoGroupCollection}>
      {state.todoGroupCollectionData?.map((groupDetail) => {
        return <TodoGroup key={v4().toString()} groupDetail={groupDetail} />;
      })}
      <EmptyTodoGroup handleClick={createNewGroup} />
    </section>
  );
};
