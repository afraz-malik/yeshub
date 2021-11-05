import * as React from "react"

import eventApi from "./../../../Helpers/Request/Services/Event/Event"

import AdvanceSearchBox from "./AdvanceSearchBox"
import ListViewItems from "./ListView/Items/ListViewItems"
import IEvent from "../../../Models/User/IEvent"
import parseFilters from "../../../Helpers/Functions/parseFilters"
import EventBus from "../../../Helpers/Request/Services/event-bus"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

export interface ListViewProps {
    onSearchChange: any
    searchEvent: any
}

export type IFilters = {
    characteristics: {
        [index: string]: boolean
    }
    startDate?: Date | undefined
    endDate?: Date | undefined
    country?: string
    organization?: string
}

const ListView: React.SFC<ListViewProps> = ({ searchEvent, onSearchChange }) => {
    const [events, setEvents] = React.useState<IEvent[]>([])
    const [filter, setFilter] = React.useState<IFilters>({
        characteristics: {},
    })
    const [loading, setloading] = React.useState(true)

    React.useEffect(() => {
        EventBus.on("searched-events", (data: any) => {
            setEvents(data.detail)
            setloading(false)
        })
        eventApi.search(parseFilters(filter)).then(response => {
            console.log("--------- response ------------")
            console.log(response)
            console.log("--------- response ------------")
            setEvents(response.data.data)
            setloading(false)
        })
        // eslint-disable-next-line
    }, [])

    const onFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, checked } = event.target

        setFilter({
            ...filter,
            characteristics: {
                ...filter.characteristics,
                [name]: checked,
            },
        })
    }

    const onValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target
        setFilter({
            ...filter,
            [name]: value,
        })
    }

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        setloading(true)
        eventApi
            .search(parseFilters(filter))
            .then(response => {
                setEvents(response.data.data)
                setloading(false)
            })
            .catch(err => setloading(false))
    }

    const resetFilter = () => {
        setFilter({
            ...filter,
            characteristics: {},
        })
    }

    const onDateChange = (name: string, date: Date | null) => {
        if (date) {
            setFilter({
                ...filter,
                [name]: date,
            })
        }
    }

    return (
        <React.Fragment>
            <div className="search__box mr-4">
                <input type="search" onChange={onSearchChange} className="search__input" placeholder="Search Event" />
                <button onClick={searchEvent} className="btn btn-warning search__btn">
                    <FontAwesomeIcon className="text-white" icon={faSearch} />
                </button>
            </div>
            <AdvanceSearchBox
                onDateChange={onDateChange}
                onFilterChange={onFilterChange}
                resetFilter={resetFilter}
                onValueChange={onValueChange}
                filters={filter}
                onSubmit={onSubmit}
            />

            <div className="mt-5 py-1">
                <h3 className="event__list-title">Results</h3>
            </div>
            {loading && (
                <div className="d-flex" style={{ width: "100%", height: "200px" }}>
                    <span className="m-auto">
                        <img
                            src={
                                "https://powerusers.microsoft.com/t5/image/serverpage/image-id/118082i204C32E01666789C?v=v2"
                            }
                        />
                    </span>
                </div>
            )}
            {!loading && <ListViewItems events={events} />}
        </React.Fragment>
    )
}

export default ListView
