import React, { ReactElement, useEffect, useState } from "react"
import SolutionSidebar from "../../Components/SolutionSidebar"
import { BellIcon } from "../../Controller/Home/Posts/PostHeader"
import PostItem from "../../Controller/Home/Posts/PostItem"
import MainContent from "../../Controller/Main/Content"
import NewsFeed from "../../Helpers/Request/Services/Communities/NewsFeed"
import tagApi from "../../Helpers/Request/Services/Tags"
import NewsFeedPosts from "../Community/General/Component/NewsFeedPosts"

const TagPage: React.FC<any> = ({ match, location }) => {
    const [docs, setdocs] = useState([])
    const [loading, setloading] = useState(true)
    const [isFollowing, setisFollowing] = useState(false)
    useEffect(() => {
        tagApi
            .getPostsByTag(match.params.tag)
            .then(res => {
                console.log(res.data)
                setdocs(res.data.data.docs)
                setisFollowing(res.data.isFollowed)
                setloading(false)
            })
            .catch(err => setloading(false))
    }, [])

    const followTag = (_tag: string) => {
        tagApi
            .follow(_tag)
            .then((res: any) => {
                setisFollowing(res.data.isFollowed)
            })
            .catch(err => console.log(err))
    }

    return (
        <MainContent>
            {/* <div className="col-4">
                    <SolutionSidebar />
                </div> */}
            <div className="">
                <TagPageCard
                    title={match.params.tag}
                    isFollowed={isFollowing}
                    onFollow={(e: any) => followTag(match.params.tag)}
                    followedBy={23}
                />
                {docs.map((itm: any, index: any) => (
                    <NewsFeedPosts posts={docs} topMargin={false} loading={loading} awards={[]} />
                ))}
            </div>
        </MainContent>
    )
}

export default TagPage

export const TagPageCard: React.FC<any> = ({ title, followedBy = 0, onFollow, isFollowed = false }) => {
    return (
        <div
            className="mc-border mb-4"
            style={{ paddingBottom: "28px", paddingTop: "30px", paddingLeft: "37px", paddingRight: "36px" }}
        >
            <h1 style={{ fontSize: "64px", color: "#243C4B", fontWeight: 700, marginBottom: "12px" }}>#{title}</h1>
            <p style={{ marginBottom: "16px" }}>{followedBy} People follow this</p>
            <p style={{ marginBottom: "25px" }}>Short Description to indicate what this section is about for.</p>

            <button onClick={() => onFollow(title)} className="btn btn-yellow">
                {!isFollowed ? BellIcon : ""} {isFollowed ? "Following" : `Follow`}
            </button>
        </div>
    )
}
