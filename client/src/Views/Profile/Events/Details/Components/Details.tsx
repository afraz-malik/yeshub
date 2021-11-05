import React from "react"
import { Link } from "react-router-dom"

import { PostImage } from "../../../../../Shared/Images/Images"

const EventDetails = () => {
    return (
        <div className="mc-border px-5">
            <div className="text-right">
                <span className="post-in">7 Hours ago</span>
            </div>
            <div className="pb-2 bb-1 mb-3">
                <p className="status-text py-0 mb-0">
                    Hello people of the world what's your go-to "I want to
                    wallow in my melancholy Workshop regarding all this
                </p>
            </div>
            <div className="pb-2 bb-1 mb-3">
                <h6 className="event-head-text">Description:</h6>
                <p className="event-param-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullam laboris... nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate...
                </p>
            </div>
            <div className="pb-2 bb-1 mb-3">
                <h6 className="event-head-text">Hosted By:</h6>
                <p className="event-param-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullam laboris... nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate...
                </p>
            </div>
            <div className="pb-2 bb-1 mb-3">
                <h6 className="event-head-text">Event Characteristics:</h6>
                <div className="event-char-list">
                    <ul className="list-unstyled">
                        <li>Open – by application</li>
                        <li>Global</li>
                        <li>Country</li>
                        <li>W/ registration fee</li>
                    </ul>
                </div>
            </div>
            <div className="pb-2 bb-1 mb-3">
                <h6 className="event-head-text">Contact/RSVP:</h6>
                <p className="event-param-text">
                    If you would like to RSVP or have any questions, please
                    email Jane Doe at 123@abc.org
                </p>
            </div>
            <div className="pb-2 bb-1 mb-3">
                <ul className="event-related-links list-unstyled">
                    <li>
                        <Link to={"#"}>This is a link.</Link>
                    </li>
                    <li>
                        <Link to={"#"}>This is a link.</Link>
                    </li>
                </ul>
            </div>
            <div className="event-image pb-lg-3 pb-0">
                <img src={PostImage} className="img-fluid" alt="post" />
            </div>
        </div>
    )
}

export default EventDetails
