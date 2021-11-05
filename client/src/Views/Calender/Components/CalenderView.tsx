import * as React from "react"
import { EventApi } from "@fullcalendar/core"
import ReactTooltip from "react-tooltip"
import CalenderComponent from "./GridView/CalenderComponent"
import ListViewItems from "./ListView/Items/ListViewItems"
import IEvent from "../../../Models/User/IEvent"
import parseEventForCalender from "../../../Helpers/Functions/parseEventForCalender"
import { isSameDay, isBetweenDay } from "../../../Helpers/Functions/isSameDay"
import dayjs from "dayjs"
import { formattedTime } from "../../../Helpers/Date/formattedTime"
import { CURRENT_AD_INDEX } from "../../../Context/actions"
const fromatToDate = (date: Date | any) => {
    let d = new Date(date)
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}

export interface CalendarViewProps {
    events: IEvent[]
    calendarRef: any
    calendarUpdate: number
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, calendarRef, calendarUpdate }) => {
    const [selectedEvent, setEvent] = React.useState<IEvent[]>([])
    const [selectedDate, setSelected] = React.useState(new Date())

    const scroll = () => {
        let wScroll = window.scrollY
        let scrollTo = wScroll + 190 // comRef.current.offsetTop;
        window.scrollTo(0, scrollTo)
    }

    const onEventClick = ({ event }: { el: HTMLElement; event: EventApi; jsEvent: MouseEvent }) => {
        console.log(event)
        const e: any = events.find(eve => eve._id === event._def.publicId)
        if (e) setEvent(e)
    }

    const onDateClick = (data: { date: Date }) => {
        setSelected(data.date)
        console.log("--- On Date Clicked ---")
        console.log(data)
        console.log("--- On Date Clicked ---")
        const evs = events.filter(
            event =>
                isSameDay(event.date.startDate, data.date) ||
                isSameDay(event.date.endDate, data.date) ||
                isBetweenDay(event.date.startDate, event.date.endDate, data.date)
        )
        console.log(" --- filtered events -------")
        console.log(evs)
        console.log(" --- filtered events -------")
        setEvent([...evs])
        scroll()
    }

    React.useEffect(() => {
        onDateClick({ date: selectedDate })
        // eslint-disable-next-line
    }, [events])

    const onDateChange = (e: any) => {
        setSelected(e.target.value)
        let data = { date: new Date(e.target.value) }
        const evs = events.filter(
            event =>
                isSameDay(event.date.startDate, data.date) ||
                isSameDay(event.date.endDate, data.date) ||
                isBetweenDay(event.date.startDate, event.date.endDate, data.date)
        )
        setEvent([...evs])
    }

    return (
        <React.Fragment>
            <div className="calender__view">
                <CalenderComponent
                    calendarRef={calendarRef}
                    calendarUpdate={calendarUpdate}
                    options={{
                        events: parseEventForCalender(events),
                        eventClick: onEventClick,
                        dateClick: onDateClick,
                    }}
                />
            </div>
            {selectedEvent ? (
                <React.Fragment>
                    <ReactTooltip multiline={true} delayHide={200} delayShow={200} />
                    <div className="mt-5 py-1">
                        <p
                            className="event__list-title h3"
                            data-tip="Click on date in the Calender display events closest to it"
                        >
                            Results
                            <span className={"ml-1 font-weight-normal"}>
                                for
                                <span className={"ml-1"} style={{ position: "relative", fontSize: "18px" }}>
                                    {fromatToDate(selectedDate)}{" "}
                                    <input
                                        style={{ opacity: 0, position: "absolute", left: 0 }}
                                        type="date"
                                        id="dater"
                                        onChange={onDateChange}
                                        name="dater"
                                        value={selectedDate + ""}
                                        defaultValue={fromatToDate(selectedDate)}
                                    />
                                </span>
                            </span>
                        </p>
                    </div>
                    {selectedEvent.length === 0 ? (
                        <p className="mt-4 text-center">No Events For Selected Date</p>
                    ) : (
                        <ListViewItems events={selectedEvent} />
                    )}
                </React.Fragment>
            ) : null}
            {/* <img src="https://paintingsmadebyme.com/wp-content/uploads/2015/08/Coming-Soon-PNG.png" style ={{"width": "100%"}} alt=""/> */}
        </React.Fragment>
    )
}

export default CalendarView
