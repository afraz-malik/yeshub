import React, { FC, ReactElement, useState, useEffect } from "react"
import { HomeApis } from "../../../Helpers/Request/Services/Home/Home"

const ContributedToday: FC = (): ReactElement => {
    const [statics, setStatics] = useState({
        status: true,
        caseStudies: 0,
        communities: 0,
        resources: 0,
    })

    useEffect(() => {
        HomeApis.getStatics.then(response => {
            if (response) {
                setStatics({ ...response.data })
            }
        })
    }, [])

    return (
        <section className="py-5">
            <div className="container">
                <div className="section__heading">
                    <h3 className="title"> Contribute Today! </h3>
                </div>

                <div className="row">
                    <div className="col-sm-6 col-md-4 mb-3">
                        <div className="contribution__item">
                            <span className="digit">{statics.communities}</span>

                            <span className="title">Communities</span>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-4 mb-3">
                        <div className="contribution__item">
                            <span className="digit">{statics.caseStudies}</span>

                            <span className="title">Case Stories</span>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-4 mb-3">
                        <div className="contribution__item">
                            <span className="digit">{statics.resources}</span>

                            <span className="title">Resources</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContributedToday
