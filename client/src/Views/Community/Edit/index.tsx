import React, { FC, ReactElement } from "react"
import MainContent from "../../../Controller/Main/Content"
import { PostedImage } from "../../../Shared/Images/Images"
import FormHeader from "../../../Container/Top/FormHeader"
import EditForm from "./Component/EditForm"
import { useLocation, useHistory } from "react-router-dom"
import assetUrl from "../../../Helpers/Functions/assetUrl"

const EditCommunity: FC = (): ReactElement => {
    const { state }: any = useLocation()
    const { goBack } = useHistory()

    if (!state) goBack()

    return (
        <MainContent>
            <div className="cp-wrap">
                <FormHeader title="Edit Community" showDrafts={false} />
                <div className="mc-border mt-5 mt-lg-0 mb-3">
                    <div className="group-wrap">
                        <div className="grp-header d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center ">
                                <div className="image mr-2 profile-image">
                                    <img
                                        src={state.logo ? assetUrl(state.logo) : PostedImage}
                                        alt="group"
                                        className="profile-image"
                                    />
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="grp-name">{state.name}</div>
                                    <div className="grp-members">
                                        <span>Members</span>
                                        <span className="ml-1">{state.totalMembers || 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <EditForm state={state} />
            </div>
        </MainContent>
    )
}

export default EditCommunity
