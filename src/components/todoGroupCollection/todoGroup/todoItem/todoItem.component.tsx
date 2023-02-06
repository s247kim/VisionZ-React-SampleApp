import { forwardRef } from "react";
import { TodoItemType } from "../../todoGroupCollection.types";

type TodoItemProps = Omit<TodoItemType, "itemId"> & {
    completed?: boolean;
};

export const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(({ itemDetail, completed: isCompleted }, ref) => {
    return <input ref={ref} className={"todo-item-text"} value={itemDetail} disabled={isCompleted}/>;
});