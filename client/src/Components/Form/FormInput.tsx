import React, { FC, useState } from "react"

import { FormInputInterface } from "../../Interface/Forms/FormInputInterface"
import { EyeCloseIcon, EyeIcon } from "../../Shared/Icons"
import FormCheckBox from "./FormCheckBox"

const FormInput: FC<FormInputInterface> = ({
    type = "text",
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
    isShowPassword = false,
    isLogedMeIn = true
}) => {
    const [showPassword, setShowPassword] = useState(false)

    const onToggle = () => {
        setShowPassword(state => !state)
    }

    const onIsLogedInChange = (e:any) => {
        console.log(e.target.checked);
        
        onChange(e);
    }

    return (
        <>
            <div className={inputWrapperClass}>
                {label ? (
                    <label htmlFor={name} className={labelClass}>
                        {label}
                    </label>
                ) : (
                    ""
                )}
                <input
                    type={isShowPassword ? "text" : type}
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
            {/* {type === "password" && isShowPassword && (
                <>
                <span style={{position: "absolute", top: "40px", right: "9px", cursor: "pointer"}} onClick={(e) => onToggle()}>
                    {showPassword ? EyeCloseIcon : EyeIcon}</span>
                <FormCheckBox
                    name="isLogedMeIn"
                    handleChange={onChange}
                    text="<span class='d-block mt-1'>Loged me in</span>"
                />
                {isLogedMeIn}
                </>
            )} */}
        </>
    )
}

export default FormInput
