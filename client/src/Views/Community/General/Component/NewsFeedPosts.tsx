import React, { FC, Fragment } from "react"

import PostSkeletons from "../../../../Components/Skeleton/Post"
import NewsFeedEvent from "../../../../Controller/Home/Announcement/NewsFeedEvent"
import PostItem from "../../../../Controller/Home/Posts/PostItem"
import { INewsFeed } from "../../../../Models/User/IEvent"

export interface INewsFeedPosts {
    posts: INewsFeed[]
    topMargin: boolean
    loading: boolean
    awards?: any
}

const NewsFeedPosts: FC<INewsFeedPosts> = ({ posts = [], topMargin = true, loading = false, awards = [] }) => {
    return (
        <div>
            {loading ? (
                <PostSkeletons />
            ) : (
                posts.map((item, idx) => (
                    <Fragment key={item._id}>
                        {item.type && item.type === 2 && item.event ? (
                            <NewsFeedEvent event={item.event} />
                        ) : item.post ? (
                            <PostItem post={item.post} topMargin={topMargin} idx={idx} isUser={true} awards={awards} />
                        ) : null}
                    </Fragment>
                ))
            )}
        </div>
    )
}

export default NewsFeedPosts
