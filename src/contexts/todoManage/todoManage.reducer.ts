import { v4 } from "uuid";

import { TodoManageAction, TodoManageStore } from "./todoManage.types";

type TodoManageReducer = (state: TodoManageStore, action: TodoManageAction) => TodoManageStore;

export const todoManageReducer: TodoManageReducer = (state, action) => {
  const nextState = new Map(state);

  switch (action.type) {
    case "createNewGroup": {
      nextState.set(v4().toString(), {
        groupName: "",
        incomplete: new Map(),
        complete: new Map(),
      });
      return nextState;
    }
    case "createNewItem": {
      const { groupId } = action.value;
      const group = nextState.get(groupId);
      if (!group) break;

      const incomplete = new Map(group.incomplete);
      incomplete.set(v4().toString(), "");

      nextState.set(groupId, { ...group, incomplete });
      return nextState;
    }
    case "deleteTodoItem": {
      const { groupId, itemId } = action.value;
      const group = nextState.get(groupId);
      if (!group) break;

      const incomplete = new Map(group.incomplete);
      incomplete.delete(itemId);

      nextState.set(groupId, { ...group, incomplete });
      return nextState;
    }
    case "changeGroupName": {
      const { groupId, groupName } = action.value;
      const group = nextState.get(groupId);
      if (!group) break;

      nextState.set(groupId, { ...group, groupName });
      return nextState;
    }
    case "changeTodoItemText": {
      const { groupId, itemId, text } = action.value;
      const group = nextState.get(groupId);
      if (!group) break;

      const incomplete = new Map(group.incomplete);
      incomplete.set(itemId, text);

      nextState.set(groupId, { ...group, incomplete });
      return nextState;
    }
    case "changeCompletionStatus": {
      const { groupId, itemId, isChecked } = action.value;
      const group = nextState.get(groupId);
      if (!group) break;

      const complete = new Map(group.complete);
      const incomplete = new Map(group.incomplete);

      if (isChecked && incomplete.has(itemId)) {
        const itemText = incomplete.get(itemId)!;
        incomplete.delete(itemId);
        complete.set(itemId, itemText);
      } else if (!isChecked && complete.has(itemId)) {
        const itemText = complete.get(itemId)!;
        complete.delete(itemId);
        incomplete.set(itemId, itemText);
      } else {
        break;
      }

      nextState.set(groupId, { ...group, incomplete, complete });
      return nextState;
    }
    default: {
      throw new Error(
        // @ts-ignore
        `${action.type} is not a valid action for the todoManage context`
      );
    }
  }

  return state; // return state without changing to prevent re-rendering
};
