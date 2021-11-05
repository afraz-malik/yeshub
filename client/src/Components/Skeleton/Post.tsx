import Skeleton from "react-loading-skeleton"
import React, { FC, ReactElement } from "react"
import { Link } from "react-router-dom"

const PostSkeletons: FC = (): ReactElement => {
    return (
        <>
            {Array(12)
                .fill({})
                .map((item, idx) => (
                    <div
                        className={`post-container ${idx > 0 && "pt-4"}`}
                        key={idx}
                    >
                        <div className="post-wrap">
                            <div className="post-body">
                                <div className="ps-left">
                                    <div className="left-wrapper">
                                        <Link to={"#"}>
                                            <div className="post-header d-flex flex-row justify-content-between">
                                                <div className="post-head-detail d-flex flex-row">
                                                    <div className="profile-image">
                                                        <Skeleton
                                                            circle={true}
                                                            height={40}
                                                            width={40}
                                                        />
                                                    </div>
                                                    <div className="post-detail d-flex flex-row flex-wrap align-items-start align-items-sm-center">
                                                        <div className="post-title  ml-1">
                                                            <Skeleton
                                                                width={200}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="post-time ">
                                                    <div className="post-in">
                                                        <Skeleton width={110} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                        <p className="post-status-text">
                                            <Skeleton />
                                        </p>
                                        <div className="post-mnain-image mb-3">
                                            <Skeleton height={150} />
                                            <Skeleton height={80} />
                                        </div>
                                        <div className="mb-3">
                                            <ul className="event-related-links list-unstyled">
                                                <li>
                                                    <Skeleton width={30} />
                                                    <Skeleton width={60} />
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="post-footer">
                                            <div className="lefts">
                                                <Skeleton
                                                    width={240}
                                                    height={30}
                                                />
                                            </div>
                                            <div className="rights">
                                                <Skeleton
                                                    width={100}
                                                    height={30}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    )
}

export default PostSkeletons
