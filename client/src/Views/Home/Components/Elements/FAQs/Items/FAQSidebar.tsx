import React, { FC, ReactElement } from "react"

import { FAQSidebarInterface } from "../../../../../../Interface/Landing/FAQsInterface"
import assetUrl from "../../../../../../Helpers/Functions/assetUrl"

const FAQSideBar: FC<FAQSidebarInterface> = ({ sidebar }): ReactElement => {
    return (
        <div className="policy__item is__link">
            <div className="policy__img">
                <img src={assetUrl(sidebar.file)} alt={sidebar.title} />
            </div>

            <div className="policy__link">
                <a href={sidebar.redirectUrl} target="_blank" rel="noopener noreferrer">
                    {sidebar.title}
                </a>
            </div>
        </div>
    )
}

export default FAQSideBar
