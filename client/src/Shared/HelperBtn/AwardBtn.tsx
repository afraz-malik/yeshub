import * as React from "react"
import { Link } from "react-router-dom"

export interface AwardBtnProps {}

const AwardBtn: React.FC<AwardBtnProps> = () => {
    return (
        <div className="post-award">
            <Link to="#">
                <span className="icon">
                    <svg
                        className="post__icon"
                        viewBox="0 0 20 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M18 4H15.82C15.93 3.69 16 3.35 16 3C16 1.34 14.66 0 13 0C11.95 0 11.04 0.54 10.5 1.35L10 2.02L9.5 1.34C8.96 0.54 8.05 0 7 0C5.34 0 4 1.34 4 3C4 3.35 4.07 3.69 4.18 4H2C0.89 4 0.00999999 4.89 0.00999999 6L0 17C0 18.11 0.89 19 2 19H18C19.11 19 20 18.11 20 17V6C20 4.89 19.11 4 18 4ZM13 2C13.55 2 14 2.45 14 3C14 3.55 13.55 4 13 4C12.45 4 12 3.55 12 3C12 2.45 12.45 2 13 2ZM7 2C7.55 2 8 2.45 8 3C8 3.55 7.55 4 7 4C6.45 4 6 3.55 6 3C6 2.45 6.45 2 7 2ZM18 17H2V15H18V17ZM18 12H2V6H7.08L5 8.83L6.62 10L9 6.76L10 5.4L11 6.76L13.38 10L15 8.83L12.92 6H18V12Z" />
                    </svg>
                </span>
                <span className="text">Award</span>
            </Link>
        </div>
    )
}

export default AwardBtn
