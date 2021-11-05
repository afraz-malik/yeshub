import React, { ChangeEvent, FC, MouseEvent, useContext, useState } from "react"
import { Link } from "react-router-dom"

import Form from "../../Components/Form/Form"
import FormInput from "../../Components/Form/FormInput"
import Modal from "../../Components/Modals/Modal"
import { CloseIcon, LoginSideBar, Logo } from "../../Shared/Images/Images"
import { ModalContext } from "../../Context/ModalContext"
import axiosService from "../../Helpers/Request/axiosService"

type IForgetPassword = {
    showClose?: boolean
}

const ForgetPassword: FC<IForgetPassword> = ({ showClose = true }) => {
    const [haasEmailSent, setHasEmailSent] = useState(false)

    const [values, setValues] = useState({
        email: "",
    })

    const { openModal, setOpenModal, setModalType } = useContext(ModalContext)

    let onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const setType = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const { id } = e.currentTarget
        setModalType(id)
    }

    const resendEmail = () => {
        axiosService.post("user/resendActivate", {
            email: values.email,
        })
    }

    const hasBeenSent = () => {
        setHasEmailSent(true)
    }

    return (
        <Modal
            wrapperClass={"modal customModal"}
            id={"myModal"}
            role={"dialog"}
            style={{ display: "block" }}
            innerWrapperClass={"modal-lg modal-login"}
            isOpened={openModal}
        >
            <div className="modal-content">
                <div className="row">
                    <div className="col-3">
                        <div className="side-image">
                            <img src={LoginSideBar} alt={"LoginSideBar"} className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="position-relative">
                            {showClose && (
                                <button type="button" className="btn btnClose" onClick={() => setOpenModal(false)}>
                                    <img src={CloseIcon} alt={"x"} />
                                </button>
                            )}
                            <div className="login-form">
                                <div className="form-wrap">
                                    <div className="form-logo">
                                        <img src={Logo} alt="Logo" />
                                    </div>
                                    {!haasEmailSent ? (
                                        <React.Fragment>
                                            <h3 className="my-3 login-header">Forget Password</h3>
                                            <div className="form-container">
                                                <Form
                                                    submitUrl="/forgotPassword"
                                                    data={values}
                                                    props={{
                                                        submitButtonClass: "btn btn-login",
                                                    }}
                                                    isFormData={false}
                                                    afterSubmit={hasBeenSent}
                                                    afterSubmitChildren={
                                                        <div className="form-group">
                                                            <div className="login-bottom">
                                                                <span>Remember Password?</span>
                                                                <Link
                                                                    className="fgp-text"
                                                                    to="#"
                                                                    id="login"
                                                                    onClick={setType}
                                                                >
                                                                    Login!
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    }
                                                    buttonText={"Submit"}
                                                    formId={"forget"}
                                                >
                                                    <FormInput
                                                        type="text"
                                                        name={"email"}
                                                        onChange={onChange}
                                                        className={"form-control col-md-12 form-input1"}
                                                        props={{
                                                            placeholder: "User Name or Email",
                                                        }}
                                                    />
                                                </Form>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <h3 className="my-3 login-header">Forget Password Email Sent</h3>
                                            <p>
                                                Any email has been sent to your email address. if you havn't received an
                                                email please click the button below.
                                            </p>
                                            <div className="form-group mt-3">
                                                <button className="btn btn-login" onClick={resendEmail}>
                                                    Resend Email
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ForgetPassword
