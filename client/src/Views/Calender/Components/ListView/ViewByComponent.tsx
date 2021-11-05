import React, { FC, ReactElement } from "react"
import { MenuIcon } from "../../../../Shared/Images/Images"

type ViewByComponent = {
    onToggle: Function
    show: boolean
}

const ViewByComponent: FC<ViewByComponent> = ({
    onToggle,
    show,
}): ReactElement => {
    return (
        <div className="mc-border py-3 mt-1">
            <div className="d-flex align-items-center justify-content-between">
                <div className="select-characteristics">
                    <div className="d-flex align-items-center">
                        <span className="select-characteristics-text">
                            Event Characteristics:
                        </span>
                        <div className="select_wrap1 ml-1" id="selectwrap1">
                            <ul
                                className="default_option1 list-unstyled"
                                id="defaultOption1"
                            >
                                <li onClick={() => onToggle()}>
                                    <div className="option trending">
                                        <span>{show ? "Hide" : "Show"}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="select-date">
                    <span className="select-characteristics-text">Date:</span>
                    <span className="select-dropdown-text">30 Oct 2020</span>
                    <span className="select-dropdown-image">
                        <img src={MenuIcon} alt="down" />
                    </span>
                    <span className="select-dropdown-text">To</span>
                    <span className="select-dropdown-image">
                        <img src={MenuIcon} alt="down" />
                    </span>
                    <span className="select-dropdown-text">30 Oct 2020</span>
                </div>
            </div>
        </div>
    )
}

export default ViewByComponent
