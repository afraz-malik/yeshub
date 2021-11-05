import React, { FC, ReactElement } from "react"

import { AdInterface } from "../../Interface/Advertisement/AdvertisementInteface"
import assetUrl from "../../Helpers/Functions/assetUrl"

type Ad = {
    ad: AdInterface
}

const Advertisement: FC<Ad> = ({ ad = { title: "", image: "", redirectUrl: "" } }): ReactElement => {
    return (
        <div className="mc-border">
            <div className="top-communities ad--section">
                <div className="top-growing-list">
                    <h6 className="heading-6 ad__title">FEATURED</h6>
                    <h6 className="ad--title">{ad.title}</h6>
                    <div className="form-group mb-2 adver-image">
                        <a href={ad?.redirectUrl} target="_blank" className="ad--link" rel="noopener noreferrer">
                            <img src={assetUrl(ad.image)} alt={ad?.redirectUrl} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advertisement
