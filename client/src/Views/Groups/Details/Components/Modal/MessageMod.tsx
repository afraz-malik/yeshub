import * as React from "react"
import { ModalBody } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import Modal from "../../../../../Shared/Modal"

type MessageModProps = {
    isOpen: boolean
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    message: string
    onMessageSend: () => void
    toggle: () => void
}

const MessageMod: React.SFC<MessageModProps> = ({ isOpen = false, toggle, onChange, onMessageSend, message }) => {
    return (
        <Modal isOpened={isOpen}>
            <ModalBody>
                <div className="d-flex justify-content-between mb-2">
                    <div className="close__icon" onClick={toggle}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <textarea
                    placeholder={"Type your message here"}
                    className="new--message form-control"
                    value={message}
                    onChange={onChange}
                />

                <div className="text-right mt-2">
                    <button className="btn btn-login" onClick={onMessageSend}>
                        Send
                    </button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default MessageMod
