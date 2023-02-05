import { FC } from "react";

import styles from "./checkbox.styles.module.scss";

type CheckboxProps = {
    checked?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({ checked: isChecked }) => {
    return <span className={styles.checkbox}>
        {isChecked && <div className={"checker"}></div>}
    </span>;
};