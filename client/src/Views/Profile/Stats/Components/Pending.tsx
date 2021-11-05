import React, { FC, useState, useEffect } from "react"
import { ProgressBar } from "../../../../Interface/Profile/Stats"

type PendingAchievements = {
    pending: ProgressBar
}

const PendingAchievements: FC<PendingAchievements> = ({ pending }) => {
    const {
        email = false,
        updateProfile = false,
        joinThreeCommunities = false,
        firstPost = false,
        tenUpvotes = false,
        createBookmarkEvent = false,
    } = pending

    const [completed, setCompleted] = useState("0")

    const calculateProgress = () => {
        let count = 0
        const Obj = Object.entries(pending)
        const total = Obj.length
        Obj.map(item => {
            if (item[1]) {
                return count++
            }
            return 0
        })
        setCompleted(((count / total) * 100).toFixed(1))
    }

    useEffect(() => {
        calculateProgress()
        // eslint-disable-next-line
    }, [pending])

    return (
        <div className="mc-border mt-15">
            <div className="member-pg-wrap px-lg-4 px-2">
                <div className="pg-bar">
                    <div
                        className="pg-line"
                        style={{ width: completed + "%" }}
                    ></div>
                </div>
                <div className="member-pg-container mt-5">
                    <div className="form-group">
                        <label className="checkBox3">
                            Verify your email (20 points)
                            <input
                                type="checkbox"
                                name="verifyEmail"
                                checked={email}
                                disabled
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="checkBox3">
                            Update Profile (20 points)
                            <input
                                type="checkbox"
                                name="verifyEmail"
                                checked={updateProfile}
                                disabled
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="checkBox3">
                            Joins Three Communities (20 points)
                            <input
                                type="checkbox"
                                name="verifyEmail"
                                checked={joinThreeCommunities}
                                disabled
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="checkBox3">
                            First Post (20 points)
                            <input
                                type="checkbox"
                                name="verifyEmail"
                                checked={firstPost}
                                disabled
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="checkBox3">
                            Ten Up Votes (20 points)
                            <input
                                type="checkbox"
                                name="verifyEmail"
                                checked={tenUpvotes}
                                disabled
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="checkBox3">
                            Create Event (20 points)
                            <input
                                type="checkbox"
                                name="verifyEmail"
                                checked={createBookmarkEvent}
                                disabled
                            />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PendingAchievements
