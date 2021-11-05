import React, { FC, ReactElement, useState, useEffect } from "react"

import { HomeApis } from "../../../Helpers/Request/Services/Home/Home"
import assetUrl from "../../../Helpers/Functions/assetUrl"

const HowItWorks: FC = (): ReactElement => {
    const [aboutUs, setAboutUs] = useState({
        points: [],
        image: "",
    })

    useEffect(() => {
        HomeApis.about.then(response => {
            if (response && response.data.data.length) {
                setAboutUs(response.data.data[0])
            }
        })
    }, [])

    return (
        <section className="pb-5">
            <div className="container">
                <div className="section__heading">
                    <h3 className="title">About YES!HUB</h3>
                    <div className="description">
                        Welcome to YES!HUB, a humble community of doers and
                        dreamers! We're currently building our home and things
                        are under construction as you can see, so pardon the
                        mess. But we're lucky to have you here!
                    </div>
                </div>

                <div className="row bg-white py-2">
                    <div className="col-md-5">
                        {aboutUs.points.map((point: any, index: number) => (
                            <div
                                className={`side__item ${
                                    index === 0 ? "active" : ""
                                }`}
                                key={point._id}
                            >
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: point.content,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="col-md-7 h-100">
                        <img
                            className="team__img"
                            src={assetUrl(aboutUs.image)}
                            alt="group"
                        />
                    </div>
                </div>
                <div className="section__heading">
                    <div className="description">
                        Thanks for stopping by, and we hope you keep coming
                        around often!
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
