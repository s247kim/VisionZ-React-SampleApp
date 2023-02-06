import { forwardRef } from "react";
import { TodoItemType } from "../../todoGroupCollection.types";

type TodoItemProps = Omit<TodoItemType, "itemId"> & {
    completed?: boolean;
    autoFocus?: boolean;
    handleItemDetailChange: (newDetail: string) => void;
};

export const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(({
                                                                         itemDetail,
                                                                         completed: isCompleted,
                                                                         autoFocus,
                                                                         handleItemDetailChange
                                                                     }, ref) => {
    const changeItemDetail = (newDetail: string) => {
        if (!isCompleted) {
            handleItemDetailChange(newDetail);
        }
    };

    return <input ref={ref} className={"todo-item-text"} value={itemDetail} autoFocus={autoFocus}
                  onChange={event => changeItemDetail(event.target.value)} disabled={isCompleted}/>;
});