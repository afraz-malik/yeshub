import React, { FC } from "react"
import { Link } from "react-router-dom"

import { FeedTypeSingle } from "../../../../../../Interface/Home/FeedsInterface"
import ellipsis from "../../../../../../Helpers/Functions/ellipsis"
import assetUrl from "../../../../../../Helpers/Functions/assetUrl"
import { PlaceholderImage } from "../../../../../../Shared/Images/Images"

const CaseStudiesItems: FC<FeedTypeSingle> = ({ feed, col = 4 }) => {
    return (
        <div className={`col-sm-${col} col-md-${col} mb-${col}`}>
            <Link to={{ pathname: `/post/details/${feed._id}`, state: feed }}>
                <div className="card  card__shadow featured__casestudy">
                    <div className="card__img">
                        {!feed.image.length ? (
                            <div className="flex ht-100">
                                <img className="card-img-top" src={PlaceholderImage} />
                            </div>
                        ) : (
                            <img className="card-img-top" src={assetUrl(feed.image[0])} />
                        )}
                    </div>

                    <div className="card-body">
                        <p className="card-text">
                            <span className="text-custom-blue font-weight-bold">{feed.title}</span> |{" "}
                            <span
                                className="text-dark"
                                dangerouslySetInnerHTML={{
                                    __html: ellipsis(feed.description, 140 - feed.title.length),
                                }}
                            ></span>
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CaseStudiesItems
