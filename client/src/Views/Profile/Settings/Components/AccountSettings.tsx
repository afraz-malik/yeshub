import React, { FC, ReactElement, useEffect, useState } from "react"

import Form from "../../../../Components/Form/Form"
import FormInput from "../../../../Components/Form/FormInput"
import DeActivateAccount from "./DeactivateAccount"
import FormCheckBox from "../../../../Components/Form/FormCheckBox"

import UserSettings from "../../../../Helpers/Request/Services/Profile/UserSettings"

type dataTypes = {
    email: string
    muteNotifications: boolean
    getProfile: any
}

const AccountSettings: FC<dataTypes> = ({ email, muteNotifications, getProfile }): ReactElement => {
    const [showPassword, setShowPassword] = useState(false)
    const [muteNotification, setMuteNotifications] = useState(false)
    const [passwordData, setPasswordData] = useState({
        password: "",
        newPassword: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({
            ...passwordData,
            [event.target.name]: event.target.value,
        })
    }

    const onTogglePassword = () => {
        setTimeout(() => {
            setShowPassword(state => !state)
        }, 2000)
    }

    useEffect(() => {
        document.addEventListener("changePassword", onTogglePassword)
        return () => document.removeEventListener("changePassword", onTogglePassword)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setMuteNotifications(muteNotifications)
    }, [muteNotifications])

    const handleNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        UserSettings.setMuteNotificationBit({ muteNotifications: event.target.checked }).then(resp => {
            getProfile()
        })
    }

    return (
        <div className="mc-border px-5 mt-4">
            <div className="bb-1 pb-2 mb-3">
                <h6 className="event-head-text">Account Settings</h6>
            </div>
            <div className="pb-2 mb-3">
                <div className="row">
                    <div className="col-md-6">
                        <h6 className="event-head-text">Email Address</h6>
                        <p className="post-in mb-0">{email}</p>
                    </div>
                    {/* <div className="col-md-6 align-self-end text-right">
                        <button className="btn btn-change">Change</button>
                    </div> */}
                </div>
            </div>
            <div className="pb-2 mb-3">
                <div className="row">
                    <div className="col-md-6">
                        <h6 className="event-head-text">Change Password</h6>
                        <p className="post-in mb-0">
                            Password should be minimum of 12 characters with a combination of uppercase, lowercase, and
                            numerical characters.
                        </p>
                        {showPassword ? (
                            <>
                                <Form
                                    submitUrl="user/changePassword"
                                    data={passwordData}
                                    isFormData={false}
                                    method="PUT"
                                    validate={true}
                                    formId={"changePassword"}
                                >
                                    <FormInput
                                        name="password"
                                        label={"Old Password"}
                                        labelClass={"event-head-text"}
                                        onChange={handleChange}
                                        type="password"
                                    />

                                    <h6 className="event-head-text">New Password</h6>

                                    <FormInput name="newPassword" onChange={handleChange} type="password" />

                                    <h6 className="event-head-text">Confirm New Password</h6>

                                    <FormInput name="confirmNewPassword" onChange={handleChange} type="password" />
                                </Form>
                            </>
                        ) : null}
                    </div>
                    <div className="col-md-6 align-self-start text-right">
                        <button className="btn btn-change" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "Close" : "Change"}
                        </button>
                    </div>
                </div>
            </div>
            {/* <DeActivateAccount /> */}
            <FormCheckBox
                name="offNotification"
                text="Mute notifications"
                handleChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleNotificationChange(event)
                }}
                checked={muteNotification}
            />
        </div>
    )
}

export default AccountSettings
