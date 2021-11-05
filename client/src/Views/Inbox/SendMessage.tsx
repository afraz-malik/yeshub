import React, { ChangeEvent, FC, FormEvent, KeyboardEvent } from "react"

type SendMessageProps = {
    onSend: (e: FormEvent<HTMLFormElement>) => void
    onMessageType: (e: ChangeEvent<HTMLTextAreaElement>) => void
    onKeyUp: (e: KeyboardEvent<HTMLTextAreaElement>) => void
    message: string
}

const SendMessage: FC<SendMessageProps> = ({ onSend, onMessageType, message, onKeyUp }) => {
    return (
        <form onSubmit={onSend}>
            <div className="message--input">
                <textarea
                    className="form-control message-text"
                    name="message"
                    value={message}
                    onKeyUp={onKeyUp}
                    onChange={onMessageType}
                    placeholder={"Type your message"}
                />
                <button className="btn send--btn" type={"submit"} disabled={!message}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="39.881" height="34.183" viewBox="0 0 39.881 34.183">
                        <g transform="translate(0 0)">
                            <g transform="translate(0 0)">
                                <path
                                    fill="#243c4b"
                                    d="M.019,32,0,45.294l28.486,3.8L0,52.89.019,66.183,39.881,49.092Z"
                                    transform="translate(0 -32)"
                                />
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
        </form>
    )
}

export default SendMessage
