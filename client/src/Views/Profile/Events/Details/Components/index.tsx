import React, { useState, useEffect } from "react"

import MainContent from "../../../../../Controller/Main/Content"
import EventDetails from "../../../../Event/Details/Components/Details"
import EventInfo from "../../../../Event/Create/Component/EventInfo"
import EventModerators from "../../../../Event/Create/Component/EventModerators"
import EventComments from "./EventComments"
import { useLocation, useParams } from "react-router-dom"
import IEvent from "../../../../../Models/User/IEvent"
import eventApi from "../../../../../Helpers/Request/Services/Event/Event"
import EventFormModerator from "../../../../Event/Create/Component/EventFormModerators"

const AuthEventDetail = () => {
    const { state } = useLocation<{ event?: IEvent }>()
    const { id } = useParams()
    const [event, setEvent] = useState<IEvent>()

    useEffect(() => {
        eventApi.fetchById(id).then(response => {
            setEvent(response.data.data)
        })
    }, [])

    return (
        <MainContent
            asideRightContent={
                <React.Fragment>
                    {event && (
                        <>
                            {event && <EventInfo event={event} />}
                            {event && <EventFormModerator eventID={event._id} eventTitle={event.eventName} />}
                            {event && <EventModerators event={event} />}
                        </>
                    )}
                </React.Fragment>
            }
        >
            {event && <EventDetails event={event} />}
            <EventComments />
        </MainContent>
    )
}

export default AuthEventDetail
