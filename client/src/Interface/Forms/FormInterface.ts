export interface FormInterface {
    method?: string
    validate?: boolean
    children: React.ReactNode
    afterSubmitChildren?: React.ReactNode
    afterSubmitLink?: React.ReactNode
    submitUrl: string
    data: Record<string, any>
    className?: string
    props?: any
    buttonText?: string
    formId?: string
    submitBtnWrapperClass?: string
    isFormData?: boolean
    showCancel?: boolean
    refreshUser?: boolean
    hideSubmit?: boolean
    redirectUrl?: string
    saveAsDraftUrl?: string
    afterSubmit?: (response?: any) => void
}
