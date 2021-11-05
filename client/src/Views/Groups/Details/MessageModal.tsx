import * as React from "react"
import { ModalBody } from "react-bootstrap"
import Modal from "../../../Shared/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { Avatar } from "../../../Shared/Images/Images"
import assetUrl from "../../../Helpers/Functions/assetUrl";
export interface MessageModalProps {
    isOpen: boolean;
    toggle: () => void;
    send: () => void;
    onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    message: string;
    community: any;
}

const MessageModal: React.SFC<MessageModalProps> = ({community, isOpen = false, toggle, onMessageChange, send, message }) => {
    return (
        <Modal isOpened={isOpen}>
            <ModalBody>
                <div className="d-flex justify-content-between mb-2">
                    <div className="d-flex align-items-center message--header">
                        {/* <img className="user--img" src={community?.logo || Avatar} alt="" /> */}
                        <img className="user--img" src={assetUrl(community?.logo)} alt="" />
                        <h6 className="user--name">{community?.name}</h6>
                    </div>
                    <div className="close__icon" onClick={toggle}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <textarea
                    placeholder={"Type your message here"}
                    className="new--message form-control"
                    value={message}
                    onChange={onMessageChange}
                />

                <div className="text-right mt-2">
                    <button className="btn btn-login" onClick={send}>
                        Send
                    </button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default MessageModal
