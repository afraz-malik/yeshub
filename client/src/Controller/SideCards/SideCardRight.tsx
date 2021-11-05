import React, { FC } from "react"

const SideCardRight: FC = ({ children }) => {
    return (
        <div className="mc-right pt-lg-0 pt-4">
            <div className="mc-right-content top__sticky-sidebar">
                <div className="mc-right-wrap">
                    <div className="mc-border">{children}</div>
                </div>
            </div>
        </div>
    )
}
export default SideCardRight
