import * as React from "react"
import FbGridImages from "../../../Components/ImageGallery"
import FeaturedLink from "../../../Components/Post/FeaturedLink"
import PostVideoFrame from "../../../Components/Post/PostVideoFrame"
import PostVote from "./PostVote"
import { Link } from "react-router-dom"

export interface PostBodyProps {
    AppendImages: (items: string[]) => void
    post: any
    onVoteToggled?: any
}

const PostBody: React.FC<PostBodyProps> = ({ AppendImages, post, onVoteToggled }) => {
    return (
        <div className="post__body">
            <div className="main__post">
                <div className="post-mnain-image mb-1">
                    {(post.image || []).length !== 0 && (
                        <div className="App" style={{ margin: "1.3em 0" }}>
                            <FbGridImages width={100} images={AppendImages(post.image)} />
                        </div>
                    )}
                </div>

                {post.link && post.link.length !== 0 ? (
                    <div className="mb-3">
                        <ul className="event-related-links list-unstyled">
                            {post.link.map((item: any) => (
                                <FeaturedLink key={post._id} post={item} />
                            ))}
                        </ul>
                    </div>
                ) : null}

                <div className="post-mnain-image mb-1 mlp-45">
                    <p
                        className="general-text"
                        dangerouslySetInnerHTML={{
                            __html: post.description,
                        }}
                    />
                </div>
                <div className="d-flex flex-row flex-wrap">
                    {post.videoUrl && <PostVideoFrame url={post.videoUrl} />}
                    {post.tags.map((itm: any, index: number) => (
                        <PostTag tag={itm} />
                    ))}
                </div>
                {/* <PostVote
                    onToggled={() => onVoteToggled()}
                    postId={post._id}
                    isLiked={post.isLiked}
                    totalLikes={post.totalVotes || 0}
                    showText={true}
                /> */}
            </div>
        </div>
    )
}

export default PostBody

export const PostTag: React.FC<any> = ({ tag }) => {
    return (
        <span
            style={{
                borderRadius: "59px",
                backgroundColor: "#243C4B",
                fontSize: "16px",
                color: "white",
                padding: "9px 15px 8px 16px",
                marginRight: "13px",
                marginBottom: "1em",
            }}
        >{`#${tag}`}</span>
    )
}
