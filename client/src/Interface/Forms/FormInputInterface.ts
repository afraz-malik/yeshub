import { ReactNode } from "react"

export interface FormInputInterface {
    id?: string
    label?: string | ReactNode
    labelClass?: string
    type?: "text" | "number" | "address" | "email" | "password" | "date" | "url"
    name: string
    className?: string
    onBlur?: any
    onChange: Function
    inputWrapperClass?: string
    props?: any
    defaultValue?: string
    isRequired?: boolean
    isShowPassword?: boolean
    isLogedMeIn?: boolean
}
