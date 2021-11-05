import React, { ChangeEvent, FC, useContext, useState, ReactElement } from "react"

import Modal from "../../../../../Components/Modals/Modal"
import { CloseIcon, PostedImage, SearchIcon } from "../../../../../Shared/Images/Images"
import { ModalContext } from "../../../../../Context/ModalContext"
import CommunityUsers from "./Users"
const CommunityUsersModal: FC = (): ReactElement => {
    const [values, setValues] = useState({})
    const { openModal, setOpenModal, modalContent }: any = useContext(ModalContext)

    // const [users, setUsers] = useState([])

    // useEffect(() => {
    //     CommunitiesList.getCommunityUsers(modalContent._id).then(response => {
    //         if (response) {
    //             setUsers(response.data.data.docs)
    //         }
    //     })
    // }, [modalContent._id])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
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
                <div className="position-relative">
                    <button
                        type="button"
                        className="btn btnClose"
                        data-toggle="modal"
                        data-target="#myModal"
                        onClick={() => setOpenModal(false)}
                    >
                        <img src={CloseIcon} alt="x" />
                    </button>
                    <div className="px-5 py-4">
                        <div className="grp-header pb-3 bb-1 mb-3">
                            <div className="d-flex flex-row align-items-center ">
                                <div className="image mr-2">
                                    <img src={PostedImage} alt="groupImage" />
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="grp-name">{modalContent?.name}</div>
                                    <div className="grp-members">
                                        <span>Members</span>
                                        <span className={"ml-2"}>{}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="header-serach-form">
                            <div className="position-relative">
                                <input
                                    type="text"
                                    className="form-control form-search"
                                    placeholder="Search YES!HUB"
                                    name="search"
                                    onChange={onChange}
                                />
                                <div className="search-button">
                                    <button id="buttonSearch" className="btn btn-search">
                                        <img src={SearchIcon} alt="search" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <CommunityUsers users={modalContent.userList} state={modalContent} />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CommunityUsersModal
