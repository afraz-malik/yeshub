import React, { FC, ReactElement } from "react"

import FAQItem from "../../FAQs/Items/FAQItem"
import FAQSideBar from "../../FAQs/Items/FAQSidebar"
import { FAQSingleSidebarInterface, FAQsSingleInterface } from "../../../../../../Interface/Landing/FAQsInterface"

type thisSection = {
    faqs: FAQsSingleInterface[]
    sidebar: FAQSingleSidebarInterface[]
}

const ProductFAQ: FC<thisSection> = ({ faqs, sidebar }): ReactElement => {
    return (
        <section className="my-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {faqs.map((item, idx) => (
                            <FAQItem faq={item} key={idx} />
                        ))}
                    </div>

                    <div className="col-md-12">
                        <div className="sidebar-calender-component sticky-sidebar">
                            <h5 className="sidebar__heading">Recommended Resources</h5>

                            <div className="policies">
                                {sidebar.map(item => (
                                    <FAQSideBar sidebar={item} key={item._id} />
                                ))}
                            </div>

                            <button className="btn btn-block btn-warning">Visit Community</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductFAQ
