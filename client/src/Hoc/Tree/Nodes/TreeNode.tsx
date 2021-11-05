import React from "react"
import { BackArrow } from "../../../Shared/Images/Images"
import relativeDate from "../../../Helpers/Date/relativeDate"
import AwardBtn from "../../../Shared/HelperBtn/AwardBtn"
import SharedBtn from "../../../Shared/HelperBtn/SharedBtn"
import ReportBtn from "../../../Shared/HelperBtn/ReportBtn"
import SavePost from "../../../Shared/HelperBtn/SavePost"
import HideBtn from "../../../Shared/HelperBtn/HideBtn"
import { Link } from "react-router-dom"

const TreeNode = (props: any) => {
    const { node, getChildNodes, level } = props

    return (
        <>
            <div className={"main-data message-container pt-3"} key={level}>
                <div className="post-wrap">
                    <div className="post-body">
                        <div className="ps-left">
                            <div className="left-wrapper">
                                <div className="post-header d-flex justify-content-between">
                                    <div className="post-head-detail d-flex">
                                        <Link to={`/profile/${node.userId._id}`}>
                                            <div className="post-detail d-flex">
                                                <div className="post-in">Reply by :</div>
                                                <div className="post-in  ml-1"> {node.userId?.userName}</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="post-time ">
                                        <div className="post-in">{relativeDate(node.createdAt)}</div>
                                    </div>
                                </div>
                                <p className="general-text">{node.body}</p>
                                <div className="post-footer">
                                    <div className="lefts">
                                        <div className="post-reply">
                                            <span>
                                                <span className="icon">
                                                    <img src={BackArrow} alt="back" />
                                                </span>
                                                <span className="text">Reply</span>
                                            </span>
                                        </div>
                                        <SavePost type="post" isSaved={false} id={""} />
                                        <SharedBtn type="post" item={node} />
                                    </div>
                                    <div className="rights">
                                        <HideBtn id={node._id} />
                                        <ReportBtn id={node._id} type="post" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-right">
                            <div className="voteBox">
                                <div className="top">
                                    <button className="btn btn-vote">
                                        <i className={`fa fa-arrow-up `} />
                                    </button>
                                    <span className="d-block my-2">{12}</span>
                                    <button className="btn btn-vote">
                                        <i className={`fa fa-arrow-down`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {getChildNodes(node).map((childNode: any) => (
                <TreeNode {...props} node={childNode} level={level + 1} />
            ))}
        </>
    )
}

export default TreeNode
