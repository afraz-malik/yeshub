import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

// import CaseStudiesItems from "./Items/CaseStudiesItems"
import { SinglrFeaturedItem } from "../../FeaturedPublication"
import { SearchIcon } from "../../../../../Shared/Images/Images"
import { FeedType } from "../../../../../Interface/Home/FeedsInterface"
import { HomeApis } from "../../../../../Helpers/Request/Services/Home/Home"
import { FeaturePost } from "../../../../../Interface/Landing/FeaturedPostInterface"
import SolutionMainContainer from "../SolutionMainContainer"

const FeaturedPostPage: FC = (): ReactElement => {
    const { state }: any = useLocation()
    const [caseStudies, setCaseStudies] = useState<FeedType[]>([])
    const [all, setAll] = useState<FeedType[]>([])
    const [searchText, setSearchText] = useState<string>("")

    const [featuredPosts, setFeaturedPosts] = useState<FeaturePost[]>([])

    useEffect(() => {
        HomeApis.getAllFeaturedPosts.then(response => {
            if (response) {
                setFeaturedPosts(response.data.data)
            }
        })
    }, [])

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
                                <div className="row py-3 ">
                                    <div className="col-sm-8">
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
                                    {/* <div className="col-sm-4 text-center text-sm-center pt-2">
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

            {/* head */}

            <div className="row mt-5">
                {featuredPosts.length === 0 ? (
                    <h3 className={"text-center"}>No Case Study Found</h3>
                ) : (
                    featuredPosts.map((item, idx) => (
                        <div className="col-md-6 col-sm-6">
                            <SinglrFeaturedItem publication={item} />
                        </div>
                    ))
                )}
            </div>
        </SolutionMainContainer>
    )
}

export default FeaturedPostPage
