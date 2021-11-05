import React, { FC, ReactElement, useEffect } from "react"
import ReactDOM from "react-dom"
import { FAQsInterface } from "../../../../../../Interface/Landing/FAQsInterface"

const FAQItem: FC<FAQsInterface> = ({ faq, renderRecommend, number, index }): ReactElement => {
    return (
        <>
            <div className="question__item">
                {index == 1 && number == 1 && renderRecommend()}
                <h5 className="faq__heading">{faq.title}</h5>
                <div id={`question__item_row${index}`} dangerouslySetInnerHTML={{ __html: faq.body }} />
            </div>
        </>
    )
}

export default FAQItem
