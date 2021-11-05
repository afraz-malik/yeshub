import * as React from "react"
import EventsItems from "../Events/Components/EventsItems"
import useInfiniteScroll from "../../../Hooks/useInfiniteScroll"
import eventApi from "./../../../Helpers/Request/Services/Event/Event"
import IEvent from "../../../Models/User/IEvent"

export interface UserEventsProps {}

const UserEvents: React.SFC<UserEventsProps> = () => {
    const [events, setEvents] = React.useState<IEvent[]>([])
    const { page } = useInfiniteScroll(1)

    React.useEffect(() => {
        eventApi.fetch(page).then(response => {
            setEvents(e => [...e, ...response.data.docs])
        })
    }, [page])

    return <EventsItems events={events} />
}

export default UserEvents
