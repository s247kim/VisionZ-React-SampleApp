import { FC } from "react";

import styles from "./checkbox.styles.module.scss";

type CheckboxProps = {
    checked?: boolean;
    disabled?: boolean;
    handleCheckedStateChange?: (isChecked: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ checked: isChecked, disabled: isDisabled, handleCheckedStateChange }) => {
    const changeCheckedState = () => {
        if (!isDisabled && handleCheckedStateChange) {
            handleCheckedStateChange(!isChecked);
        }
    };

    return <span className={styles.checkbox} onClick={changeCheckedState}>
        {isChecked && <div className={"checker"}></div>}
    </span>;
};