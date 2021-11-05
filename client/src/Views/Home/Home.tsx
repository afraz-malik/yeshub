import React from "react"

import CaseStudies from "./Components/CaseStudies"
import ContributedToday from "./Components/ContributedToday"
import FeaturedPublication from "./Components/FeaturedPublication"
import HomeHeader from "./Components/HomeHeader"
import OurProduct from "./Components/OurProduct"
import YouthEmployment from "./Components/YouthEmployment"
import Footer from "../../Shared/Footer"
import AboutSlider from "./Components/AboutSlider"
import WorkProgress from "./Components/WorkProgress"
import CovidBanner from "./Components/CovidBanner"
import YouthEmploymentV2 from "./Components/YouthEmployment_v2"
import HomeHeaderV2 from "./Components/HomeHeaderV2"

const Home = () => {
    // React.useEffect(() => {
    //     const script = document.createElement("script")
    //     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    //     script.async = true
    //     document.body.appendChild(script)
    // }, [])
    return (
        <>
            <CovidBanner />
            <HomeHeaderV2 />
            <AboutSlider />
            <YouthEmploymentV2 />
            <WorkProgress />
            <OurProduct />
            <FeaturedPublication />
            <CaseStudies />
            <ContributedToday />
            <Footer />
        </>
    )
}

export default Home
