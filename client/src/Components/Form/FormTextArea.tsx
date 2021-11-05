import React, { FC } from "react"

import { FormInputInterface } from "../../Interface/Forms/FormInputInterface"

const FormTextArea: FC<FormInputInterface> = ({
    name,
    className = "form-control form-input2",
    onBlur,
    onChange,
    props,
    id,
    label,
    labelClass = "form-label",
    inputWrapperClass = "form-group",
    defaultValue,
    isRequired = false,
}) => {
    return (
        <div className={`${inputWrapperClass} form__textarea-input`}>
            {label ? (
                <label htmlFor={name} className={labelClass}>
                    {label}
                </label>
            ) : (
                ""
            )}
            <textarea
                name={name}
                onBlur={onBlur}
                id={id || name}
                onChange={onChange}
                className={className}
                required={isRequired}
                defaultValue={defaultValue}
                {...props}
            />
        </div>
    )
}

export default FormTextArea
