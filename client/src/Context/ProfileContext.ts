import { createContext } from "react"

let details: any = []

const ProfileContext = createContext({
    data: details
})

export { ProfileContext }

export default ProfileContext
