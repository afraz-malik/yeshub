import React, { ChangeEvent, FC, ReactElement, useContext, useState } from "react"
import { Link } from "react-router-dom"

import Form from "../../../Components/Form/Form"
import FormInput from "../../../Components/Form/FormInput"
import LoginStatements from "../../../Configs/ModalStatements.json"
import ModalContext from "../../../Context/ModalContext"
import { isLoggedIn } from "../../../Hooks/Auth/getAuth"
import FormCheckBox from "../../../Components/Form/FormCheckBox"
import { HomeHeaderHub } from "../../../Shared/Images/Images"

const HomeHeader: FC = (): ReactElement => {
    const { setOpenModal, setModalType } = useContext(ModalContext)
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        roleId: "5e2fd51f34ce7375a792ffc4",
        terms: false,
        confirmAge: false,
    })

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        if (type === "checkbox") {
            setValues({ ...values, [name]: checked })
            return
        }
        setValues({ ...values, [name]: value })
    }

    const onSignIn = () => {
        if (isLoggedIn) {
            return
        }
        setOpenModal(true)
        setModalType("login")
    }

    return (
        <header className="banner mt-navbar">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className="side-text mx-auto ml-lg-0 mr-lg-auto mb-3">
                            <div className="">
                                <img src={HomeHeaderHub} className="home__header-img" alt="" />
                                <p className="banner__text">
                                    Your one stop shop for Youth Employment and Entrepreneurship
                                </p>
                            </div>
                        </div>
                    </div>
                    {isLoggedIn ? null : (
                        <div className="col-12 col-lg-6">
                            <div className="join__community-form px-4 position-relative">
                                <h3 className="main__color text-center pt-4 pb-1 form__heading">
                                    Be part of our Communities!
                                </h3>
                                <Form
                                    afterSubmitChildren={
                                        <div className="text-center already__account mt-3">
                                            Already have an account?{" "}
                                            <Link to="#" onClick={onSignIn}>
                                                Sign in
                                            </Link>
                                        </div>
                                    }
                                    submitUrl="/user/register"
                                    validate
                                    data={values}
                                    buttonText="CREATE ACCOUNT"
                                    props={{
                                        submitButtonClass: "btn btn-warning btn__signup py-2 px-5 text-uppercase",
                                    }}
                                    formId="register"
                                    submitBtnWrapperClass="text-center form__btn"
                                >
                                    <FormInput
                                        className={""}
                                        isRequired
                                        inputWrapperClass="form__input"
                                        name="userName"
                                        onChange={onValueChange}
                                        props={{
                                            placeholder: "User Name",
                                        }}
                                    />
                                    <FormInput
                                        type="email"
                                        className={""}
                                        isRequired
                                        inputWrapperClass="form__input"
                                        name="email"
                                        onChange={onValueChange}
                                        props={{
                                            placeholder: "Email address",
                                        }}
                                    />
                                    <FormInput
                                        inputWrapperClass="form__input"
                                        className={""}
                                        name="password"
                                        isRequired
                                        type="password"
                                        isShowPassword={false}
                                        onChange={onValueChange}
                                        props={{ placeholder: "*********" }}
                                    />

                                    <div className="mt-1 confirm__age">
                                        <FormCheckBox
                                            text={"I confirm that I am over 18 years of age. "}
                                            name="confirmAge"
                                            checked={values.confirmAge}
                                            handleChange={onValueChange}
                                        />
                                    </div>

                                    <div className="form-group confirm__age">
                                        <div className="login-bottom">
                                            <FormCheckBox
                                                text={LoginStatements["signupTerms"]}
                                                checked={values.terms}
                                                name="terms"
                                                handleChange={onValueChange}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default HomeHeader
