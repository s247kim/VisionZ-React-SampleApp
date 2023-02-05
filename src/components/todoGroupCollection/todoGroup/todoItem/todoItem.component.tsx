import { FC } from "react";
import { TodoItemType } from "../../todoGroupCollection.types";

type TodoItemProps = Omit<TodoItemType, "itemId">;

export const TodoItem: FC<TodoItemProps> = ({ itemDetail }) => {
    return <span className={"todo-item-text"}>{itemDetail}</span>;
};