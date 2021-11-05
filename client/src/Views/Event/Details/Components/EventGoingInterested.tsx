import React from "react"
import { DropdownDivider } from "react-bootstrap/Dropdown"
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import eventApi from "../../../../Helpers/Request/Services/Event/Event"

export const EventGoingInterestedComponent: React.FC<any> = ({ going = 0, eventId, onMarkGoing }) => {
    const markItGoing = (action: number) => {
        eventApi
            .markGoing(eventId, action)
            .then(res => {
                onMarkGoing(action)
                eventApi
                    .subscribe(eventId, action)
                    .then(() => {})
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="event-card-footer">
            {[0, -1].includes(going) && (
                <div className="d-flex flex-row flex-wrap justify-space-between">
                    <EventGoingButton eventId={eventId} isGoing={going} markItGoing={() => markItGoing(1)} />
                    <EventInterestedButton eventId={eventId} isNotGoing={going} markItGoing={() => markItGoing(2)} />
                </div>
            )}
            {going > 0 && (
                <div className="event-dropdown" style={{ maxWidth: "190px" }}>
                    <UncontrolledDropdown>
                        <DropdownToggle style={{ background: "#22d77e", border: "2px solid #22d77e", borderRadius: 0 }}>
                            {going === 1 && (
                                <span>
                                    <InterestedIcon icon="check_fill" color={"white"} /> Going
                                </span>
                            )}
                            {going === 2 && (
                                <span>
                                    <InterestedIcon icon="star_fill" color={"white"} /> Interested
                                </span>
                            )}
                            {going === 0 && <span>Not Going</span>}
                        </DropdownToggle>
                        <DropdownMenu>
                            {going === 1 ? (
                                <DropdownItem onClick={() => markItGoing(2)}>
                                    <span>
                                        <InterestedIcon icon="star_outline" color={"gray"} />
                                    </span>{" "}
                                    Interested
                                </DropdownItem>
                            ) : (
                                <DropdownItem onClick={() => markItGoing(1)}>
                                    <InterestedIcon icon="check_outline" color={"gray"} /> Going
                                </DropdownItem>
                            )}

                            <DropdownItem divider />

                            {going === 2 ? (
                                <DropdownItem onClick={() => markItGoing(0)}>
                                    <span style={{ opacity: 0 }}>
                                        <InterestedIcon icon="check_outline" color={"gray"} />
                                    </span>{" "}
                                    Not Interested
                                </DropdownItem>
                            ) : (
                                <DropdownItem onClick={() => markItGoing(0)}>
                                    <span style={{ opacity: 0 }}>
                                        <InterestedIcon icon="check_outline" color={"gray"} />
                                    </span>{" "}
                                    Not Going
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
            )}
        </div>
    )
}

export const EventInterestedButton: React.FC<any> = ({ eventId, isNotGoing, markItGoing }) => {
    return (
        <button
            onClick={() => {
                markItGoing(2)
            }}
            className={`fs-12 btn btn-yellow`}
        >
            Interested
        </button>
    )
}

export const EventGoingButton: React.FC<any> = ({ eventId, isGoing, markItGoing }) => {
    return (
        <button
            onClick={() => markItGoing(1)}
            className={`mr-2 fs-12 btn ${isGoing === 1 ? "btn-success" : "btn-yellow"}`}
        >
            Going
        </button>
    )
}

export const InterestedIcon: React.FC<{
    color: string
    icon: "star_fill" | "star_outline" | "check_fill" | "check_outline"
}> = ({ color = "red", icon = "starfill" }) => {
    const getIcon = (icon: string) => {}
    return (
        <span style={{ float: "left", marginLeft: "1em", marginRight: "1em" }}>
            {icon === "star_fill" && <span>{StarFillIcon}</span>}
            {icon === "star_outline" && <span> {StarOutlineIcon}</span>}
            {icon === "check_fill" && <span> {CheckFillIcon}</span>}
            {icon === "check_outline" && <span> {CheckOutlineIcon}</span>}
        </span>
    )
}

export default EventGoingInterestedComponent

export const CheckFillIcon = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.6232 2.40992C17.8645 2.67247 18 3.02852 18 3.39976C18 3.77101 17.8645 4.12705 17.6232 4.3896L7.32832 15.5901C7.08699 15.8526 6.75973 16 6.4185 16C6.07727 16 5.75001 15.8526 5.50869 15.5901L0.361238 9.98984C0.126825 9.72579 -0.00288337 9.37213 4.86468e-05 9.00504C0.00298066 8.63795 0.138319 8.2868 0.376914 8.02721C0.615509 7.76763 0.93827 7.62039 1.27568 7.6172C1.61309 7.61401 1.93816 7.75513 2.18086 8.01016L6.4185 12.6206L15.8036 2.40992C16.0449 2.14745 16.3722 2 16.7134 2C17.0546 2 17.3819 2.14745 17.6232 2.40992Z"
                fill="white"
            />
        </g>
        <defs>
            <clipPath id="clip0">
                <rect width="18" height="18" fill="white" />
            </clipPath>
        </defs>
    </svg>
)

export const CheckOutlineIcon = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.69273 15.4209L0.54683 9.82233C0.35609 9.60666 0.247587 9.31423 0.250041 9.00704C0.2525 8.69911 0.366179 8.40832 0.560974 8.19639C0.755149 7.98514 1.01319 7.86969 1.27804 7.86719C1.54223 7.86469 1.80123 7.97467 1.99834 8.18101L6.23444 12.7897L6.4185 12.99L6.60256 12.7897L15.9876 2.57913C15.9876 2.57912 15.9877 2.57911 15.9877 2.5791C16.184 2.36552 16.4456 2.25 16.7134 2.25C16.9812 2.25 17.2428 2.36551 17.4391 2.57907C17.6361 2.79344 17.75 3.08832 17.75 3.39976C17.75 3.7112 17.6361 4.00608 17.4391 4.22045L7.14428 15.4209C6.9479 15.6345 6.68632 15.75 6.4185 15.75C6.1507 15.75 5.88913 15.6345 5.69275 15.4209C5.69274 15.4209 5.69274 15.4209 5.69273 15.4209Z"
            stroke="gray"
            stroke-width="0.5"
        />
    </svg>
)

export const StarFillIcon = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17.4182 5.98618L12.0222 5.21059L9.60999 0.374144C9.54411 0.241725 9.43572 0.134529 9.30183 0.0693701C8.96604 -0.0945772 8.55799 0.0420455 8.39009 0.374144L5.97791 5.21059L0.581865 5.98618C0.433096 6.0072 0.297079 6.07656 0.192941 6.18166C0.0670438 6.30964 -0.00233122 6.48181 5.98176e-05 6.66035C0.00245086 6.83888 0.0764123 7.00918 0.205692 7.13381L4.10981 10.8983L3.18744 16.214C3.16581 16.3376 3.17965 16.4648 3.22738 16.5811C3.27511 16.6973 3.35483 16.7981 3.4575 16.8718C3.56016 16.9456 3.68166 16.9894 3.80823 16.9983C3.9348 17.0072 4.06136 16.9809 4.17356 16.9223L9.00004 14.4127L13.8265 16.9223C13.9583 16.9917 14.1113 17.0148 14.258 16.9896C14.6277 16.9265 14.8764 16.5797 14.8126 16.214L13.8903 10.8983L17.7944 7.13381C17.9007 7.03082 17.9708 6.8963 17.992 6.74917C18.0494 6.38134 17.7901 6.04083 17.4182 5.98618V5.98618Z"
            fill="white"
        />
    </svg>
)

export const StarOutlineIcon = (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M17.4182 5.98618L12.0222 5.21059L9.60999 0.374144C9.54411 0.241725 9.43572 0.134529 9.30183 0.0693701C8.96604 -0.0945772 8.55799 0.0420455 8.39009 0.374144L5.97791 5.21059L0.581865 5.98618C0.433096 6.0072 0.297079 6.07656 0.192941 6.18166C0.0670438 6.30964 -0.00233122 6.48181 5.98176e-05 6.66035C0.00245086 6.83888 0.0764123 7.00918 0.205692 7.13381L4.10981 10.8983L3.18744 16.214C3.16581 16.3376 3.17965 16.4648 3.22738 16.5811C3.27511 16.6973 3.35483 16.7981 3.4575 16.8718C3.56016 16.9456 3.68166 16.9894 3.80823 16.9983C3.9348 17.0072 4.06136 16.9809 4.17356 16.9223L9.00004 14.4127L13.8265 16.9223C13.9583 16.9917 14.1113 17.0148 14.258 16.9896C14.6277 16.9265 14.8764 16.5797 14.8126 16.214L13.8903 10.8983L17.7944 7.13381C17.9007 7.03082 17.9708 6.8963 17.992 6.74917C18.0494 6.38134 17.7901 6.04083 17.4182 5.98618V5.98618ZM12.2474 10.3686L13.0147 14.7889L9.00004 12.7038L4.98542 14.791L5.75264 10.3707L2.50523 7.23891L6.99379 6.59363L9.00004 2.57272L11.0063 6.59363L15.4949 7.23891L12.2474 10.3686Z"
            fill="gray"
        />
    </svg>
)
