import React, { FC, useState } from "react"

import FeedsInterface, { DraftEvents } from "../../../../Interface/Home/FeedsInterface"
import Announcement from "../../../../Controller/Home/Announcement/Index"

const DraftsItems: FC<FeedsInterface> = () => {
    const [filter] = useState<DraftEvents[]>([])

    return (
        <div className="pd-wrap">
            <div className="cp-header mb-2">
                <div className="d-flex justify-content-between">
                    <span className="head">Drafts</span>
                </div>
            </div>

            <div className="mc-border">
                <div className="pd-list">
                    {filter.length === 0 ? (
                        <h4 className="h4 text-center mb-0">No Drafts</h4>
                    ) : (
                        filter.map(item => (
                            <Announcement event={item.event} link={`/event/create-update`} key={item._id} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default DraftsItems
