import React, { FC, ReactElement, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import CaseStudiesItems from "./Elements/CaseStudies/Items/CaseStudiesItems"
import { FeedType } from "../../../Interface/Home/FeedsInterface"
import { HomeApis } from "../../../Helpers/Request/Services/Home/Home"

const CaseStudies: FC = (): ReactElement => {
    const [caseStudies, setCaseStudies] = useState<FeedType[]>([])
    const [featured, setFeatured] = useState<FeedType[]>([])

    useEffect(() => {
        HomeApis.getAllCaseStudies.then(response => {
            if (response) {
                setCaseStudies(response.data.data.docs)
            }
        })
        HomeApis.getFeatured.then(response => {
            if (response) {
                setFeatured(response.data.data)
            }
        })
    }, [])

    return (
        <section className="pb-5 bg-white">
            <div className="container">
                <div className="section__heading">
                    <h3 className="title">Case Studies</h3>
                    <div className="description">
                        Gain inspiration and insight on projects and initiatives from around the world.
                    </div>
                </div>

                <div className="row">
                    {featured.map((item, idx) => (
                        <CaseStudiesItems feed={item} key={idx} />
                    ))}
                </div>

                <div className="row py-5">
                    <div className="col-12 text-center">
                        <Link
                            to={{
                                pathname: "/caseStudies/all",
                                state: caseStudies,
                            }}
                            className="btn btn-warning text-uppercase mt-3 px-5"
                        >
                            See All Case Studies
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CaseStudies
