import React, { useEffect, useState } from "react"

import PostsItems from "../../../Controller/Home/Posts/Items"
import getUserPosts from "../../../Helpers/Request/Services/Profile/GetUserPosts"

const MyPosts = ({ posts, awards }: any) => {
    const [feeds, setFeeds] = useState([])

    useEffect(() => {
        setFeeds(posts)
    }, [posts])

    return <PostsItems feeds={feeds} showDelete isUser showReportFlag={false} hideAward={true} awards={[]} />
}
export default MyPosts
