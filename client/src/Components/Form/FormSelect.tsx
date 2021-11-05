import React, { FC } from "react"

import { FormSelectInterface } from "../../Interface/Forms/FormSelectInterface"

const FormSelect: FC<FormSelectInterface> = ({
    name,
    className = "form-control form-input2",
    onBlur,
    onChange,
    props,
    id,
    label,
    labelClass = "form-label",
    inputWrapperClass = "form-group",
    isRequired = true,
    children,
    defaultValue,
    isCommunity = false,
}) => {
    return (
        <div className={inputWrapperClass}>
            {label ? (
                <label htmlFor={name} className={labelClass}>
                    {label}
                </label>
            ) : (
                ""
            )}
            <select
                name={name}
                onBlur={onBlur}
                id={id || name}
                onChange={onChange}
                className={className}
                required={isRequired}
                value={defaultValue}
                {...props}
            >
                <option value={""}>{isCommunity ? "Select Community" : "Select Option"}</option>
                {children}
            </select>
        </div>
    )
}

export default FormSelect
