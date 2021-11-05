import React, { ChangeEvent, FC, MouseEvent, useContext, useState } from "react"
import { Link } from "react-router-dom"
import Form from "../../Components/Form/Form"
import FormInput from "../../Components/Form/FormInput"
import Modal from "../../Components/Modals/Modal"
import LoginStatements from "../../Configs/ModalStatements.json"
import { CloseIcon, LoginSideBar, Logo } from "../../Shared/Images/Images"
import { ModalContext } from "../../Context/ModalContext"
import { ValidateStringsOnly } from "../../Validations/ValidateStringOnly"
import { count } from "../../Helpers/Functions/count"
import { ErrorsList } from "../../Components/Error/FormValidateErrors"
import FormCheckBox from "../../Components/Form/FormCheckBox"

type Register = {
    showClose?: boolean
}

const Register: FC<Register> = ({ showClose = true }) => {
    const [values, setValues] = useState({
        roleId: "5e2fd51f34ce7375a792ffc4",
        email: "",
        userName: "",
        password: "",
        terms: false,
    })
    const { openModal, setOpenModal, setModalType } = useContext(ModalContext)
    const [displayTerms, setTerms] = useState(false)
    const [errors, setErrors] = useState<any>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        if (type === "checkbox") {
            setValues({ ...values, [name]: checked })
            return
        }
        setValues({ ...values, [name]: value })
        if (errors) {
            const Validation = ValidateStringsOnly({ ...values, [name]: value })
            console.log(Validation)
            if (Validation) {
                setErrors({ ...Validation })
                console.log(errors)
                return
            }
            setErrors({})
        }
    }

    const setType = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const { id } = e.currentTarget
        setModalType(id)
    }

    const setTermsToShow = (val: any = {}) => {
        const Validation = ValidateStringsOnly({ ...values })
        console.log(isEveryThingValid(Validation))
        if (!isEveryThingValid(Validation)) {
            setErrors({ ...Validation })
            console.log(errors)
            return
        }
        setErrors(undefined)
        setTerms(true)
    }

    const isEveryThingValid = (error: any) => {
        let isOk = true
        for (let key in error) {
            if (!error[key].isValid) {
                isOk = false
                break
            }
        }
        return isOk
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
                    {/* <div className="col-3">
                        <div className="side-image">
                            <img src={LoginSideBar} alt={"LoginSideBar"} className="img-fluid" />
                        </div>
                    </div> */}
                    <div className="col-12">
                        <div className="position-relative">
                            {showClose && (
                                <button type="button" className="btn btnClose" onClick={() => setOpenModal(false)}>
                                    <img src={CloseIcon} alt={"x"} />
                                </button>
                            )}
                            <div className="login-form" style={{ padding: "3em 2em 2em" }}>
                                <div className="form-wrap">
                                    {/* <div className="form-logo">
                                        <img src={Logo} alt={"Logo"} />
                                    </div> */}
                                    <h3 className="my-3 login-header">SIGN UP</h3>
                                    {/* <h3 className="my-3 login-header">
                                        By having a YES!HUB account, you can join, vote, and comment on all your
                                        favorite content.
                                    </h3> */}

                                    <div className="form-container">
                                        {/* <ErrorsList errors={errors} /> */}
                                        <Form
                                            submitUrl={"/user/register"}
                                            data={values}
                                            props={{
                                                submitButtonClass: "btn btn-yellow",
                                                extraSubmitButtons: (
                                                    <>
                                                        <button
                                                            onClick={setTermsToShow}
                                                            className="btn btn-yellow"
                                                            type="button"
                                                        >
                                                            Next
                                                        </button>
                                                        <Link
                                                            className="fgp-text label-text-dark"
                                                            to="#"
                                                            id="login"
                                                            style={{ marginLeft: "15px" }}
                                                            onClick={setType}
                                                        >
                                                            OR Log in instead
                                                        </Link>
                                                    </>
                                                ),
                                                hideExtra: !displayTerms,
                                            }}
                                            hideSubmit={!displayTerms}
                                            buttonText={"Sign up"}
                                            // afterSubmitLink = {
                                            //     <Link
                                            //         className="fgp-text label-text-dark"
                                            //         to="#"
                                            //         id="login"
                                            //         onClick={setType}>
                                            //                 Log in!
                                            //              </Link>
                                            // }
                                            // afterSubmitChildren={
                                            //     <div className="form-group">
                                            //         <div className="login-bottom">
                                            //             <span>OR </span>
                                            //             <Link className="fgp-text" to="#" id="login" onClick={setType}>
                                            //                 Log in!
                                            //             </Link>
                                            //         </div>
                                            //     </div>
                                            // }
                                            // validate
                                            formId={"register"}
                                        >
                                            {!displayTerms ? (
                                                <>
                                                    <FormInput
                                                        type={"email"}
                                                        name={"email"}
                                                        onChange={onChange}
                                                        className={`form-control col-md-8 form-input1 ${
                                                            errors && !errors["email"].isValid ? "error" : ""
                                                        }`}
                                                        props={{
                                                            placeholder: "Email",
                                                            value: values.email,
                                                        }}
                                                        isRequired
                                                    />
                                                    {errors && !errors["email"].isValid && (
                                                        <>
                                                            {!errors["email"].isValid && (
                                                                <p className="text-error">
                                                                    {errors["email"].errorInvalidMessag ||
                                                                        errors["email"].errorRequiredMessage}
                                                                </p>
                                                            )}
                                                            {!errors["email"].isValid &&
                                                                !errors["email"].errorRequiredMessage &&
                                                                errors["email"].errorInvalidMessage && (
                                                                    <p className="text-error">
                                                                        {errors["email"].errorInvalidMessage}
                                                                    </p>
                                                                )}
                                                        </>
                                                    )}
                                                    <FormInput
                                                        type={"text"}
                                                        name={"userName"}
                                                        onChange={onChange}
                                                        className={`form-control col-md-8 form-input1 ${
                                                            errors && !errors["userName"].isValid ? "error" : ""
                                                        }`}
                                                        props={{
                                                            placeholder: "User Name",
                                                            value: values.userName,
                                                        }}
                                                        isRequired
                                                    />
                                                    {errors &&
                                                        !errors["userName"].isValid &&
                                                        errors["userName"].errorRequiredMessage && (
                                                            <>
                                                                <p className="text-error">
                                                                    {errors["userName"].errorRequiredMessage}
                                                                </p>
                                                            </>
                                                        )}
                                                    <FormInput
                                                        type={"password"}
                                                        name={"password"}
                                                        onChange={onChange}
                                                        className={`form-control col-md-8 form-input1 ${
                                                            errors && !errors["password"].isValid ? "error" : ""
                                                        }`}
                                                        props={{
                                                            placeholder: "Password",
                                                            value: values.password,
                                                        }}
                                                        isRequired
                                                    />
                                                    {errors &&
                                                        !errors["password"].isValid &&
                                                        (errors["password"].errorRequiredMessage ||
                                                            errors["password"].errorInvalidMessage) && (
                                                            <>
                                                                <p className="text-error">
                                                                    {errors["password"].errorRequiredMessage ||
                                                                        errors["password"].errorInvalidMessage}
                                                                </p>
                                                            </>
                                                        )}
                                                </>
                                            ) : (
                                                <div className="form-group">
                                                    <div className="login-bottom">
                                                        <span>
                                                            <span onClick={() => setTerms(false)}>
                                                                <i className="fa fa-arrow-left mr-1" />
                                                                Back
                                                            </span>
                                                            <FormCheckBox
                                                                text={LoginStatements["signupTerms"]}
                                                                checked={values.terms}
                                                                name="terms"
                                                                handleChange={onChange}
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
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

export default Register
