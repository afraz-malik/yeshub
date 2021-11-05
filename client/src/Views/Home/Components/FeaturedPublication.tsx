import React, { FC, ReactElement, useEffect, useState } from "react"

import { FeaturePost, FeaturePostSingle } from "../../../Interface/Landing/FeaturedPostInterface"
import { HomeApis } from "../../../Helpers/Request/Services/Home/Home"
import Slider from "../../../Shared/Slider"
import ellipsis from "../../../Helpers/Functions/ellipsis"
import assetUrl from "../../../Helpers/Functions/assetUrl"
import { Link } from "react-router-dom"

export const FeaturedPublication: FC = (): ReactElement => {
    const [featuredPosts, setFeaturedPosts] = useState<FeaturePost[]>([])

    useEffect(() => {
        HomeApis.getAllFeaturedPosts.then(response => {
            if (response) {
                setFeaturedPosts(response.data.data.slice(0, 6))
            }
        })
    }, [])
    return (
        <section className="pb-5">
            <div className="container">
                <div className="section__heading">
                    <h3 className="title">Featured</h3>
                    <div className="description">
                        Explore curated content on Youth Employment and
                        <br />
                        Entrepreneurship from various organizations and institutions.
                    </div>
                </div>

                <div className="row mt-4 featured__publication">
                    <div className="col-12">
                        <Slider>
                            {featuredPosts.map((item, idx) => (
                                <FeaturedPublicationItem publication={item} key={idx} />
                            ))}
                        </Slider>
                    </div>
                </div>

                <div className="row py-5">
                    <div className="col-12 text-center">
                        {/* <button className="btn btn-warning text-uppercase mt-3 px-5">
                            See All Featured
                        </button> */}
                        <a
                            // to={{
                            //     pathname: "/featuredposts/all",
                            // }}
                            href="/featuredposts/all"
                            className="btn btn-warning text-uppercase mt-3 px-5"
                        >
                            See All Featured
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export const FeaturedPublicationItem: FC<FeaturePostSingle> = ({ publication }): ReactElement => (
    <div className="">
        <a href={publication.redirectUrl} target="_blank" rel="noopener noreferrer">
            <div className="card card__shadow">
                <div className="card__img position-relative">
                    <img className="card-img-top" src={assetUrl(publication.displayImage.original)} alt="blur" />
                </div>
                <div className="card-body">
                    <p className="card-text">
                        <span className="text-custom-blue font-weight-bold">{publication.title}</span>|
                        <span className="text-dark">
                            {ellipsis(publication.description || "", 250 - publication.title.length)}
                        </span>
                    </p>
                </div>
            </div>
        </a>
    </div>
)

export const SinglrFeaturedItem: FC<FeaturePostSingle> = ({ publication }): ReactElement => (
    <div className="">
        <a href={publication.redirectUrl} target="_blank" rel="noopener noreferrer">
            <div className="card card__shadow">
                <div className="card__img">
                    <img className="card-img-top" src={assetUrl(publication.displayImage.original)} alt="blur" />
                </div>
                <div className="card-body">
                    <p className="card__title">{publication.title}</p>
                    <p className="card__desc">
                        {ellipsis(publication.description || "", 120 - publication.title.length)}
                    </p>
                </div>
            </div>
        </a>
    </div>
)

export default FeaturedPublication
