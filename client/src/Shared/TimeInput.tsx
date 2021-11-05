import * as React from "react"
import DatePicker, { ReactDatePickerProps } from "react-datepicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import DatePickerConfig from "../Configs/DatePicker.json"

export interface DateInputProps {
    name: string
    value: Date | null | undefined
    onChange: (date: Date | null, name: string) => void
    options?: Partial<ReactDatePickerProps>
}

const CustomTimeInput = ({ value, onClick, onChange, ref }: any) => (
    <div className="custom__time-input">
        <input
            ref={ref}
            type="text"
            className="form-control form-input2"
            onClick={onClick}
            onChange={onChange}
            value={value}
        />
        <FontAwesomeIcon className="icon" icon={faChevronDown} />
    </div>
)

const TimeInput: React.FC<DateInputProps> = ({ name, value, onChange, options }) => {
    return (
        <DatePicker
            selected={value}
            onChange={date => onChange(date, name)}
            showPopperArrow={true}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={DatePickerConfig.timeIntervals}
            dateFormat={DatePickerConfig.dateFormat}
            customInput={<CustomTimeInput />}
            timeCaption="Time"
            {...options}
        />
    )
}

export default TimeInput
