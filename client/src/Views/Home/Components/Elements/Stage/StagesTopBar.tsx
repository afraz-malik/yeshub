import * as React from "react"
import { NavLink } from "react-router-dom"
import { allDummyStages } from "./stage-data"
export interface StagesTopBarProps {}

const StagesTopBar: React.SFC<StagesTopBarProps> = () => {
    return (
        <div className="page--header__line">
            <div className="container position-relative">
                <div className="points">
                    <NavLink exact activeClassName="active" to="/stage/1" className="point">
                        <span className="text">{allDummyStages[0].title}</span>
                    </NavLink>
                    <NavLink exact activeClassName="active" to="/stage/2" className="point">
                        <span className="text">{allDummyStages[1].title}</span>
                    </NavLink>
                    <NavLink exact activeClassName="active" to="/stage/3" className="point">
                        {/* <span className="text">Partnering with Local Actors</span> */}
                        <span className="text" style={{ width: "160px" }}>
                            {allDummyStages[2].title}
                        </span>
                    </NavLink>

                    <NavLink exact activeClassName="active" to="/stage/4" className="point">
                        <span className="text">{allDummyStages[3].title}</span>
                    </NavLink>
                    <NavLink exact activeClassName="active" to="/stage/5" className="point">
                        <span className="text">{allDummyStages[4].title}</span>
                    </NavLink>
                    <NavLink exact activeClassName="active" to="/stage/6" className="point">
                        <span className="text">{allDummyStages[5].title}</span>
                    </NavLink>

                    <NavLink exact activeClassName="active" to="/stage/7" className="point">
                        <span className="text">{allDummyStages[6].title}</span>
                    </NavLink>
                    <NavLink exact activeClassName="active" to="/stage/8" className="point">
                        <span className="text">{allDummyStages[7].title}</span>
                    </NavLink>
                    <NavLink exact activeClassName="active" to="/stage/9" className="point">
                        <span className="text">{allDummyStages[8].title}</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default StagesTopBar
