import React, { ChangeEvent, FC, ReactElement } from "react"

type EventsFilter = {
    onValueChange: Function
    values: any
    show: boolean
}

const EventsFilter: FC<EventsFilter> = ({
    onValueChange,
    show,
}): ReactElement => {
    return (
        <>
            {show ? (
                <div className="mc-border mb-2">
                    <div className="event-chractersctics mb-2">
                        <div className="event-chractersctics-wrap">
                            <div className="event-chractersctics-wrap">
                                <div className="event-chr-head">
                                    <div className="event-chr-body mt-3 bb-1">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Open – by application
                                                    <input
                                                        type="checkbox"
                                                        name="openByApplication"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Host org only
                                                    <input
                                                        type="checkbox"
                                                        name="hostOrg"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Launch event
                                                    <input
                                                        type="checkbox"
                                                        name="launchEvent"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Open – walk-ins accepted
                                                    <input
                                                        type="checkbox"
                                                        name="openWalkIns"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Staff Only
                                                    <input
                                                        type="checkbox"
                                                        name="staffOnly"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Survey
                                                    <input
                                                        type="checkbox"
                                                        name="survey"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    By invite only
                                                    <input
                                                        type="checkbox"
                                                        name="byInviteOnly"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Youth Only
                                                    <input
                                                        type="checkbox"
                                                        name="youthOnly"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>

                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Live broadcast
                                                    <input
                                                        type="checkbox"
                                                        name="liveBroadcast"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Global
                                                    <input
                                                        type="checkbox"
                                                        name="global"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    W/ registration fee
                                                    <input
                                                        type="checkbox"
                                                        name="registration"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Exhibition
                                                    <input
                                                        type="checkbox"
                                                        name="exhibition"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Regional
                                                    <input
                                                        type="checkbox"
                                                        name="regional"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    No registration fee
                                                    <input
                                                        type="checkbox"
                                                        name="noRegistration"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    W/ media presence by
                                                    invitation
                                                    <input
                                                        type="checkbox"
                                                        name="mediaPresence"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Country
                                                    <input
                                                        type="checkbox"
                                                        name="country"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Workshops
                                                    <input
                                                        type="checkbox"
                                                        name="workshop"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="checkBox2">
                                                    Opportunity for funding
                                                    <input
                                                        type="checkbox"
                                                        name="opportunityForFunding"
                                                        onChange={(
                                                            e: ChangeEvent<
                                                                HTMLInputElement
                                                            >
                                                        ) => onValueChange(e)}
                                                    />
                                                    <span className="checkmark" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default EventsFilter
