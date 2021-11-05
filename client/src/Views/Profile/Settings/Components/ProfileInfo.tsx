import React, { ChangeEvent, FC, ReactElement, useState } from "react"

import Form from "../../../../Components/Form/Form"
import FormTextArea from "../../../../Components/Form/FormTextArea"
import FormInput from "../../../../Components/Form/FormInput"

type ProfileData = {
    userName: string
    statement: string
}

const ProfileInfo: FC<ProfileData> = ({ userName, statement }): ReactElement => {
    const [values, setValues] = useState({ PersonalStatement: statement })
    const [username, setUsername] = useState(userName)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    return (
        <div className="mc-border px-5 mt-4">
            {/* <div className="bb-1 pb-2 mb-3">
                <h6 className="event-head-text">Profile Information</h6>
            </div> */}
            <div className="pb-2 mb-0">
                <div className="row">
                    <div className="col-md-12">
                        <h6 className="event-head-text">User Name</h6>
                        <Form submitUrl="user/changeUsername" data={{ username }} method="PUT">
                            <FormInput
                                name="username"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setUsername(event.target.value)
                                }
                                defaultValue={userName}
                            />
                        </Form>
                    </div>
                </div>
            </div>

            <div className="pb-0">
                <div className="row mt-3">
                    <div className="col-md-12">
                        <h6 className="event-head-text">{userName} Board</h6>
                        <Form
                            submitUrl={"/user/update"}
                            data={values}
                            validate
                            buttonText={"UPDATE"}
                            method={"PUT"}
                            refreshUser
                            props={{
                                submitButtonClass: "btn btn-save",
                            }}
                            submitBtnWrapperClass="personalInfo-from"
                        >
                            <FormTextArea
                                name={"PersonalStatement"}
                                onChange={onChange}
                                props={{
                                    placeholder: "A brief description of yourself shown on your profile.",
                                    rows: "5",
                                }}
                                defaultValue={statement}
                            />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo
