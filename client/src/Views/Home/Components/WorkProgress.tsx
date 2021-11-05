import * as React from "react"
import { WorkProgress as WorkProgressImg } from "../../../Shared/Images/Images"

export interface WorkProgressProps {}

const WorkProgress: React.FC<WorkProgressProps> = () => {
    return (
        <div className="work__progress">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-6">
                        <div className="info">
                            <h1 className="title">
                                YES!HUB is a work in progress.
                            </h1>
                            <p className="description">
                                Please browse through our content and tell us
                                what you need to know, share your stories about
                                project success and learnings, and help make
                                this a vibrant place of knowledge-sharing!
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <img
                            src={WorkProgressImg}
                            alt=""
                            className="img-responsive"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkProgress
