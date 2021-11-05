import React, { useEffect, useState } from "react"

import FormHeader from "../../../Container/Top/FormHeader"
import UserSettings from "../../../Helpers/Request/Services/Profile/UserSettings"
import ProfileInterface from "../../../Interface/Profile/Profile"
import Profile from "../index"
import AccountSettings from "./Components/AccountSettings"
import FAQs from "./Components/FAQs"
import MoreInformationForm from "./Components/MoreInformation"
import ProfileInfo from "./Components/ProfileInfo"
import SetProfilePic from "./Components/SetProfilePic"
import DeActivateAccount from "./Components/DeactivateAccount"

const Settings = () => {
    const [data, setData] = useState<ProfileInterface | any>({})
    useEffect(() => {
        getProfile();

    }, [])

    const getProfile = () => {
        UserSettings.fetchAll().then(response => {
            setData(response.data?.data)
        })
    }


    return (
        <Profile>
            {/* <FormHeader title={"Settings"} showDrafts={false} /> */}
            <SetProfilePic userName={data.userName} statement={data.PersonalStatement} userImage={data.userImage} getProfile={getProfile}/>
            <AccountSettings email={data.email} muteNotifications={data.muteNotifications} getProfile={getProfile} />
            <ProfileInfo userName={data.userName} statement={data.PersonalStatement} />
            <MoreInformationForm metaInfo={data.metaInfo} />
            <FAQs otherInfo={data.otherInfo} />
            <DeActivateAccount />
        </Profile>
    )
}

export default Settings
