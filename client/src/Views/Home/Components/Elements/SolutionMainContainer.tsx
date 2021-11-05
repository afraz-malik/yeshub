import React, { useEffect } from "react"
import ReactTooltip from "react-tooltip"
import SolutionSidebar from "../../../../Components/SolutionSidebar"
import Footer from "../../../../Shared/Footer"

const SolutionMainContainer: React.FC<any> = ({ languareBar, topbar, sidebarItem, children }) => {
    useEffect(() => {
        console.log("testing ....")
    }, [])
    return (
        <>
            <ReactTooltip multiline={true} delayHide={200} delayShow={200} />
            {/* {languareBar} */}
            {topbar}
            <br />

            <div className="container-fluid stage__section_body_container">
                <div className="row">
                    <div className="col-4">
                        {sidebarItem}
                        <div style={{ position: "sticky", top: "70px" }}>
                            <SolutionSidebar />
                        </div>
                    </div>
                    <div className="col-8">{children}</div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default SolutionMainContainer
