import { lazy } from "react"
import RoutesInterface from "../Interface/Routes/RoutesInterface"
import MainProfile from "../Views/Profile/Components"
import SolutionPage from "../Views/Solution/Solution"

const CaseStudiesPage = lazy(() => import("../Views/Home/Components/Elements/CaseStudies/CaseStudiesPage"))
const FeaturedPostPage = lazy(() => import("../Views/Home/Components/Elements/featuredAll"))
const FAQPage = lazy(() => import("../Views/Home/Components/Elements/FAQs/FAQPage"))
const ProductPage = lazy(() => import("../Views/Home/Components/Elements/Product/ProductPage"))
const StagePage = lazy(() => import("../Views/Home/Components/Elements/Stage/StagePage"))
const Home = lazy(() => import("../Views/Home/Home"))
const EventsCalender = lazy(() => import("../Views/Calender"))
const EventDetail = lazy(() => import("../Views/Event/Details"))
const Groups = lazy(() => import("../Views/Groups/List"))
const VerifyEmail = lazy(() => import("../Views/Verifyy"))
const PostDetails = lazy(() => import("../Views/Post/Details"))
const ResetPassword = lazy(() => import("../Views/ResetPassword"))
const StageTool = lazy(() => import("../Views/Home/Components/Elements/Stage/StageTools"))

export const Public: Array<RoutesInterface> = [
    {
        path: "/public/profile/:ID",
        exact: true,
        component: MainProfile,
    },
    {
        path: "/reset/:email/:hash",
        exact: true,
        component: ResetPassword,
    },
    {
        path: "/home",
        exact: true,
        component: Home,
    },
    {
        path: "/communities/list",
        exact: true,
        component: Groups,
    },
    {
        path: "/post/details/:id",
        exact: true,
        component: PostDetails,
    },
    {
        path: "/event/details/:id",
        exact: true,
        component: EventDetail,
    },
    {
        path: "/events/calendar",
        exact: false,
        component: EventsCalender,
    },
    {
        path: "/email/verify/:email/:hash",
        exact: false,
        component: VerifyEmail,
    },
    {
        path: "/caseStudies/all",
        exact: false,
        component: CaseStudiesPage,
    },
    {
        path: "/solution",
        exact: false,
        component: SolutionPage,
    },
    {
        path: "/featuredposts/all",
        exact: false,
        component: FeaturedPostPage,
    },
    {
        path: "/faqs",
        exact: false,
        component: FAQPage,
    },
    {
        path: "/products/:id",
        exact: false,
        component: ProductPage,
    },
    {
        path: "/stage/:id",
        exact: false,
        component: StagePage,
    },
    {
        path: "/tools",
        exact: true,
        component: StageTool,
    },
]
