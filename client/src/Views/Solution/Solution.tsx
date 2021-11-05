import React, { useState, useEffect } from "react"
import { SearchIcon, yesdigitalIconImage } from "../../Shared/Images/Images"
import SolutionMainContainer from "../Home/Components/Elements/SolutionMainContainer"
import { HomeApis } from "../../Helpers/Request/Services/Home/Home"
import CaseStudiesItems from "../Home/Components/Elements/CaseStudies/Items/CaseStudiesItems"
import { FeaturedPublicationItem } from "../Home/Components/FeaturedPublication"
import YouthEmploymentV2 from "../Home/Components/YouthEmployment_v2"
import { Link } from "react-router-dom"

const SolutionPage: React.FC<any> = ({}) => {
    const [caseStudies, setcaseStudies] = useState([])
    const [featuredStories, setfeaturedStories] = useState([])

    useEffect(() => {
        HomeApis.getAllCaseStudies.then(res => {
            console.log("case", res)
            setcaseStudies(res.data.data.docs.slice(0, 2))
        })

        HomeApis.getAllFeaturedPosts.then(res => {
            console.log("featured", res)
            setfeaturedStories(res.data.data.slice(0, 2))
        })
    }, [])

    return (
        <SolutionMainContainer>
            {false && (
                <div className="mc-border py-2 mt-4 header__card">
                    <div className="profile-tabs">
                        <div className="metainfo__community_tab">
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <p className="text-dark-blue fs-32 fw-700">Solutions</p>
                                    <p className="text-dark-blue fs-16">
                                        Explore curated content on Youth Employment and Entrepreneurship from various
                                        organizations and institutions.
                                    </p>
                                    <div className="d-flex flex-row justify-space-between">
                                        <Link
                                            to={{ pathname: "/featuredposts/all" }}
                                            className="btn btn-yellow flex-1"
                                            style={{ marginRight: "1em" }}
                                        >
                                            {/* <button className="btn btn-yellow flex-1" > */}
                                            View Featured Stories
                                            {/* </button> */}
                                        </Link>
                                        <Link to={{ pathname: "/casestudies/all" }} className="btn btn-yellow flex-1">
                                            {" "}
                                            View Case Stories
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/*1  */}
                        </div>
                    </div>
                </div>
            )}
            <YouthEmploymentV2 bgWhite={true} />
            <div className="mc-border py-2 mt-4 header__card">
                <div className="profile-tabs">
                    <div className="metainfo__community_tab">
                        <div className="row align-items-center">
                            <div className="col-12">
                                <img className="image" style={{ marginBottom: "1em" }} src={yesdigitalIconImage} />
                                <p className="text-dark-blue fs-16">
                                    For your youth employment and entrepreneurship projects This suite of digital tools
                                    will help you scale, continuously improve, and capture the impact of your work in a
                                    cost-effective manner.
                                </p>
                                <div className="d-flex flex-1">
                                    <Link
                                        to={{ pathname: "/products/5ec652b35bd3087a74a6c8d2" }}
                                        className="btn btn-yellow btn-block"
                                    >
                                        View All Products
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/*1  */}
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                {featuredStories.length === 0 ? (
                    <h3 className={"text-center"}>No Featured Story Found</h3>
                ) : (
                    featuredStories.map((item, idx) => (
                        <div className="col-6 col-sm-6 col-md-6">
                            <FeaturedPublicationItem publication={item} key={idx} />
                        </div>
                    ))
                )}
            </div>

            <div className="row mt-5">
                {caseStudies.length === 0 ? (
                    <h3 className={"text-center"}>No Case Study Found</h3>
                ) : (
                    caseStudies.map((item, idx) => {
                        return <CaseStudiesItems feed={item} key={idx} col={6} />
                    })
                )}
            </div>

            {/* h */}
        </SolutionMainContainer>
    )
}

export default SolutionPage
