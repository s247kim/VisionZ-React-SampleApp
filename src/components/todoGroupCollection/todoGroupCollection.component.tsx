import { FC, useState } from "react";
import { v4 } from "uuid";

import styles from "./todoGroupCollection.styles.module.scss";
import { EmptyTodoGroup, TodoGroup } from "./todoGroup";
import { TodoGroupType } from "./todoGroupCollection.types";

const testData: TodoGroupType[] = [
    {
        groupId: v4().toString(),
        groupTitle: "test1",
        incompleteList: [{ itemId: v4().toString(), itemDetail: "test Incomplete" }, {
            itemId: v4().toString(),
            itemDetail: "test Incomplete2"
        }],
        completedList: [{ itemId: v4().toString(), itemDetail: "test Completed" }, {
            itemId: v4().toString(),
            itemDetail: "test Completed2"
        }]
    },
    { groupId: v4().toString(), groupTitle: "test2", incompleteList: [], completedList: [] },
    { groupId: v4().toString(), groupTitle: "test3", incompleteList: [], completedList: [] }
];

export const TodoGroupCollection: FC = () => {
    const [groupDetails, setGroupDetails] = useState<TodoGroupType[]>(testData);

    const changeGroupTitle = (groupId: string, newTitle: string): void => {
        const groupDetail = groupDetails.find(x => x.groupId === groupId);
        if (groupDetail) {
            groupDetail.groupTitle = newTitle;
            setGroupDetails([...groupDetails]);
        }
    }

    return <section className={styles.todoGroupCollection}>
        {groupDetails.map(({ groupId, groupTitle, incompleteList, completedList }) => {
            return <TodoGroup key={groupId} groupTitle={groupTitle} incompleteList={incompleteList}
                              completedList={completedList} changeGroupTitle={changeGroupTitle.bind(null, groupId)}/>;
        })}
        <EmptyTodoGroup/>
    </section>;
};