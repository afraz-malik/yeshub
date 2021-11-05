import React, { FC, ReactElement, useEffect, useState } from "react"

import FAQItem from "../../FAQs/Items/FAQItem"
import FAQSideBar from "../../FAQs/Items/FAQSidebar"
import { ProductSectionInterface, RecommendedToolsTypes } from "../../../../../../Interface/Landing/ProductInterface"

type StageFAQs = {
    sections: ProductSectionInterface[]
    sideBar: RecommendedToolsTypes[]
    onChangeStage: any
    number: any
}

export const StageFAQs: FC<StageFAQs> = ({ sections, sideBar, number }): ReactElement => {
    const [faqs, setFaqs] = useState(sections)
    const [sidebar, setSidebar] = useState(sideBar)

    useEffect(() => {
        setFaqs(sections)
        setSidebar(sideBar)
    }, [sections, sideBar])
    return (
        <section className="my-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {faqs.map((item, idx) => (
                            <FAQItem
                                faq={item}
                                key={idx}
                                index={idx}
                                number={number}
                                renderRecommend={() => {
                                    return (
                                        <div className="recommend__block__Container">
                                            <RecommendBlock sidebar={sidebar} />
                                        </div>
                                    )
                                }}
                            />
                        ))}
                    </div>

                    {number !== 1 && <RecommendBlock sidebar={sidebar} />}
                </div>
                {/* <Row>
                    <YouthEmployment bgWhite onStageChange={onChangeStage} />
                </Row> */}
            </div>
        </section>
    )
}

type RecommendBlockInterface = {
    sidebar: RecommendedToolsTypes[]
}

const RecommendBlock: FC<RecommendBlockInterface> = ({ sidebar }) => {
    return (
        <div className="col-md-12">
            <div className="sidebar-calender-component sticky-sidebar">
                <h5 className="sidebar__heading">Recommended Resources</h5>

                <div className="policies">
                    {sidebar.map((item, idx) => (
                        <FAQSideBar sidebar={item} key={idx} />
                    ))}
                </div>

                <button className="btn btn-block btn-warning">Visit Community</button>
            </div>
        </div>
    )
}

export default StageFAQs
