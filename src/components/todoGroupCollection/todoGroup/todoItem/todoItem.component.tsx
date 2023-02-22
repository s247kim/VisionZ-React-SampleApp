import { forwardRef, useRef, useState } from "react";
import { TodoItemType } from "../../todoGroupCollection.types";

type TodoItemProps = Omit<TodoItemType, "itemId"> & {
  completed?: boolean;
  autoFocus?: boolean;
  handleItemDetailChange: (newDetail: string) => void;
  handleItemDelete: () => void;
  handleItemAdd: () => void;
};

export const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(
  (
    {
      itemDetail,
      completed: isCompleted,
      autoFocus,
      handleItemDetailChange,
      handleItemDelete,
      handleItemAdd,
    },
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tempString, setTempString] = useState<string>(itemDetail);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const changeItemDetail = (newDetail: string) => {
      if (!isCompleted) {
        setTempString(newDetail);

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          handleItemDetailChange(newDetail);
        }, 1000);
      }
    };

    const deleteIfEmpty = () => {
      if (!itemDetail) handleItemDelete();
    };

    return (
      <input
        ref={ref}
        className={"todo-item-text"}
        value={itemDetail}
        autoFocus={autoFocus}
        onChange={(event) => changeItemDetail(event.target.value)}
        disabled={isCompleted}
        onBlur={deleteIfEmpty}
        onKeyDown={(e) => e.code.toLowerCase() === "enter" && handleItemAdd()}
      />
    );
  }
);
