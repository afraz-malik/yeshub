import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
// import { SinglrFeaturedItem } from "../../FeaturedPublication"

import CaseStudiesItems from "./Items/CaseStudiesItems"
import { SearchIcon, yesdigitalIconImage } from "../../../../../Shared/Images/Images"
import { FeedType } from "../../../../../Interface/Home/FeedsInterface"
import { HomeApis } from "../../../../../Helpers/Request/Services/Home/Home"
import SolutionMainContainer from "../SolutionMainContainer"

const CaseStudiesPage: FC = (): ReactElement => {
    const { state }: any = useLocation()
    const [caseStudies, setCaseStudies] = useState<FeedType[]>([])
    const [all, setAll] = useState<FeedType[]>([])
    const [searchText, setSearchText] = useState<string>("")

    useEffect(() => {
        if (state) {
            setCaseStudies(state)
            setAll(state)
        } else {
            HomeApis.getAllCaseStudies.then(response => {
                if (response) {
                    setCaseStudies(response.data.data.docs)
                    setAll(response.data.data.docs)
                }
            })
        }
    }, [state])

    const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearchText(value)
        if (value === "") {
            setCaseStudies(all)
            return
        }

        setCaseStudies(caseStudies.filter((item: FeedType) => item.title.includes(value)))
    }

    return (
        <SolutionMainContainer>
            <div className="mc-border py-2 mt-4 header__card">
                <div className="profile-tabs">
                    <div className="metainfo__community_tab">
                        {searchText && <h2>{`Searching for "${searchText}"`}</h2>}

                        {/* 1 */}

                        <div className="row align-items-center">
                            <div className="col-12">
                                <div className="row py-3">
                                    <div className="col-sm-8">
                                        {/* <p className="text-dark-blue fs-32 fw-700">Featured Stories</p>
                                        <p className="text-dark-blue fs-16">
                                            Explore curated content on Youth Employment and Entrepreneurship from
                                            various organizations and institutions.
                                        </p> */}
                                        <div className="form__input has-icon search__input">
                                            <input
                                                type="text"
                                                name="search__input"
                                                id="search__input"
                                                placeholder="Search Case Story"
                                                onChange={onSearch}
                                            />
                                            <img src={SearchIcon} className="icon" alt="" />
                                        </div>
                                    </div>
                                    {/* <div className="col-sm-4 text-center text-sm-right pt-2">
                                        <div className="sort__by">
                                            <select name="sort-by" id="sort-by">
                                                <option value="trending">Trending</option>
                                                <option value="New">New</option>
                                                <option value="Hot">Hot</option>
                                            </select>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        {/*1  */}
                    </div>
                </div>
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
        </SolutionMainContainer>
    )
}

export default CaseStudiesPage
