import { FC } from "react";

import styles from "./todoGroup.styles.module.scss";

type EmptyTodoGroupProps = {
  handleClick: () => void;
};

export const EmptyTodoGroup: FC<EmptyTodoGroupProps> = ({ handleClick }) => {
  return (
    <article
      className={[styles.todoGroup, styles.emptyTodoGroup].join(" ")}
      onClick={handleClick}
    ></article>
  );
};
