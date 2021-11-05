import { EventInput } from "@fullcalendar/core"
import IEvent from "../../Models/User/IEvent"

const toDuration = (start: Date, end: Date) => {
    let startDate = new Date(start)
    let endDate = new Date(end)
    let diff = Math.abs(endDate.getTime() - startDate.getTime())
    let cd = 24 * 60 * 60 * 1000
    let days = Math.floor(diff / cd) + 1
    return days + ""
}
const parseEventForCalender = (events: IEvent[]): EventInput[] => {
    return events.map(event => ({
        id: event._id,
        title: `${event.hostedBy} - ${event.eventName}`,
        start: event.date.startDate,
        myDuration: toDuration(event.date.startDate, event.date.endDate),
        url: "/event/details/" + event._id,
    }))
}

export default parseEventForCalender
