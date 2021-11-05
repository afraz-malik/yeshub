import React, { FC } from "react"

import AsideLeft from "../../Container/DefaultLayout/AsideLeft"
import AsideRight from "../../Container/DefaultLayout/AsideRight"
import { AdContextProvider } from "../../Context/AdContextProvider"

type MainContent = {
    asideRightContent?: React.ReactNode | React.ReactNode[]
}

const SolutionMainContent: FC<MainContent> = ({ children, asideRightContent }) => {
    return (
        <> 
            <section>
                <div className="main-content pb-50">
                    <div className="main-content-wrap">
                        <div className="mx_width">
                            <div className="main-content-body">
                                <AsideLeft />
                                <div className="mc-mid pt-lg-0 pt-5">
                                    <div className="mc-mid-content">
                                        <div className="mc-mid-wrap">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                                <AdContextProvider>
                                    <AsideRight>{asideRightContent}</AsideRight>
                                </AdContextProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default SolutionMainContent
