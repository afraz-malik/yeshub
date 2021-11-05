import React, { FC, Fragment } from "react"

import PostSkeletons from "../../../Components/Skeleton/Post"
import FeedsInterface from "../../../Interface/Home/FeedsInterface"
import PostItem from "./PostItem"
import NewsFeedEvent from "../Announcement/NewsFeedEvent"
 
const PostsItems: FC<FeedsInterface> = ({
    feeds = [],
    topMargin = true,
    isUser = false,
    loading = false,
    awards = [],
    hideAward,
}) => {
    return (
        <>
            {loading ? (
                <PostSkeletons />
            ) : (
                feeds.map((item, idx) => (
                    <Fragment key={item._id}>
                        {item.type && item.type === 2 ? (
                            <NewsFeedEvent event={item} />
                        ) : (
                            <PostItem
                                post={item}
                                topMargin={topMargin}
                                isUser={isUser}
                                idx={idx}
                                awards={awards}
                                hideAward={hideAward}
                            />
                        )}
                    </Fragment>
                ))
            )}
        </>
    )
}

export default PostsItems
