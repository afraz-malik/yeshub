import React, { FC } from "react"

import CalenderComponent from "../../Calender/Components/GridView/CalenderComponent"
import CreateEventForm from "./Component/CreateEventForm"
import EventRules from "./Component/EventRules"
import MainContent from "../../../Controller/Main/Content"

const CreateEvent: FC = () => {
    return (
        <MainContent
            asideRightContent={
                <>
                    {/* <div className="sidebar-calender-component">
                        <CalenderComponent events={[]} />
                    </div> */}
                    <div className="sidebar-calender-component">
                        <EventRules />
                    </div>
                </>
            }
        >
            <CreateEventForm />
        </MainContent>
    )
}

export default CreateEvent
