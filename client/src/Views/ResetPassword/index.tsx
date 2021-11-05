import React, { ChangeEvent, FC, useState } from "react"
import { useParams } from "react-router-dom"

import Form from "../../Components/Form/Form"
import FormInput from "../../Components/Form/FormInput"
import { Logo } from "../../Shared/Images/Images"

type IResetPassword = {
    showClose?: boolean
}

const ResetPassword: FC<IResetPassword> = () => {
    const { email, hash } = useParams()
    const [values, setValues] = useState({
        hash,
        email,
        password: "",
        confirmPassword: "",
    })

    let onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <section>
            <div className="main-content pb-50">
                <div className="main-content-wrap">
                    <div className="mx_width" style={{ maxWidth: 750 }}>
                        <div className="main-content-body">
                            <div className="mc-mid pt-lg-0 pt-5">
                                <div className="mc-mid-content">
                                    <div className="mc-mid-wrap">
                                        <div className={"post-container mt-5"}>
                                            <div className="post-wrap">
                                                <div className="post-body">
                                                    <div className="ps-left">
                                                        <div className="left-wrapper">
                                                            <div className="">
                                                                <div className="form-logo">
                                                                    <img src={Logo} alt={"Logo"} />
                                                                </div>
                                                                <h3 className="my-3 login-header">Reset Password</h3>
                                                                <div className="form-container">
                                                                    <Form
                                                                        redirectUrl={"/"}
                                                                        submitUrl={"/forgotPassword/updatePasword"}
                                                                        data={values}
                                                                        props={{
                                                                            submitButtonClass: "btn btn-login",
                                                                        }}
                                                                        isFormData={false}
                                                                        buttonText={"Submit"}
                                                                        formId={"forget"}
                                                                    >
                                                                        <FormInput
                                                                            type="password"
                                                                            name={"password"}
                                                                            onChange={onChange}
                                                                            className={
                                                                                "form-control col-md-12 form-input1"
                                                                            }
                                                                            props={{
                                                                                placeholder: "Password",
                                                                            }}
                                                                        />
                                                                        <FormInput
                                                                            type="password"
                                                                            name={"confirmPassword"}
                                                                            onChange={onChange}
                                                                            className={
                                                                                "form-control col-md-12 form-input1"
                                                                            }
                                                                            props={{
                                                                                placeholder: "Confirm Password",
                                                                            }}
                                                                        />
                                                                    </Form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword
