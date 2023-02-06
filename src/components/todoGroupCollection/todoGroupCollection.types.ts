export type TodoItemType = {
    itemId: string;
    itemDetail: string;
};

export type TodoGroupType = {
    groupId: string;
    groupTitle: string;
    incompleteList: TodoItemType[];
    completedList: TodoItemType[];
};