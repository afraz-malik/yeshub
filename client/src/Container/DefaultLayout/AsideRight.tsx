import React, { FC, lazy, Suspense, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import AdInterval from "../../Configs/adInterval.json"
import Loader from "../../Shared/Loader"
import { MoveToTop } from "../../Shared/Images/Images"
import { getAds } from "../../Helpers/Request/Services/Ads/getAds"
import { AdInterface } from "../../Interface/Advertisement/AdvertisementInteface"

const Advertisement = lazy(() => import("../Advertisement"))
if (!sessionStorage.getItem("ad_idx")) {
    sessionStorage.setItem("ad_idx", "0")
}

const AsideRight: FC = ({ children }) => {
    const [ads, setAds] = useState([])
    const [currentAd, setCurrentAd] = useState<AdInterface>({
        title: "",
        redirectUrl: "",
        image: "",
        description: "",
    })

    useEffect(() => {
        getAds.getAll.then(response => {
            setAds(response.data.data)
            setCurrentAd(response.data.data[parseInt(sessionStorage.getItem("ad_idx") || "0")])
        })
    }, [])

    useEffect(() => {
        const shuffleAds = setInterval(() => {
            const idx = Math.floor(Math.random() * ads.length)
            sessionStorage.setItem("ad_idx", idx.toString())
            setCurrentAd(ads[parseInt(sessionStorage.getItem("ad_idx") || "4")])
        }, AdInterval.changeAfter)
        return () => clearInterval(shuffleAds)
    }, [ads, currentAd])

    return (
        <div className={`mc-right pt-lg-0 pt-5`}>
            <div className="mc-right-content h-100">
                <div className="mc-right-wrap h-100">
                    {children}
                    <Suspense fallback={<Loader />}>
                        <Advertisement ad={currentAd} />
                    </Suspense>
                </div>

                <div className="moveUp" onClick={() => window.scrollTo(0, 0)}>
                    <Link to="#">
                        <img src={MoveToTop} alt={"top"} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AsideRight
