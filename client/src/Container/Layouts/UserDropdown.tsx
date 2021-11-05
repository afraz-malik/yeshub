import * as React from "react"
import { Link } from "react-router-dom"
import { BellIcon, Menu, Profile, Logout } from "../../Shared/Images/Images"
import { user } from "../../Constants/getUserId"
import isBaseImg from "../../Helpers/Functions/isBaseImg"
import assetUrl from "../../Helpers/Functions/assetUrl"
import UserPosts from "../../Helpers/Request/Services/Profile/GetUserPosts"
import Auth from "../../Routes/Authentication"
import ProfileInterface from "../../Interface/Profile/Profile"
import { isLoggedIn } from "../../Hooks/Auth/getAuth"
import UserSettings from "../../Helpers/Request/Services/Profile/UserSettings"
import { RELOAD_USER_PROFILE_EVENT, NOTIFICATION_RECEIVED_EVENT, MESSAGE_SEEN } from "../../Constants/constants"
import Pusher from "pusher-js"
import EventBus from "../../Helpers/Request/Services/event-bus"
import { InboxMailIcon } from "../../Shared/Icons/index"
import { chat } from "../../Helpers/Request/Services/chat/chat"
import ChatStorage from "../../Helpers/chatstorage"
export interface UserDropDownProps {}

const pusher = new Pusher("ef1b891d5be96d1323d2", {
    cluster: "ap2",
})

const handleUserThreads = () => {
    isLoggedIn &&
        chat.getAllThreads().then(response => {
            ChatStorage.addThreads("user", response.data)
        })
}

handleUserThreads()

const handleThreads = (communityID: string, index: number, length: number, community: any) => {
    // get from server
    // add to storage

    isLoggedIn &&
        chat.getThreadsForMods(communityID).then(res => {
            res.data.data.forEach((th: any) => {
                if (th.isUser) {
                    th.name = th.name + " >> " + community.name
                }
            })
            res.data.archived.forEach((th: any) => {
                if (th.isUser) {
                    th.name = th.name + " >> " + community.name
                }
            })
            ChatStorage.addThreads(communityID, res.data)
            if (index == length) {
                ChatStorage.setLoaded()
            }
        })
}

const UserDropDown: React.SFC<UserDropDownProps> = () => {
    const [hasNotification, setHasNotification] = React.useState(false)
    const [hasMessages, setHasMessages] = React.useState(false)
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)
    const [username, setUser] = React.useState<ProfileInterface>(user)

    const loadUserProfile = () => {
        isLoggedIn &&
            UserSettings.fetchAll().then(response => {
                setUser(response.data.data)
            })
    }

    React.useEffect(() => {
        loadUserProfile()

        document.addEventListener(RELOAD_USER_PROFILE_EVENT, loadUserProfile)

        return () => document.removeEventListener(RELOAD_USER_PROFILE_EVENT, loadUserProfile)
    }, [])

    const toggleNotification = () => {
        setHasNotification(true)
    }

    React.useEffect(() => {
        document.addEventListener(NOTIFICATION_RECEIVED_EVENT, toggleNotification)
        document.addEventListener(MESSAGE_SEEN, () => setHasMessages(false))
        return () => {
            document.removeEventListener(NOTIFICATION_RECEIVED_EVENT, toggleNotification)
            document.removeEventListener(MESSAGE_SEEN, () => setHasMessages(false))
        }
    }, [])

    React.useEffect(() => {
        EventBus.on("msg-seen", () => {
            setHasMessages(false)
        })
        isLoggedIn &&
            UserPosts.getModCommunities().then(res => {
                let communities = res.data.data

                let tempCounter = 0
                ChatStorage.setLoading()
                communities.forEach((com: any) => {
                    tempCounter++
                    handleThreads(com._id, tempCounter, communities.length, com)
                    pusher.subscribe("messages").bind(`msg-mod-${com._id}`, (data: any) => {
                        setHasMessages(true)
                        if (username._id != data.from._id) {
                            EventBus.dispatch(`com-message-${com._id}`, { detail: data })
                            EventBus.dispatch(`com-message`, { detail: data })
                        }
                    })

                    pusher.subscribe("messages").bind(`mods-in-com-${com._id}`, (data: any) => {
                        setHasMessages(true)
                        if (username._id != data.from._id) {
                            EventBus.dispatch(`com-message-${com._id}`, { detail: data })
                            EventBus.dispatch(`com-message`, { detail: data })
                        }
                    })
                })
            })

        isLoggedIn &&
            UserSettings.fetchAll().then(response => {
                pusher.subscribe("messages").bind(`message-${response.data.data._id}`, (data: any) => {
                    if (username._id != data.from._id) {
                        EventBus.dispatch(`message-${response.data.data._id}`, { detail: data })
                        setHasMessages(true)
                    }
                })

                pusher.subscribe("messages").bind(`msg-com-${response.data.data._id}`, (data: any) => {
                    if (username._id != data.from._id) {
                        EventBus.dispatch(`message-${response.data.data._id}`, { detail: data })
                        setHasMessages(true)
                    }
                })

                pusher.subscribe("notification").bind(`my-event${response.data.data._id}`, (data: any) => {
                    console.log("notification arrived ", data)
                    setHasNotification(true)
                })

                pusher.subscribe("notification").bind(`my-event${response.data.data._id}`, (data: any) => {
                    console.log("notification arrived ", data)
                    setHasNotification(true)
                })
            })

        return () => {
            pusher.unsubscribe("notification")
            pusher.unsubscribe("messages")
        }
    }, [])

    const onOpen = () => {
        setIsMenuOpen(state => !state)
    }

    return (
        <div className="header-user-dropdown position-relative">
            <div className="d-flex justify-lg-content-end mt-lg-0 mt-2">
                {/* <div className="header-user-notification mr-3 pt-2">
                    <Link
                        onClick={() => setHasNotification(false)}
                        className={hasMessages ? "hasNotifications" : ""}
                        to="/userinbox"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon" width="22" height="20.483" viewBox="0 0 22 20.483">

                            <g transform="translate(0 0)">
                                <g transform="translate(0 0)">
                                    <path fill="#2d4453" d="M9.828,10a2.255,2.255,0,0,0-1.328.429.316.316,0,0,1,.08.061l7.571,7.571.459.459a1.138,1.138,0,0,0,1.608,0l.459-.459,7.571-7.571a.316.316,0,0,1,.08-.061A2.255,2.255,0,0,0,25,10Z" transform="translate(-5.276 -6.207)"/>
                                    <path fill="#2d4453" d="M6.489,12.58a.316.316,0,0,1-.061-.08A2.255,2.255,0,0,0,6,13.828V25.966a2.22,2.22,0,0,0,.421,1.312.361.361,0,0,1,.057-.076l7.313-7.321Z" transform="translate(-3.724 -7.759)"/>
                                    <path fill="#2d4453" d="M18.915,33.38l-.19.19a1.9,1.9,0,0,1-2.686,0l-.19-.19L8.533,40.7a.247.247,0,0,1-.083.061A2.238,2.238,0,0,0,9.8,41.2H24.969a2.238,2.238,0,0,0,1.347-.444.247.247,0,0,1-.083-.061Z" transform="translate(-5.245 -20.719)"/>
                                    <path d="M44.762,12.58l-7.3,7.3L44.773,27.2a.361.361,0,0,1,.057.076,2.22,2.22,0,0,0,.421-1.312V13.828a2.255,2.255,0,0,0-.429-1.328A.316.316,0,0,1,44.762,12.58Z" transform="translate(-23.251 -7.759)"/>
                                    <path fill="#2d4453" d="M2.955,5.045.489,2.58A.316.316,0,0,1,.429,2.5,2.255,2.255,0,0,0,0,3.828V15.966a2.223,2.223,0,0,0,.417,1.309A.361.361,0,0,1,.474,17.2l1.043-1.043V7.621A3.025,3.025,0,0,1,2.955,5.045Z" transform="translate(0 -1.552)"/>
                                    <path fill="#2d4453" d="M2.45,41.905a2.132,2.132,0,0,0,.588.311V41.34l-.5.5A.426.426,0,0,1,2.45,41.905Z" transform="translate(-1.521 -25.659)"/>
                                    <path fill="#2d4453" d="M3.828,0A2.255,2.255,0,0,0,2.5.429a.316.316,0,0,1,.08.061L5.25,3.16A2.886,2.886,0,0,1,6.1,3.034H17.7L20.248.489a.316.316,0,0,1,.08-.061A2.255,2.255,0,0,0,19,0Z" transform="translate(-1.552 0)"/>
                                    <path fill="#2d4453" d="M47.427,2.58,45.42,4.586h2.5V3.828A2.255,2.255,0,0,0,47.487,2.5.316.316,0,0,1,47.427,2.58Z" transform="translate(-28.192 -1.552)"/>
                                </g>
                            </g>
                        </svg>
                    </Link>
                </div> */}
                <div className="header-user-notification mr-3 pt-2">
                    <Link
                        onClick={() => setHasNotification(false)}
                        className={hasNotification ? "hasNotifications" : ""}
                        to="/notifications"
                    >
                        <img src={BellIcon} alt="Notification Bell" />
                    </Link>
                </div>
                <div className="header-user-detail mr-3">
                    <div className="header-user-name">{username.userName}</div>
                    <div className="header-user-points">cookie points: {user?.points?.toFixed()}</div>
                </div>
                <div className="header-user-profile" onClick={onOpen}>
                    <button id="user_dropdown" className="user-dropdown">
                        <span className="user_profile">
                            <img
                                src={isBaseImg(username.userImage) ? username.userImage : assetUrl(username.userImage)}
                                alt={"User"}
                                className="user__profile"
                            />
                        </span>
                        <span className="menu_image">
                            <img src={Menu} alt={"Menu"} />
                        </span>
                    </button>
                </div>
            </div>
            <div className={`user-dropdown-list ${isMenuOpen ? "active" : null}`} id="userdropdownlist">
                <ul className="list-unstyled mb-0">
                    <li>
                        <Link to={"/profile"}>
                            <div className="d-flex user-list-wrap">
                                <span className="icon">
                                    <img src={Profile} alt={"Profile"} />
                                </span>
                                <span className="text">Profile</span>
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => Auth.signout()}>
                        <Link to="#">
                            <div className="d-flex user-list-wrap">
                                <span className="icon">
                                    <img src={Logout} alt={"Logout"} />
                                </span>
                                <span className="text">Logout</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserDropDown
