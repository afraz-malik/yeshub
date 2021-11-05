import React, { FC, ReactElement, useState } from 'react'

import FAQItem from './Items/FAQItem'
import FAQSideBar from './Items/FAQSidebar'
import { FAQSingleSidebarInterface, FAQsSingleInterface } from '../../../../../Interface/Landing/FAQsInterface'

const FAQPage: FC = (): ReactElement => {
    const [faqs] = useState([
        {
            _id: "someString1",
            title: "Aliquam dapibus convallis purus sit amet lobortis.",
            body:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            _id: "someString1",
            title: "Aliquam dapibus convallis purus sit amet lobortis.",
            body:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            _id: "someString1",
            title: "Aliquam dapibus convallis purus sit amet lobortis.",
            body:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            _id: "someString1",
            title: "Aliquam dapibus convallis purus sit amet lobortis.",
            body:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ])

    const [sidebar] = useState([])

    return (
        <section className="bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="page__heading text-center">
                            Frequently Asked Questions
                        </h1>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        {faqs.map((item: FAQsSingleInterface, idx) => (
                            <FAQItem faq={item} key={idx} />
                        ))}

                        <div className="edited__by">
                            <p>Last edited by strangerdanger - Apr 2020</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="bg-light-grey">
                            <h5 className="sidebar__heading">
                                YES!HUB Policies
                            </h5>

                            <div className="policies">
                                {sidebar.map(
                                    (item: FAQSingleSidebarInterface, idx) => (
                                        <FAQSideBar sidebar={item} key={idx} />
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FAQPage
