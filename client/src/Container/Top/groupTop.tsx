import React, { FC, ReactElement, useContext } from "react"
import { PostedImage } from "../../Shared/Images/Images"
import ModalContext from "../../Context/ModalContext"
import assetUrl from "../../Helpers/Functions/assetUrl"

type GroupTopBarContent = {
    state: any
}

const GroupTopBar: FC<GroupTopBarContent> = ({ state }): ReactElement => {
    const { setOpenModal, setModalType, setModalContent } = useContext(ModalContext)

    const setContent = () => {
        setModalContent(state)
    }

    return (
        <div className="d-flex flex-row align-items-center ">
            <div className="image mr-2 profile-image">
                <img src={state.logo ? assetUrl(state.logo) : PostedImage} alt={state.name} />
            </div>
            <div className="d-flex flex-column">
                <div className="grp-name">{state.name}</div>
                <div
                    className="grp-members text-info"
                    onClick={() => {
                        setContent()
                        setOpenModal(true)
                        setModalType("communityUsers")
                    }}
                >
                    <span>Members</span>
                    <span className="ml-1">{state.totalMembers || 0}</span>
                </div>
            </div>
        </div>
    )
}

export default GroupTopBar
