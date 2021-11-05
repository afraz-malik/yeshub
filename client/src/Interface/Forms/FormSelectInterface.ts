export interface FormSelectInterface {
    id?: string
    label?: string | React.ReactNode
    labelClass?: string
    name: string
    className?: string
    onBlur?: any
    onChange: Function
    inputWrapperClass?: string
    props?: any
    defaultValue?: string
    isRequired?: boolean
    isCommunity?: boolean
    value?: string | number
}
