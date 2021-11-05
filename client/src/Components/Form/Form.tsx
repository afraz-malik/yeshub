import React, { FC, FormEvent, useEffect, useState } from "react"
import { Redirect, useLocation } from "react-router-dom"
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from "react-toasts"
import StatusCodes from "../../Enums/StatusCodes"
import axiosService from "../../Helpers/Request/axiosService"
import Auth from "../../Routes/Authentication"
import { Validate } from "../../Validations/FormValidation"
import { ErrorsList } from "../Error/FormValidateErrors"
import { FormInterface } from "../../Interface/Forms/FormInterface"
const subEventChecker = {
    _id: "0",
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    description: "",
    title: "",
}

const Form: FC<FormInterface> = ({
    method = "POST",
    validate,
    children,
    submitUrl,
    data = {},
    className = "form",
    props,
    buttonText,
    afterSubmitChildren,
    formId,
    isFormData,
    submitBtnWrapperClass,
    hideSubmit = false,
    redirectUrl,
    saveAsDraftUrl = "",
    afterSubmitLink,
    afterSubmit,
}) => {
    const { pathname } = useLocation()
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const [errors, setErrors] = useState({})
    const [success, setSuccess] = useState(false)
    const [successCode, setSuccessCode] = useState(0)
    const [text, setText] = useState<any>()

    const convertToFormData = (isSaveAsDraft?: boolean) => {
        let Form = new FormData()

        Object.entries(data).forEach(ele => {
            // console.log(ele);
            if (Array.isArray(ele[1])) {
                if (ele[0] === "subEvent") {
                    if (ele[1].length == 1) {
                        let elem = ele[1][0]
                        if (
                            (elem.title == undefined || elem.title == "" || elem.title || null) &&
                            (elem.description == undefined || elem.description == "" || elem.description || null)
                        ) {
                            ele[1] = []
                        }
                    }
                    return
                }
                if (ele[0] === "images") {
                    ele[1].map(item => Form.append(ele[0], item))
                    return
                }
                if (ele[0] === "characteristics") {
                    ele[1].map(item => {
                        return Form.append(`${ele[0]}[]`, item)
                    })
                    return
                }
                ele[1].map(item => {
                    if (typeof item === "object") {
                        return Form.append(`${ele[0]}[]`, JSON.stringify(item))
                    } else {
                        return Form.append(`${ele[0]}[]`, item)
                    }
                })
                return 0
            } else if (typeof ele[1] === "object") {
                if (ele[0] === "images") {
                    return Form.append(ele[0], ele[1])
                }
                return Form.append(ele[0], JSON.stringify(ele[1]))
            }
            Form.append(ele[0], ele[1])
        })
        if (isSaveAsDraft) {
            Form.delete("isPublished")
            Form.append("isPublished", "false")
        }
        return Form
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        let isLogedMeIn = false
        if (formId === "login") {
            isLogedMeIn = data["isLogedMeIn"]
            delete data["isLogedMeIn"]
        }
        if (formId === "create_post") {
            delete data["tag"]
        }
        const validateSuccess = Validate(data)
        if (validate) {
            if (validateSuccess.length !== 0) {
                setErrors(validateSuccess)
                setSubmitting(false)
                return
            }
        }

        let convertedData = isFormData ? convertToFormData() : data
        if (formId === "create_post") {
            convertedData = { ...convertedData, isPblished: true }
        }

        if (method === "PUT") {
            axiosService
                .put(submitUrl, convertedData)
                .then(response => {
                    if (response) {
                        setSubmitting(false)
                        setSuccess(true)
                        setSuccessCode(response.status)
                        setText(response?.data?.message)
                        if (formId === "changePassword" && response.status === 200) {
                            document.dispatchEvent(new CustomEvent("changePassword"))
                        }
                        if (afterSubmit) {
                            afterSubmit()
                        }
                        return response
                    }
                })
                .catch(() => {
                    setSubmitting(false)
                })
            return
        }

        axiosService
            .post(submitUrl, convertedData)
            .then(response => {
                if (formId === "login") {
                    response && Auth.authenticate(response.data.token, pathname, response.data.role, isLogedMeIn)
                }

                if (response) {
                    setSuccess(true)
                    setSuccessCode(response.status)
                    if (formId === "comment") {
                        document.dispatchEvent(new CustomEvent("comment-success"))
                        ToastsStore.success("Comment created successfully")
                    }
                    if (formId === "register" && response?.status === StatusCodes.Success) {
                        setText(
                            <>
                                <strong>Thanks for joining the HUB!</strong>
                                <p>
                                    Verify your email address to start contributing to our communities and building this
                                    collaboration space for practitioners like you and me.
                                </p>
                            </>
                        )
                        return
                    }

                    if (afterSubmit) {
                        afterSubmit(response.data)
                    }
                    setText(response?.data?.message)
                }
                setSubmitting(false)
                return response
            })
            .catch(() => {
                setSubmitting(false)
            })
    }

    const onSaveDraft = (e: FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        delete data["tag"]
        const convertedData = isFormData
            ? convertToFormData(true)
            : {
                  ...data,
                  isPublished: false,
              }
        if (method === "PUT") {
            axiosService
                .put(saveAsDraftUrl || submitUrl, convertedData)
                .then(response => {
                    setSubmitting(false)
                    setSuccess(true)
                    setSuccessCode(response.status)
                    setText(response?.data?.message)
                    return response
                })
                .catch(() => {
                    setSubmitting(false)
                })
            return
        }

        axiosService
            .post(submitUrl, convertedData)
            .then(response => {
                setSubmitting(false)
                setSuccess(true)
                setSuccessCode(response.status)
                setText(response?.data?.message)
                ToastsStore.success(response?.data?.message)
                return response
            })
            .catch(() => {
                setSubmitting(false)
            })
    }

    useEffect(() => {
        if (data?.terms === false) {
            setSubmitting(true)
        } else {
            setSubmitting(false)
        }
    }, [data])

    const closeAlert = () => {
        setSuccess(false)
    }

    if (redirectUrl && success) {
        return <Redirect to={redirectUrl} />
    }

    const LoginRegister = formId === ("login" || "register") ? "mt-3" : "text-right mb-0"

    return (
        <>
            {/* {success && formId == 'comment' && <ToastsContainer position={ToastsContainerPosition.BOTTOM_LEFT} store={ToastsStore}/>} */}
            {success && formId === "register" && successCode === 200 ? (
                <div className="alert alert-success d-block" role="alert">
                    {text}
                </div>
            ) : (
                <>
                    <ErrorsList errors={errors} />
                    {success && text && formId != "comment" && (
                        <div className="alert alert-success" role="alert">
                            <button
                                type="button"
                                className="close"
                                data-dismiss="alert"
                                aria-label="Close"
                                onClick={closeAlert}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            {text}
                        </div>
                    )}
                    <form
                        action=""
                        method={method}
                        className={className}
                        onSubmit={onSubmit}
                        encType={isFormData ? "multipart/form-data" : "application/x-www-form-urlencoded"}
                    >
                        {children}
                        <div className={submitBtnWrapperClass || `form-group ${LoginRegister}`}>
                            {props?.hideExtra && props?.extraSubmitButtons}
                            {props?.saveAsDraft && (
                                <button type="button" className="btn btn-draft" onClick={onSaveDraft}>
                                    SAVE AS DRAFT
                                </button>
                            )}
                            {!hideSubmit && (
                                <>
                                    <button
                                        type="submit"
                                        className={(props && props.submitButtonClass) || "btn btn-signup"}
                                        disabled={isSubmitting}
                                    >
                                        {buttonText || "Submit"}
                                    </button>{" "}
                                    {afterSubmitLink}
                                </>
                            )}
                        </div>
                        {afterSubmitChildren}
                    </form>
                </>
            )}
        </>
    )
}

export default Form
