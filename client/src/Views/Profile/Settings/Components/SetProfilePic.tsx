import React, { ChangeEvent, FC, ReactElement, useState } from "react"

import { Avatar, Upload, ProfileOptions } from "../../../../Shared/Images/Images"
import axiosService from "../../../../Helpers/Request/axiosService"
import { RELOAD_USER_PROFILE_EVENT, WEBSITE_URL } from "../../../../Constants/constants"

import Form from "../../../../Components/Form/Form"
import FormTextArea from "../../../../Components/Form/FormTextArea"
import FormInput from "../../../../Components/Form/FormInput"
import { profile } from "console"

export interface SetProfilePicProps {
    userName: string
    statement: string
    userImage: string
    getProfile: any
}

const SetProfilePic: React.FC<SetProfilePicProps> = ({ userName, statement, userImage, getProfile }) => {
    const [profileImage, setProfileImage] = React.useState<string>(userImage)
    const [activeIndex, setActiveIndex] = React.useState(-1)
    const [success, setSuccess] = React.useState<boolean>(false)
    const [values, setValues] = useState({ PersonalStatement: statement })
    const [username, setUsername] = useState(userName)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValues({ ...values, [name]: value })
    }

    const handleAvatarChange = (avatar: string, index: number) => {
        setProfileImage(avatar)
        setActiveIndex(index)
    }

    const handleImageUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const reader = new FileReader()

            reader.onload = result => {
                setProfileImage(result.target?.result?.toString() || "")
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    const handleSave = () => {
        axiosService
            .post("user/updateImage", {
                images: profileImage,
            })
            .then(() => {
                document.dispatchEvent(new CustomEvent(RELOAD_USER_PROFILE_EVENT))
                getProfile()
                setSuccess(true)
            })
    }

    const makeImageUrl = (image: any) => {
        if ([undefined, null, ""].includes(image)) {
            return ""
        }

        if (image.indexOf("data") == 0) {
            return image
        }

        return `${WEBSITE_URL}/${userImage}`
    }

    return (
        <div className="mc-border mt-4 setting_page">
            <div className="pb-0">
                <div className="form-group mb-0 mt-2">
                    {success ? <div className="alert alert-success">Image updated successfully.</div> : null}
                </div>
                <div className="row mt-3">
                    <div className="col-lg-1" />
                    <div className="col-lg-3">
                        <div className="profile_image_Round">
                            {userImage && <img src={makeImageUrl(profileImage || userImage)} alt="upload profile" />}
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="avatarlist">
                            <h6 className="event-head-text">Photo</h6>
                            <div className="avatar-wrap">
                                <ul className="list-unstyled d-flex flex-wrap">
                                    <li key="img-upload" className="setting__profileImg_Upload">
                                        <input
                                            type="file"
                                            hidden
                                            id="avatar"
                                            name="avatar"
                                            onChange={handleImageUpdate}
                                            accept="image/png, image/jpeg"
                                        />

                                        <label htmlFor="avatar" className="avatarUpload">
                                            <img src={Upload} alt="upload profile" />
                                        </label>
                                    </li>
                                    {ProfileOptions.map((option, index) => {
                                        return (
                                            <li key={index}>
                                                <img
                                                    alt="Avatar for profile"
                                                    className={`avatar--img-option ${
                                                        activeIndex === index ? "active" : ""
                                                    }`}
                                                    onClick={() => handleAvatarChange(option, index)}
                                                    src={option}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                        {/* <div className="row">
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
                        </div> */}
                    </div>
                </div>

                <div className="mt-3 text-right">
                    <button className="btn btn-save" onClick={handleSave}>
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SetProfilePic
