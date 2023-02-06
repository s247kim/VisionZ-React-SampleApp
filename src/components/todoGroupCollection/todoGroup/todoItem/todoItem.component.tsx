import { forwardRef } from "react";
import { TodoItemType } from "../../todoGroupCollection.types";

type TodoItemProps = Omit<TodoItemType, "itemId"> & {
    completed?: boolean;
    autoFocus?: boolean;
    handleItemDetailChange: (newDetail: string) => void;
    handleItemDelete: () => void;
    handleItemAdd: () => void;
};

export const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(({
                                                                         itemDetail,
                                                                         completed: isCompleted,
                                                                         autoFocus,
                                                                         handleItemDetailChange,
                                                                         handleItemDelete,
                                                                         handleItemAdd
                                                                     }, ref) => {
    const changeItemDetail = (newDetail: string) => {
        if (!isCompleted) {
            handleItemDetailChange(newDetail);
        }
    };

    const deleteIfEmpty = () => {
        if (!itemDetail) handleItemDelete();
    };

    return <input ref={ref} className={"todo-item-text"} value={itemDetail} autoFocus={autoFocus}
                  onChange={event => changeItemDetail(event.target.value)} disabled={isCompleted}
                  onBlur={deleteIfEmpty}
                  onKeyDown={(e) => e.code.toLowerCase() === "enter" && handleItemAdd()}/>;
});