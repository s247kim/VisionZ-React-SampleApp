import { FC, ReactElement } from "react";

import styles from "./todoGroupCollection.styles.module.scss";
import { EmptyTodoGroup, TodoGroup } from "./todoGroup";
import { useTodoManageStore } from "../../contexts/todoManage";

export const TodoGroupCollection: FC = () => {
  const todoManageStore = useTodoManageStore();

  const TodoGroupComponentList: ReactElement[] = [];
  todoManageStore.forEach((groupDetail, groupId) => {
    TodoGroupComponentList.push(
      <TodoGroup key={groupId} groupId={groupId} {...groupDetail} />
    );
  });

  return (
    <section className={styles.todoGroupCollection}>
      {TodoGroupComponentList}
      <EmptyTodoGroup/>
    </section>
  );
};

TodoGroupCollection.displayName = "TodoGroupCollection";
