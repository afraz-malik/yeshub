import React, { FC, ReactElement } from "react"
import { Link } from "react-router-dom"

import { Logo } from "../../Shared/Images/Images"

type Footer = {
    marginTop?: boolean
}

export const Footer: FC<Footer> = ({ marginTop = false }): ReactElement => {
    return (
        <div className={`mc-border ${!marginTop && "mt-5"}`}>
            <div className="sidelist-container">
                <div className="sidelist-wrap">
                    <div className="side-logo mb-4">
                        <img src={Logo} alt={"logo"} />
                    </div>

                    <div className="side-column-list">
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to="#">About</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Careers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Press</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Advertise</Link>
                                    </li>
                                    <li>
                                        <Link to="#">blog</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="list-unstyled">
                                    <li>
                                        <Link to="#">Top Posts</Link>
                                    </li>
                                    <li>
                                        <Link to="/communities">My Communities</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="side-inline-list">
                        <ul className="list-unstyled">
                            <li>
                                <Link to="#">Terms</Link>
                            </li>
                            <li>
                                <Link to="#">Content policy</Link>
                            </li>
                            <li>
                                <Link to="#">Privacy policy</Link>
                            </li>
                            <li>
                                <Link to="#">Mod policy</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="copyright-wrapper">
                        <span> YES! HUB © 2020. All rights reserved</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
