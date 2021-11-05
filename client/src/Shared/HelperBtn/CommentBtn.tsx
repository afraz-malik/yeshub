import * as React from "react"
import { Link } from "react-router-dom"

export interface CommentBtnProps {
    link: string
    text?: number
}

const CommentBtn: React.FC<CommentBtnProps> = ({ link = "", text }) => {
    return (
        <div className="post-save">
            <Link to={link}>
                <span className="icon">
                    <svg className="comment--icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.8 1H3.2C1.99 1 1 1.99 1 3.2V23L5.4 18.6H20.8C22.01 18.6 23 17.61 23 16.4V3.2C23 1.99 22.01 1 20.8 1ZM20.8 16.4H5.4L3.2 18.6V3.2H20.8V16.4Z"
                            fill="#243C4B"
                            stroke="#243C4B"
                            strokeWidth="0.5"
                        />
                    </svg>
                </span>
                <span className="text">{text}</span>
                {/* <span className="text">{text ? text : "Comment"}</span> */}
            </Link>
        </div>
    )
}

export default CommentBtn
