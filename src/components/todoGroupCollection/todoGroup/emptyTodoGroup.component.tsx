import { FC, memo } from "react";

import styles from "./todoGroup.styles.module.scss";
import { useTodoManageAction } from "../../../contexts/todoManage";

type EmptyTodoGroupProps = {}

/** Design decision:
 * 1. memo 컴포넌트
 * - 솔직히 이 정도로 내용이 없는 컴포넌트는 안써도 됩
 * - 되려 condition check 에 걸리는 시간을 없애고 re-render 하는게 빠를 수 있기 때문
 * - 근데 prop 에 들은게 없으니 그냥 써줌
 * - 이 컴포넌트에서 쓰이는 context 는 첫 랜더 이후로 변하지 않기에 memoize 시키기 나쁘지 않음
 */
export const EmptyTodoGroup: FC<EmptyTodoGroupProps> = memo(() => {
    const todoManageAction = useTodoManageAction();

    return <article className={[styles.todoGroup, styles.emptyTodoGroup].join(" ")}
                    onClick={() => todoManageAction({ type: "createNewGroup" })}></article>;
});

EmptyTodoGroup.displayName = "memo(EmptyTodoGroup)";