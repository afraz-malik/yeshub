import React, { FC, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import MainContent from "../../Controller/Main/Content"
import { LargeUserIcon } from "../../Shared/Images/Images"
import UserSettings from "../../Helpers/Request/Services/Profile/UserSettings"
import { ProfileContext } from "../../Context/ProfileContext"
import { user } from "../../Constants/getUserId"
import ProfileInterface from "../../Interface/Profile/Profile"
import EventBus from "../../Helpers/Request/Services/event-bus"
import assetUrl from "../../Helpers/Functions/assetUrl"

type Profile = {
    showSideBar?: boolean
    public_profile?: any
}

const Profile: FC<Profile> = ({ public_profile, children, showSideBar = true }) => {
    const [data, setUserData] = useState<ProfileInterface | any>(user || {})
    const [externalUser, setexternalUser] = useState(false)
    useEffect(() => {
        EventBus.on("profile-data", (data: any) => {
            setUserData({ ...data.detail })
            setexternalUser(true)
        })

        UserSettings.fetchAll()
            .then(response => {
                setUserData(response.data.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <ProfileContext.Provider value={{ data }}>
            <MainContent
                asideRightContent={
                    <>
                        {showSideBar ? (
                            <>
                                <div className="mc-border mt-0">
                                    <div className="group-wrap">
                                        <div className={`grp-header d-flex pb-2 ${externalUser ? "" : "bb-1"}`}>
                                            <div className="header-user-dropdown">
                                                <div className="d-flex">
                                                    <div className="pf-image">
                                                        <span className="square_user_profile">
                                                            <img
                                                                src={assetUrl(data.userImage) || LargeUserIcon}
                                                                alt={"User"}
                                                            />
                                                        </span>
                                                    </div>
                                                    <div className="header-user-detail ml-2">
                                                        <div className="grp-name mb-0">
                                                            <p className="text-dark-blue fs-16 fw-700 mb-0">
                                                                {data?.userName}
                                                            </p>
                                                            {/* {data?.userName} */}
                                                        </div>
                                                        <div className="grp-name">
                                                            <strong className="fs-12 fw-700">Cookie Points</strong>{" "}
                                                            <span className="color-light-gray">
                                                                {data ? data?.points?.toFixed(3) : 0}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="general-text pt-2 mb-0">{data?.PersonalStatement}</p>
                                        {!externalUser && (
                                            <div className="form-group mt-3">
                                                <Link to={"/profile/settings"} className="btn btn-view">
                                                    Edit my board
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mc-border mt-4">
                                    <p className="fs-16 fw-700 text-dark-blue">Awards:</p>
                                    <div className="pb-2">
                                        {data?.receivedAward?.map((itm: any, index: number) => (
                                            <div className="d-flex flex-row">
                                                <img src={assetUrl(itm.image)} />
                                                <span className="fs-16 fw-500">{itm.title}</span>
                                            </div>
                                        ))}
                                        {data?.receivedAward.length === 0 && (
                                            <p className="text-center">No Award Received</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </>
                }
            >
                {children}
            </MainContent>
        </ProfileContext.Provider>
    )
}

export default Profile
