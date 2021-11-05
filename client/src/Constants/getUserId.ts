import { STORAGE_USER_PROFILE, USER_PROFILE_CHANGED } from "./constants"
import ProfileInterface from "../Interface/Profile/Profile"

let user: ProfileInterface = JSON.parse(localStorage.getItem(STORAGE_USER_PROFILE) || "{}")
let userId = user._id
let role = localStorage.getItem("role")

document.addEventListener(USER_PROFILE_CHANGED, () => {
    user = JSON.parse(localStorage.getItem(STORAGE_USER_PROFILE) || "{}")
    userId = user._id
    role = localStorage.getItem("role")
})

export { user, userId, role }
