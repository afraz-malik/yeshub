import React, { ChangeEvent, FC, MouseEvent, useContext, useState } from "react"
import { Link } from "react-router-dom"

import Form from "../../Components/Form/Form"
import FormInput from "../../Components/Form/FormInput"
import Modal from "../../Components/Modals/Modal"
import { CloseIcon, LoginSideBar, Logo } from "../../Shared/Images/Images"
import { ModalContext } from "../../Context/ModalContext"
import { EyeCloseIcon, EyeIcon } from "../../Shared/Icons"
import FormCheckBox from "../../Components/Form/FormCheckBox"

type Login = {
    showClose?: boolean
}

const LoginForm: FC<Login> = ({ showClose = true }) => {
    const [values, setValues] = useState({})
    const { openModal, setOpenModal, setModalType } = useContext(ModalContext)

    const [showPassword, setshowPassword] = useState(false)

    let onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name, checked, type } = e.target
        if (type === "checkbox") {
            console.log(value, checked)
        }
        setValues({ ...values, [name]: type === "checkbox" ? checked : value })
        console.log(values)
    }

    const setType = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const { id } = e.currentTarget
        setModalType(id)
        setOpenModal(true)
    }

    const onToggle = () => {
        setshowPassword(!showPassword)
    }
    return (
        <Modal
            wrapperClass={"modal customModal"}
            id={"myModal"}
            role={"dialog"}
            style={{ display: "block" }}
            // innerWrapperClass={"modal-lg modal-login"}
            innerWrapperClass={"modal-login"}
            isOpened={openModal}
        >
            <div className="modal-content">
                <div className="row">
                    {/* <div className="col-3">
                        <div className="side-image">
                            <img src={LoginSideBar} alt={"LoginSideBar"} className="img-fluid" />
                        </div>
                    </div> */}
                    <div className="col-12">
                        <div className="position-relative" style={{ padding: "3em 3em 2em" }}>
                            {showClose && (
                                <button type="button" className="btn btnClose" onClick={() => setOpenModal(false)}>
                                    <img src={CloseIcon} alt={"x"} />
                                </button>
                            )}
                            <div className="login-form" style={{ paddingRight: "0" }}>
                                <div className="form-wrap">
                                    {/* <div className="form-logo">
                                        <img src={Logo} alt={"Logo"} />
                                    </div> */}
                                    <h3 className="my-3 login-header">LOG IN</h3>
                                    <div className="form-container">
                                        <Form
                                            submitUrl={"/user/login"}
                                            data={values}
                                            props={{
                                                submitButtonClass: "btn btn-yellow",
                                            }}
                                            buttonText={"Login"}
                                            afterSubmitLink={
                                                <Link
                                                    style={{ marginLeft: "15px" }}
                                                    className="fgp-text label-text-darks"
                                                    to="#"
                                                    id="register"
                                                    onClick={setType}
                                                >
                                                    OR Sign Up instead
                                                </Link>
                                            }
                                            // afterSubmitChildren={
                                            // <div className="form-group">
                                            //     <div className="login-bottom">
                                            //         <span>OR</span>
                                            //         <Link
                                            //             className="fgp-text"
                                            //             to="#"
                                            //             id="register"
                                            //             onClick={setType}
                                            //         >
                                            //             OR Sign Up!
                                            //         </Link>
                                            //     </div>
                                            // </div>
                                            // }
                                            formId={"login"}
                                        >
                                            <label htmlFor="" className="fgp-text label-text-dark">
                                                Email
                                            </label>
                                            <FormInput
                                                type="text"
                                                name={"email"}
                                                onChange={onChange}
                                                className={"form-control form-input1"}
                                                props={{
                                                    placeholder: "User Name or Email",
                                                }}
                                            />
                                            <div className="" style={{ position: "relative" }}>
                                                <label
                                                    className="fgp-text label-text-dark"
                                                    style={{ display: "block" }}
                                                >
                                                    Password
                                                    <span className="pull-right">
                                                        <Link to="#" className="fgp-text" id="forget" onClick={setType}>
                                                            Forgot Password?
                                                        </Link>
                                                    </span>
                                                </label>
                                                <FormInput
                                                    type={"password"}
                                                    name={"password"}
                                                    onChange={onChange}
                                                    className={"form-control form-input1"}
                                                    props={{
                                                        placeholder: "Password",
                                                    }}
                                                    isShowPassword={showPassword}
                                                />
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        top: "40px",
                                                        right: "9px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={e => onToggle()}
                                                >
                                                    {showPassword ? EyeCloseIcon : EyeIcon}
                                                </span>
                                                <FormCheckBox
                                                    name="isLogedMeIn"
                                                    handleChange={onChange}
                                                    text="<span class='d-block mt-1'>Keep me loged in</span>"
                                                />
                                                {/* <span>{EyeIcon}</span> */}
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default LoginForm
