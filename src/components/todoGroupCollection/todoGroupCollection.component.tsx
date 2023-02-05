import { FC, useState } from "react";
import { v4 } from "uuid";

import styles from "./todoGroupCollection.styles.module.scss";
import { TodoGroup } from "./todoGroup";
import { TodoGroupType } from "./todoGroupCollection.types";

const testData: TodoGroupType[] = [
    { groupId: v4().toString(), groupTitle: "test1", incompleteList: [], completedList: [] },
    { groupId: v4().toString(), groupTitle: "test2", incompleteList: [], completedList: [] },
    { groupId: v4().toString(), groupTitle: "test3", incompleteList: [], completedList: [] },
    { groupId: v4().toString(), groupTitle: "test4", incompleteList: [], completedList: [] },
    { groupId: v4().toString(), groupTitle: "test5", incompleteList: [], completedList: [] },
];

export const TodoGroupCollection: FC = () => {
    const [groupDetails, setGroupDetails] = useState<TodoGroupType[]>(testData);

    return <section className={styles.todoGroupCollection}>
        {groupDetails.map(({ groupId, groupTitle, incompleteList, completedList }) => {
            return <TodoGroup key={groupId} groupTitle={groupTitle} incompleteList={incompleteList}
                              completedList={completedList}/>;
        })}
    </section>;
};