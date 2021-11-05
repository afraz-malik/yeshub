import React, { FC, useEffect, useState } from "react"

import NewsFeed from "../../../../Helpers/Request/Services/Communities/NewsFeed"
import useInfiniteScroll from "../../../../Hooks/useInfiniteScroll"
import { INewsFeed } from "../../../../Models/User/IEvent"
import NewsFeedPosts from "./NewsFeedPosts"
import { DELETE_POST_EVENT, DELETE_EVENT_EVENT } from "../../../../Constants/constants"
import axiosService from "../../../../Helpers/Request/axiosService"

const GeneralCommunities: FC = () => {
    const [posts, setPosts] = useState<INewsFeed[]>([])
    const { page } = useInfiniteScroll()
    const [loading, setLoading] = useState(true)
    const [awards, setAwards] = React.useState([])

    useEffect(() => {
        axiosService.get("/award/list").then(resp => {
            console.log(resp)
            setAwards(resp.data.data)
        })
    }, [])

    useEffect(() => {
        NewsFeed.fetch(page).then(response => {
            if (response) {
                setLoading(false)
                setPosts([...posts, ...response.data.data.docs])
            }
        })
        // eslint-disable-next-line
    }, [page])

    const deletePost = (event: any) => {
        const filteredPosts = posts.filter(post => post.post?._id !== event.detail.id)
        setPosts(filteredPosts)
    }

    const deleteEvent = (event: any) => {
        const filteredPosts = posts.filter(post => post.event?._id !== event.detail.id)
        setPosts(filteredPosts)
    }
 
    useEffect(() => {
        document.addEventListener(DELETE_POST_EVENT, deletePost)
        return () => document.addEventListener(DELETE_POST_EVENT, deletePost)
    }, [deletePost, posts])

    useEffect(() => {
        document.addEventListener(DELETE_EVENT_EVENT, deleteEvent)
        return () => document.addEventListener(DELETE_EVENT_EVENT, deleteEvent)
        // eslint-disable-next-line
    }, [deletePost, posts])

    return <NewsFeedPosts posts={posts} topMargin={false} loading={loading} awards={awards} />
}

export default GeneralCommunities
