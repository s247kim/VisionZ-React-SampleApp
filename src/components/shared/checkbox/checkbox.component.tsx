import { FC, KeyboardEvent } from "react";

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

    const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
        if (isDisabled && !handleCheckedStateChange) return;

        const { code, altKey, ctrlKey, shiftKey } = event;

        switch (code.toLowerCase()) {
            case "space": {
                if (!altKey && !ctrlKey && !shiftKey) {
                    event.preventDefault();
                    event.stopPropagation();
                    handleCheckedStateChange!(!isChecked);
                }
                return;
            }
        }
    };

    return <span tabIndex={isDisabled ? -1 : 0}
                 className={[styles.checkbox, isDisabled ? styles.disabled : ""].join(" ")}
                 onClick={changeCheckedState}
                 onKeyDown={handleKeyDown}>
        {isChecked && <div className={"checker"}></div>}
    </span>;
};