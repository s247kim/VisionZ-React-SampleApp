import { v4 } from "uuid";

/** Design decision:
 * 1. Array vs Map
 * - 특정한 그룹이나 특정한 아이템을 찾을때 인덱스를 기억하는 것 보다 용이함
 * 2. Object vs Map
 * - 그룹과 아이템은 상시로 추가되거나 제거될 수 있는데 그런경우 Map 이 좀 더 빠름
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps
 * 3. incomplete 와 complete 를 나눈 이유
 * - 아이템 Object 안에 flag 로써 표현할 수 있지만, 끝난것과 진행중인걸 묶어서 보여줘야 하기에 처음부터 나누는게 편함
 */
export type TodoItemType = Map<string, string>;
export type TodoGroupType = {
    groupName: string;
    incomplete: TodoItemType;
    complete: TodoItemType;
};
export type TodoManageStore = Map<string, TodoGroupType>;

export type TodoManageAction =
    | { type: "createNewGroup" }
    | { type: "createNewItem", value: { groupId: string } }
    | { type: "deleteTodoItem", value: { groupId: string, itemId: string } }
    | { type: "changeGroupName", value: { groupId: string, groupName: string } }
    | { type: "changeTodoItemText", value: { groupId: string, itemId: string, text: string } }
    | { type: "changeCompletionStatus", value: { groupId: string, itemId: string, isChecked: boolean } }

export const initTodoManageStore = (): TodoManageStore => {
    return new Map([
        [v4().toString(), {
            groupName: "Test1",
            complete: new Map([
                [v4().toString(), "complete"],
                [v4().toString(), "complete2"],
            ]),
            incomplete: new Map([
                [v4().toString(), "not complete"],
                [v4().toString(), "not complete2"],
            ])
        }],
        [v4().toString(), { groupName: "Test2", complete: new Map(), incomplete: new Map() }],
        [v4().toString(), { groupName: "Test3", complete: new Map(), incomplete: new Map() }],
    ]);
};
