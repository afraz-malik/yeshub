import * as React from "react"
import Post from "../../Helpers/Request/Services/Post/Post"

export interface CommentBtnProps {
    isLiked: boolean
    totalLikes: number
    postId: string
    showText?: boolean
    onToggled?: any
}

const VoteBtn: React.FC<CommentBtnProps> = ({ isLiked, totalLikes = 0, postId, showText = false, onToggled }) => {
    const [isVoted, toggleVote] = React.useState(isLiked)
    const [totalVotes, setTotalVotes] = React.useState(totalLikes)

    const onToggle = () => {
        Post.upVote(postId).then(() => {
            if (isVoted) {
                setTotalVotes(totalVotes - 1)
            } else {
                setTotalVotes(totalVotes + 1)
            }
            toggleVote(!isVoted)
            onToggled()
        })
    }

    return (
        <div className=" pointer d-flex flex-row">
            <div className="vote__btn d-flex flex-row">
                <span className="total__votes">{totalVotes}</span>
                <span style={{ marginLeft: ".48em" }}>
                    <svg viewBox="0 0 40 58" className="post__icon" onClick={onToggle}>
                        <path
                            d="M23.75 0C23.75 0 25.6 7.20581 25.6 13.052C25.6 18.6535 22.225 23.1946 17.075 23.1946C11.9 23.1946 8 18.6535 8 13.052L8.075 12.0731C3.025 18.5992 0 27.0558 0 36.2466C0 48.2654 8.95 58 20 58C31.05 58 40 48.2654 40 36.2466C40 21.5902 33.525 8.51102 23.75 0ZM19.275 49.8425C14.825 49.8425 11.225 46.0356 11.225 41.3043C11.225 36.8992 13.85 33.7993 18.25 32.8204C22.675 31.8415 27.25 29.5302 29.8 25.805C30.775 29.3127 31.275 33.0108 31.275 36.7904C31.275 43.9963 25.9 49.8425 19.275 49.8425Z"
                            fill="#243C4B"
                            fillOpacity={isVoted ? 1 : 0.4}
                        />
                    </svg>
                </span>
            </div>
            {showText && (
                <span style={{ marginLeft: "1px" }} className="text mt-auto mb-auto fs-16 text-dark-blue">
                    {isVoted
                        ? `You found this helpful ${JSON.stringify(isVoted)}`
                        : `Is this helpful? ${JSON.stringify(isVoted)}`}
                </span>
            )}
        </div>
    )
}

export default VoteBtn
