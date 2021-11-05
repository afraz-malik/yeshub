import React, { useState, useEffect } from "react"

import Profile from ".."
import FormHeader from "../../../Container/Top/FormHeader"
import EventsItems from "./Components/EventsItems"
import eventApi from "../../../Helpers/Request/Services/Event/Event"
import IEvent from "../../../Models/User/IEvent"
import useInfiniteScroll from "../../../Hooks/useInfiniteScroll"
import { DELETE_EVENT_EVENT } from "../../../Constants/constants"

const MyEvents = ({ onlySubscribed, title = "My Events" }: any) => {
    const [events, setEvents] = useState<IEvent[]>([])
    const { page } = useInfiniteScroll(1)

    useEffect(() => {
        eventApi
            .fetch(page)
            .then(response => {
                console.log(response)
                console.log("-------- my events -------")
                setEvents(e => [...e, ...filterRecords(response.data.docs)])
            })
            .catch(err => console.log(err))
    }, [page])

    const filterRecords = (records: Array<any>) => {
        if (onlySubscribed && records.length) {
            return records.filter(r => r.isSubscribed == true)
        }
        return records
    }

    const deleteEvent = (event: any) => {
        const es = events.filter(e => e._id !== event.detail.id)
        setEvents(es)
    }

    useEffect(() => {
        document.addEventListener(DELETE_EVENT_EVENT, deleteEvent)
        return () => document.removeEventListener(DELETE_EVENT_EVENT, deleteEvent)
    }, [events, deleteEvent])

    return (
        <Profile showSideBar={false}>
            <FormHeader title={title} />
            <EventsItems events={events} />
        </Profile>
    )
}

export default MyEvents
