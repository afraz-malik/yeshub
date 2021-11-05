import * as React from "react"
import DatePicker, { ReactDatePickerProps } from "react-datepicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faCalendar } from "@fortawesome/free-regular-svg-icons"

export interface DateInputProps {
    name: string
    value: Date | null | undefined
    onChange?: (date: Date | null, name?: string) => void
    options?: Partial<ReactDatePickerProps>
}

const CustomDateInput = ({ value, onClick, onChange }: any) => (
    <div className="custom__time-input">
        <input
            type="text"
            className="form-control form-input2"
            onClick={onClick}
            onChange={onChange}
            value={value}
        />
        <FontAwesomeIcon className="icon" icon={faCalendar as any} />
    </div>
)

const DateInput: React.FC<DateInputProps> = ({
    name,
    value,
    onChange,
    options,
}) => {
    return (
        <DatePicker
            selected={value}
            className="form-control form-input2"
            onChange={date => onChange && onChange(date, name)}
            customInput={<CustomDateInput />}
            {...options}
        />
    )
}

export default DateInput
