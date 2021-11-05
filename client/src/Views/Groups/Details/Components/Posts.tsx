import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import CommunitiesList from "../../../../Helpers/Request/Services/Communities/Communities"
import NewsFeedPosts from "../../../Community/General/Component/NewsFeedPosts"
import { INewsFeed } from "../../../../Models/User/IEvent"
import { DELETE_POST_EVENT, DELETE_EVENT_EVENT, POST_PIN_EVENT } from "../../../../Constants/constants"
import useInfiniteScroll from "../../../../Hooks/useInfiniteScroll"
import axiosService from "../../../../Helpers/Request/axiosService"

const GroupPosts: React.FC<any> = ({ pageNo, sorting }) => {
    const { id } = useParams()
    const { page } = useInfiniteScroll(pageNo)
    const [posts, setPosts] = useState<INewsFeed[]>([])
    const [loading, setLoading] = useState(true)
    const [awards, setAwards] = useState([])
    const [_sorting, setsort] = useState(sorting)

    useEffect(() => {
        if (_sorting !== sorting) {
            setPosts([])
            setsort(sorting)
        }
        CommunitiesList.getCommunityPostsById(id, page, sorting).then(response => {
            setLoading(false)
            setPosts(prevPosts => [...prevPosts, ...response.data.data.docs])
        })
    }, [id, page, sorting])

    const deletePost = (event: any) => {
        const filteredPosts = posts.filter(post => post.post?._id !== event.detail.id)
        setPosts(filteredPosts)
    }

    const deleteEvent = (event: any) => {
        const filteredPosts = posts.filter(post => post.event?._id !== event.detail.id)
        setPosts(filteredPosts)
    }

    const pinPostToggled = (event: any) => {
        let pIndex = -1
        const ps = posts.map((item, index): INewsFeed => {
            if (item.post && item.post?._id === event.detail.id) {
                pIndex = index
                return { ...item, post: { ...item.post, isPined: event.detail.pinned } }
            }

            if (item.post?.isPined) {
                return { ...item, post: { ...item.post, isPined: false } }
            }

            return item
        })

        let pp: INewsFeed[] = []
        if (pIndex !== -1) {
            pp = ps.splice(pIndex, 1)
        }

        setPosts([...pp, ...ps])
    }

    useEffect(() => {
        document.addEventListener(POST_PIN_EVENT, pinPostToggled)
        return () => document.addEventListener(POST_PIN_EVENT, pinPostToggled)
    }, [pinPostToggled])

    useEffect(() => {
        document.addEventListener(DELETE_POST_EVENT, deletePost)
        return () => document.addEventListener(DELETE_POST_EVENT, deletePost)
    }, [deletePost, posts])

    useEffect(() => {
        document.addEventListener(DELETE_EVENT_EVENT, deleteEvent)
        return () => document.addEventListener(DELETE_EVENT_EVENT, deleteEvent)
    }, [deletePost, posts])

    useEffect(() => {
        axiosService.get("/award/list").then(resp => {
            setAwards(resp.data.data)
        })
    }, [])

    return <NewsFeedPosts posts={posts} loading={loading} topMargin={false} awards={awards} />
}

export default GroupPosts
