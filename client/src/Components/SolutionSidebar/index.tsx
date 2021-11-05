import React from "react"

import { Link } from "react-router-dom"
import { CalendarStage, CommunitiesStage, DraftStage, HomeStage, SavedStage, SolutionsStage } from "../../Shared/Icons"
const linkStyle = {
    "list-style": "none",
    margin: "0 1.3em",
    padding: "1em",
    // 'color': '#243C4B',
    "font-size": "14px",
    // "background": "#F5F5F5",
    // "border-radius": "5px"
}
const SolutionSidebar: React.FC<any> = ({ onFollow }) => {
    return (
        <div style={{ position: "sticky", top: "80px" }} className="mc-border card py-2 mt-4 mb-4">
            <div style={{ margin: "0px 1.3em" }} className="bb-xlgray">
                <ul>
                    <li style={{ ...linkStyle, margin: 0 }}>
                        <span className="svg-icon">{HomeStage}</span>
                        <Link to={""}> Home </Link>
                    </li>
                    {/* <li style={{...linkStyle, margin: 0}}>
                                         <span className="svg-icon">{SavedStage}</span>
                                        <Link to={""} > Saved </Link>
                                    </li>
                                    <li style={{...linkStyle, margin: 0}}>
                                         <span className="svg-icon">{DraftStage}</span>
                                        <Link to={""} > Drafts </Link>
                                    </li> */}
                </ul>
            </div>

            <div className="mt-4" style={{ margin: "0px 1.3em" }}>
                <div className="d-flex">
                    <div className="mb-auto" style={{ display: "inline-block", marginLeft: "1em" }}>
                        <span className="svg-icon">{SolutionsStage}</span>
                    </div>
                    <div style={{ display: "inline-block" }}>
                        <ul className="stage-sidebar">
                            <li
                                className="color-light-gray"
                                style={{ ...linkStyle, margin: 0, color: "#243C4B", padding: 0, marginTop: ".24em" }}
                            >
                                <Link to={"/solution"}> Solutions </Link>
                            </li>
                            <li className="color-light-gray" style={{ ...linkStyle, margin: 0, padding: 0 }}>
                                <Link to={"/stage/1"}> Toolkit </Link>
                            </li>
                            <li className="color-light-gray" style={{ ...linkStyle, margin: 0, padding: 0 }}>
                                <Link to={"/products/5ec652b35bd3087a74a6c8d2"}> YES!DIGITAL </Link>
                            </li>
                            <li className="color-light-gray" style={{ ...linkStyle, margin: 0, padding: 0 }}>
                                <Link to={"/featuredposts/all"}> Featured Stories </Link>
                            </li>
                            <li className="color-light-gray" style={{ ...linkStyle, margin: 0, padding: 0 }}>
                                <Link to={"/caseStudies/all"}> Case Stories </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="mb-auto" style={{ display: "inline-block", marginLeft: "1em" }}>
                        <span className="svg-icon">{CommunitiesStage}</span>
                    </div>
                    <div style={{ display: "inline-block" }}>
                        <ul className="stage-sidebar">
                            <li
                                className="color-light-gray"
                                style={{ ...linkStyle, margin: 0, color: "#243C4B", padding: 0, marginTop: ".24em" }}
                            >
                                <Link to={"/communities"}> Communities </Link>
                            </li>
                            <li className="color-light-gray" style={{ ...linkStyle, margin: 0, padding: 0 }}>
                                <Link to={"/communities"}> Browse All </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="mb-auto" style={{ display: "inline-block", marginLeft: "1em" }}>
                        <span className="svg-icon">{CalendarStage}</span>
                    </div>
                    <div style={{ display: "inline-block" }}>
                        <ul className="stage-sidebar">
                            <li style={{ ...linkStyle, margin: 0, color: "#243C4B", padding: 0, marginTop: ".24em" }}>
                                <Link to={""}> Events </Link>
                            </li>
                            <li className="color-light-gray" style={{ ...linkStyle, margin: 0, padding: 0 }}>
                                <Link to={"/events/calendar"}> Calendar </Link>
                            </li>
                            {/* <li className="color-light-gray" style={{...linkStyle, margin: 0, padding: 0}}>
                                                <Link to={""} > Upcoming </Link>
                                            </li>
                                            <li className="color-light-gray" style={{...linkStyle, margin: 0, padding: 0}}>
                                                <Link to={""} > Browse All </Link>
                                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SolutionSidebar
