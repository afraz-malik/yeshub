// @ts-nocheck

import React from "react"
import Modal from "../Modal"
import ModalHeader from "../Modal/Header"
import ModalBody from "../Modal/Body"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import axiosService from "../../Helpers/Request/axiosService"
import { WEBSITE_URL } from "../../Constants/constants"
import { confirmAlert } from "react-confirm-alert"
import { FeedType } from "../../Interface/Home/FeedsInterface"
import { RELOAD_USER_PROFILE_EVENT } from "../../Constants/constants"

import "react-confirm-alert/src/react-confirm-alert.css"

export interface AwardProps {
    title: string
    isOpened: boolean
    toggle: any
    renderBody: any
    awards: any
    post: FeedType
    subText?: string
    mainClass?: string
    containerClass?: string
}

const Award: React.FC<AwardProps> = ({
    title,
    isOpened,
    toggle,
    renderBody,
    awards = [],
    post,
    subText,
    mainClass = "",
    containerClass = "",
}) => {
    const [showAwardDialog, setShowAwardDialog] = React.useState(false)
    const [selectedAward, setSelectedAward] = React.useState()

    const onCLickGiveAward = () => {
        confirmAlert({
            title: "Are you sure you want to give this award?",
            message: "",
            overlayClassName: "custom_overlayClass",
            buttons: [
                {
                    label: "Yes!",
                    onClick: () => {
                        handleGiveAward()
                    },
                },
                {
                    label: "No",
                },
            ],
        })
    }

    const handleGiveAward = () => {
        const data = {
            takerId: post.author._id,
            point: selectedAward.cost,
            awardId: selectedAward._id,
        }
        axiosService.post("/award/give", data).then(resp => {
            setSelectedAward(undefined)
            toggle()
            document.dispatchEvent(new CustomEvent(RELOAD_USER_PROFILE_EVENT))
        })
    }

    return (
        <div key={Math.random()}>
            <Modal
                isOpened={isOpened}
                otherProps={{ className: `moderator--modal modal-low-zIndex ${containerClass}` }}
            >
                <div className={`modal-main ${mainClass}`}>
                    <ModalHeader toggleModal={toggle}>
                        <div>
                            <h2 className="modal-title">{title}</h2>
                        </div>
                    </ModalHeader>
                    <div className="line__bottom" />

                    <ModalBody>
                        {subText && !selectedAward && (
                            <div className="award__subtext">
                                <p>{subText}</p>
                            </div>
                        )}
                        {renderBody ? (
                            renderBody()
                        ) : (
                            <>
                                {selectedAward && (
                                    <>
                                        <div className="selected__Award_container">
                                            <div className="image__container">
                                                <img src={`${WEBSITE_URL}/${selectedAward.images[0]}`} />
                                            </div>
                                            <div className="metaInfo">
                                                <p>
                                                    <strong>Award points:</strong> &nbsp;{selectedAward.cost}
                                                </p>
                                                <p>
                                                    <strong>Award Name:</strong>&nbsp; {selectedAward.awardDescription}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="line__bottom_selectedaward" />
                                    </>
                                )}

                                <div className="post__awards_container">
                                    <div className="post__award_main">
                                        {[...awards].map((award: any, i: number) => {
                                            return (
                                                <div
                                                    key={i}
                                                    onClick={() => setSelectedAward(award)}
                                                    className={`post__award_row ${
                                                        selectedAward && selectedAward._id === award._id
                                                            ? "post__award_Active"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="image">
                                                        <img src={`${WEBSITE_URL}/${award.images[0]}`} />
                                                    </div>
                                                    <div className="cost">{award.cost}</div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className={`post__award_footer ${selectedAward && "award__selected"}`}>
                                        <button
                                            disabled={!selectedAward}
                                            onClick={() => onCLickGiveAward()}
                                            className="btn"
                                        >
                                            Give Award
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </ModalBody>
                </div>
            </Modal>
        </div>
    )
}

export default Award
