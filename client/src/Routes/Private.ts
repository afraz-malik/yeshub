import RoutesInterface from "../Interface/Routes/RoutesInterface"
import { lazy } from "react"
import ShareToCommunity from "../Views/Crosspost/ShareToCommunity"
import TagPage from "../Views/TagPage"
// import Inbox from "../Views/Inbox"

const Communities = lazy(() => import("../Views/Community/General"))

const CreateEvent = lazy(() => import("../Views/Event/Create"))
const GroupDetails = lazy(() => import("../Views/Groups/Details"))
const CreatePost = lazy(() => import("../Views/Post/Create"))
const MainProfile = lazy(() => import("../Views/Profile/Components"))
const Drafts = lazy(() => import("../Views/Profile/Draft"))
const MyEvents = lazy(() => import("../Views/Profile/Events"))
const AuthEventDetail = lazy(() => import("../Views/Profile/Events/Details/Components"))
const Notifications = lazy(() => import("../Views/Profile/Notifications"))
const SavedFeeds = lazy(() => import("../Views/Profile/Saved"))
const Settings = lazy(() => import("../Views/Profile/Settings"))
const StatsAchievements = lazy(() => import("../Views/Profile/Stats"))
const EditCommunity = lazy(() => import("../Views/Community/Edit"))
const Inbox = lazy(() => import("../Views/Inbox"))
const ModInbox = lazy(() => import("../Views/Modinbox"))
const SubscribedEvents = lazy(() => import("../Views/Event/Subscribed/index"))
const PointSystem = lazy(() => import("../Views/Profile/Points"))

export const Private: Array<RoutesInterface> = [
    {
        path: "/profile/settings",
        exact: true,
        component: Settings,
    },
    {
        path: "/profile/saved",
        exact: false,
        component: SavedFeeds,
    },
    {
        path: "/profile/events/details/:id",
        exact: true,
        component: AuthEventDetail,
    },
    {
        path: "/profile/drafts",
        exact: true,
        component: Drafts,
    },
    {
        path: "/profile/events",
        exact: true,
        component: MyEvents,
    },
    {
        path: "/profile/stats",
        exact: true,
        component: StatsAchievements,
    },
    {
        path: "/profile/points",
        exact: true,
        component: PointSystem,
    },
    {
        path: "/profile/subscribedEvents",
        exact: true,
        component: SubscribedEvents,
    },
    {
        path: "/profile",
        exact: false,
        component: MainProfile,
    },
    {
        path: "/communities",
        exact: false,
        component: Communities,
    },
    {
        path: "/notifications",
        exact: true,
        component: Notifications,
    },
    {
        path: "/crosspost/:type/:id",
        exact: true,
        component: ShareToCommunity,
    },
    {
        path: "/community/details/:id",
        exact: true,
        component: GroupDetails,
    },
    {
        path: "/community/edit",
        exact: true,
        component: EditCommunity,
    },
    {
        path: "/event/create-update",
        exact: true,
        component: CreateEvent,
    },
    {
        path: "/userinbox",
        exact: false,
        component: Inbox,
    },
    {
        path: "/inbox/:id",
        exact: false,
        component: ModInbox,
    },
    {
        path: "/post/create",
        exact: true,
        component: CreatePost,
    },
    {
        path: "/tag/page/:tag",
        exact: true,
        component: TagPage,
    },
]
