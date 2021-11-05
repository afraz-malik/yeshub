import React from "react"

import FullCalendar from "@fullcalendar/react"
import ReactTooltip from "react-tooltip"
import interactionPlugin from "@fullcalendar/interaction"
import bootStrap from "@fullcalendar/bootstrap"
import dayGridPlugin from "@fullcalendar/daygrid"
import listPlugin from "@fullcalendar/list"

import defaultOptions from "../../../../Configs/FullCalender.json"
import Notification from "../../../../Shared/Notification/Notification"
// import { OptionsInput } from "@fullcalendar/core"
import dayjs from "dayjs"

type CalenderComponent = {
    events?: any[]
    options?: any
    calendarRef: any
    calendarUpdate: number
}

const CalenderComponent: React.FC<CalenderComponent> = ({ events = [], options, calendarRef, calendarUpdate }) => {
    const [viewTitle, setviewTitle] = React.useState<any>([])

    React.useEffect(() => {
        let calendarApi = calendarRef.current.getApi()
        let date = calendarApi.getDate()
        let viewtitle = calendarApi.currentDataManager.data.viewTitle.split(" ")
        if (JSON.stringify(viewtitle) !== JSON.stringify(viewTitle)) {
            setviewTitle(viewtitle)
        }
    }, [calendarUpdate])

    const onEventClick = ({ event, jsEvent }: any) => {
        jsEvent.preventDefault()
        Notification(event.title, "info")
    }

    const renderContent = (info: any) => {
        return (
            <>
                <span
                    data-tip={`${info.event._def.title} <br />duration: ${
                        Number(info.event._def.extendedProps.myDuration) || 1
                    } days`}
                    className="badge badge-primary"
                    style={{ width: "100%", overflow: "hidden" }}
                >
                    <a target="blank" href={info.event._def.url}>
                        {info.event._def.extendedProps.myDuration}-{info.event._def.title}
                    </a>
                </span>
                <ReactTooltip multiline={true} />
            </>
        )
    }

    let [month = "", date = ""] = viewTitle

    return (
        <>
            <div className="calendar__title_dates">
                <span>{month}</span>
                <span>{date}</span>
            </div>
            <FullCalendar
                ref={calendarRef}
                showNonCurrentDates={false}
                buttonText={defaultOptions.defaultButtonText}
                header={false}
                themeSystem={"bootstrap"}
                initialView={defaultOptions.initialView}
                plugins={[interactionPlugin, listPlugin, dayGridPlugin, bootStrap]}
                eventClick={onEventClick}
                dayMaxEventRows={2}
                eventContent={renderContent}
                eventClassNames="event--item"
                {...options}
            />
        </>
    )
}

export default CalenderComponent
