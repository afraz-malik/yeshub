import * as React from "react"

export interface FormCheckBoxProps {
    name: string
    text: string
    isRequired?: boolean
    checked?: boolean
    disabled?: boolean
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormCheckBox: React.FC<FormCheckBoxProps> = ({
    name,
    text,
    isRequired = false,
    checked,
    disabled = false,
    handleChange,
}) => {
    return (
        <div className={`form-check ${disabled && "disabled"}`}>
            <label className="form-check-label" htmlFor={`${name}${disabled ? "a" : ""}`}>
                <input
                    type="checkbox"
                    className="form-check-input"
                    name={name}
                    id={name}
                    onChange={handleChange}
                    required={isRequired}
                    checked={checked}
                    disabled={disabled}
                />

                <span className="checkbox"></span>

                <div
                    className="label"
                    dangerouslySetInnerHTML={{
                        __html: text,
                    }}
                />
            </label>
        </div>
    )
}

export default FormCheckBox
