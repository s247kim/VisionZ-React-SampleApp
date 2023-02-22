import { TodoGroupType } from "../todoGroupCollection/todoGroupCollection.types";
import { v4 } from "uuid";

export const testData: TodoGroupType[] = [
  {
    groupId: v4().toString(),
    groupTitle: "test1",
    incompleteList: [
      { itemId: v4().toString(), itemDetail: "test Incomplete" },
      {
        itemId: v4().toString(),
        itemDetail: "test Incomplete2",
      },
    ],
    completedList: [
      { itemId: v4().toString(), itemDetail: "test Completed" },
      {
        itemId: v4().toString(),
        itemDetail: "test Completed2",
      },
    ],
  },
  { groupId: v4().toString(), groupTitle: "test2", incompleteList: [], completedList: [] },
  { groupId: v4().toString(), groupTitle: "test3", incompleteList: [], completedList: [] },
];
