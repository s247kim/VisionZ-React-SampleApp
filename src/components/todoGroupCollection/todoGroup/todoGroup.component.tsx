import { ChangeEventHandler, FC, KeyboardEventHandler, memo } from "react";

import styles from "./todoGroup.styles.module.scss";
import { TodoItemList } from "./todoItem";
import { TodoGroupType, useTodoManageAction, } from "../../../contexts/todoManage";

type TodoGroupProps = TodoGroupType & {
  groupId: string;
};

/**
 * 상위 컴포넌트에서 이렇게 props 넘겨 받은걸 다시 하위로 넣는걸 prop drilling 이라 생각해서 context 를 쓰려할 수 있음
 * 하지만 이 경우에는 하위에 리스팅된 모든 컴포넌트에 context 를 붙이는 것 보다 이런식으로 상위에서 골라 넘겨주는게 optimization 이 용이함
 * context 를 모든 하위 컴포넌트에 붙이면, re-render 를 막을 방도가 없음
 */
export const TodoGroup: FC<TodoGroupProps> = memo(
  ({ groupId, groupName, complete, incomplete }) => {
    const todoManageAction = useTodoManageAction();
    const shouldAutoFocus = !groupName && !incomplete.size && !complete.size;

    const changeGroupName: ChangeEventHandler<HTMLInputElement> = (e) => {
      todoManageAction({
        type: "changeGroupName",
        value: { groupId, groupName: e.target.value },
      });
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
      if (e.code.toLowerCase() === "enter") {
        todoManageAction({ type: "createNewItem", value: { groupId } });
      }
    };

    const createNewItemIfEmpty = () => {
      if (!incomplete.size) {
        todoManageAction({ type: "createNewItem", value: { groupId } });
      }
    };

    return (
      <article className={styles.todoGroup}>
        <input
          type={"text"}
          className={"todo-title"}
          value={groupName}
          autoFocus={shouldAutoFocus}
          onChange={changeGroupName}
          onKeyDown={handleKeyDown}
        />

        <div className="todo-list-wrapper" onClick={createNewItemIfEmpty}>
          <TodoItemList todoItems={incomplete} groupId={groupId}/>

          {!!complete.size && (
            <>
              <hr/>
              <TodoItemList todoItems={complete} groupId={groupId} completed/>
            </>
          )}
        </div>
      </article>
    );
  }
);

TodoGroup.displayName = "memo(TodoGroup)";
