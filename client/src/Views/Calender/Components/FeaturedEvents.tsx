import * as React from "react"

import eventApi from "../../../Helpers/Request/Services/Event/Event"
import IEvent from "../../../Models/User/IEvent"
import assetUrl from "../../../Helpers/Functions/assetUrl"
import {formattedTime} from '../../../Helpers/Date/formattedTime';
import { formatTime } from "../../../Helpers/Date/time"
import { Link } from "react-router-dom"
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const fomatDate = (_date: Date | any) => {
    let d = new Date(_date);
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    
    return `${date} ${MONTHS[month]} ${year}`;
}

export interface FeaturedEventsProps {}

const FeaturedEvents: React.FC<FeaturedEventsProps> = () => {
    const [events, setEvents] = React.useState<IEvent[]>([])

    React.useEffect(() => {
        eventApi.fetchFeaturedEvents().then(response => {
            setEvents(response.data.data)
        })
    }, [])

    return (
        <div className="event__info sidebar-calender-component">
            <h6 className="heading-6 ad__title">Featured Events</h6>

            {events.length ? (
                events.map(event => (
                    <Link to={`/event/details/${event._id}`} key={event._id}>
                        <div className="featured__event">
                            <img src={event.images.length ? assetUrl(event.images[0]) : ""} alt={event.eventName} />

                            <div className="details">
                                {/* <div className="date">{fomatDate(event.date.startDate)}</div> */}
                                {/* <div className="date">{formatTime(event.date.startDate)}</div> */}
                                <div className="info">
                                
                                    <strong>{fomatDate(event.date.startDate)}</strong>
                                
                                    <h3 className="event__title">{event.eventName}</h3>
                                    <p className="description">{event.hostedBy}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <h6 className="text-center">No Event Found!!</h6>
            )}
        </div>
    )
}

export default FeaturedEvents
