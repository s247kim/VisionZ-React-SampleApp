import { v4 } from "uuid";

import { TodoManageAction, TodoManageStore } from "./todoManage.types";

type TodoManageReducer = (state: TodoManageStore, action: TodoManageAction) => TodoManageStore;

export const todoManageReducer: TodoManageReducer = (state, action) => {
    const nextState = new Map(state);

    switch (action.type) {
        case "createNewGroup": {
            nextState.set(v4().toString(), { groupName: "", incomplete: new Map(), complete: new Map() });
            return nextState;
        }
        case "createNewItem": {
            const { groupId } = action.value;
            const group = nextState.get(groupId);
            if (!group) break;

            group.incomplete.set(v4().toString(), "");
            return nextState;
        }
        case "deleteTodoItem": {
            const { groupId, itemId } = action.value;
            const group = nextState.get(groupId);
            if (!group) break;

            group.incomplete.delete(itemId);
            return nextState;
        }
        case "changeGroupName": {
            const { groupId, groupName } = action.value;
            const group = nextState.get(groupId);
            if (!group) break;

            group.groupName = groupName;
            return nextState;
        }
        case "changeTodoItemText": {
            const { groupId, itemId, text } = action.value;
            const group = nextState.get(groupId);
            if (!group) break;

            group.incomplete.set(itemId, text);
            return nextState;
        }
        case "changeCompletionStatus": {
            const { groupId, itemId, isChecked } = action.value;
            const group = nextState.get(groupId);
            if (!group) break;

            if (isChecked && group.incomplete.has(itemId)) {
                const itemText = group.incomplete.get(itemId)!;
                group.incomplete.delete(itemId);
                group.complete.set(itemId, itemText);
            } else if (!isChecked && group.complete.has(itemId)) {
                const itemText = group.complete.get(itemId)!;
                group.complete.delete(itemId);
                group.incomplete.set(itemId, itemText);
            }

            return nextState;
        }
        default: {
            // @ts-ignore
            throw new Error(`${action.type} is not a valid action for the todoManage context`);
        }
    }

    return state; // return state without changing to prevent re-rendering
};
