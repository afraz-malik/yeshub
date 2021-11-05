import * as React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { DropResult } from "react-beautiful-dnd"
import reorder from "../../../../../Helpers/Functions/reorder"
import { SubEvent } from "../../../../../Models/User/IEvent"

import SubEventsList from "./SubEventsList"

export interface SubEventsProps {
    onSubEventsChange: (subEvents: Partial<SubEvent>[]) => void
    eventsData: Array<Record<string, any>>
}

const SubEvents: React.FC<SubEventsProps> = ({ onSubEventsChange, eventsData = [] }) => {
    const [subEvents, setSubEvents] = React.useState<Partial<SubEvent>[]>(eventsData)
    const [counter, setCounter] = React.useState(0)

    React.useEffect(() => {
        onSubEventsChange(subEvents)
        // eslint-disable-next-line
    }, [subEvents])

    React.useEffect(() => {
        if (counter !== 2) {
            setCounter(counter + 1)
        }
        // eslint-disable-next-line
    }, [counter])

    if (counter < 2) {
        eventsData.forEach((item, idx) => {
            if (
                (subEvents[idx] && subEvents[idx].title !== item.title) ||
                subEvents[idx].description !== item.description
            ) {
                setSubEvents(eventsData)
            }
        })
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const items = reorder(subEvents, result.source.index, result.destination.index)
        onSubEventsChange(subEvents)
        setSubEvents(items)
    }

    const onSubEventsTimeChange = (name: string, id: number, time: Date | null) => {
        subEvents[id] = { ...subEvents[id], [name]: time }
        onSubEventsChange(subEvents)

        setSubEvents([...subEvents])
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target
        subEvents[id] = { ...subEvents[id], [name]: value }
        onSubEventsChange(subEvents)
        setSubEvents([...subEvents])
    }

    const addSubEvents = () => {
        setSubEvents(
            subEvents.concat({
                _id: subEvents.length.toString(),
                date: new Date(),
                startTime: new Date(),
                endTime: new Date(),
                description: "",
            })
        )
    }

    const deleteSubEvents = (idx: number) => {
        const es = subEvents.filter((_e, index) => index !== idx)
        setSubEvents([...es])
    }

    return (
        <div className="add-sub-events mb-3 pb-1">
            <h6 className="heading-6 section__heading-custom ">
                <span>Sub Events</span>
                <small>For events within your larger event.</small>
            </h6>
            <SubEventsList
                onDragEnd={onDragEnd}
                deleteSubEvent={deleteSubEvents}
                events={subEvents}
                onSubEventsChange={onChange}
                onSubEventsTimeChange={onSubEventsTimeChange}
            />
            <span className="d-flex event__form-footer">
                <span onClick={addSubEvents}>
                    <FontAwesomeIcon icon={faPlusCircle} /> Add Sub-Event
                </span>
            </span>
        </div>
    )
}

export default SubEvents
