import React, { useEffect, useState } from "react"

import Profile from ".."
import getUserPosts from "../../../Helpers/Request/Services/Profile/GetUserPosts"
import ProfileMain from "./ProfileMain"

const MainProfile: React.FC<any> = ({ location, match }) => {
    const [posts, setPosts] = useState<any[]>([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        if (match.params.ID) {
            getUserPosts
                .fetchPublic(match.params.ID)
                .then((response: any) => {
                    setPosts([...response.data.data.docs])
                    setloading(false)
                })
                .catch(err => setloading(false))
        } else {
            getUserPosts
                .fetch()
                .then(response => {
                    setPosts([...response.data.data.docs])
                    setloading(false)
                })
                .catch(err => setloading(false))
        }
    }, [])

    return <Profile>{!loading && <ProfileMain _posts={posts} ID={match?.params?.ID} />}</Profile>
}

export default MainProfile
