import { ChangeEventHandler, forwardRef, KeyboardEventHandler } from "react";

import { useTodoManageAction } from "../../../../contexts/todoManage";

type TodoItemProps = {
    completed?: boolean;
    autoFocus?: boolean;

    groupId: string;
    itemId: string;
    itemText: string;
};

export const TodoItem = forwardRef<HTMLInputElement, TodoItemProps>(({
                                                                         completed: isCompleted,
                                                                         autoFocus,
                                                                         groupId,
                                                                         itemId,
                                                                         itemText
                                                                     }, ref) => {
    const todoManageAction = useTodoManageAction();

    const changeItemDetail: ChangeEventHandler<HTMLInputElement> = (event) => {
        todoManageAction({ type: "changeTodoItemText", value: { groupId, itemId, text: event.target.value } });
    };

    const deleteIfEmpty = () => {
        if (!itemText) todoManageAction({ type: "deleteTodoItem", value: { groupId, itemId } });
    };

    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code.toLowerCase() === "enter") {
            todoManageAction({ type: "createNewItem", value: { groupId } });
        }
    };

    return <input ref={ref} className={"todo-item-text"} value={itemText} autoFocus={autoFocus}
                  onChange={changeItemDetail} disabled={isCompleted} onBlur={deleteIfEmpty} onKeyDown={handleKeyDown}/>;
});

TodoItem.displayName = "forwardRef(TodoItem)";