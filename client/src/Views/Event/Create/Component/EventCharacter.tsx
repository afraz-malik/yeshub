import * as React from "react"
import FormCheckBox from "../../../../Components/Form/FormCheckBox"

export interface EventCharacteristicsProps {
    onValueChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    characteristics: {
        [index: string]: boolean | string
    }
}

const EventCharacteristics: React.FC<EventCharacteristicsProps> = ({ onValueChange, characteristics }) => {
    return (
        <div className="event-chr-body mt-3 mb-3">
            <div className="row">
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["openByApplication"]}
                        name="openByApplication"
                        handleChange={onValueChange}
                        text="Open – by application"
                        disabled={!!characteristics["openWalkIns"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["hostOrg"]}
                        name="hostOrg"
                        handleChange={onValueChange}
                        text="Host org only"
                        disabled={!!characteristics["staffOnly"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["launchEvent"]}
                        name="launchEvent"
                        handleChange={onValueChange}
                        text="Launch event"
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["openWalkIns"]}
                        name="openWalkIns"
                        handleChange={onValueChange}
                        text="Open – walk-ins accepted"
                        disabled={!!characteristics["openByApplication"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["staffOnly"]}
                        name="staffOnly"
                        handleChange={onValueChange}
                        text="Staff Only"
                        disabled={!!characteristics["hostOrg"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["survey"]}
                        name="survey"
                        handleChange={onValueChange}
                        text="Survey"
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["byInviteOnly"]}
                        name="byInviteOnly"
                        handleChange={onValueChange}
                        text="By invite only"
                        disabled={!!characteristics["openByApplication"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["youthOnly"]}
                        name="youthOnly"
                        handleChange={onValueChange}
                        text="Youth Only"
                        disabled={!!characteristics["hostOrg"]}
                    />
                </div>

                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["liveBroadcast"]}
                        name="liveBroadcast"
                        handleChange={onValueChange}
                        text="Live broadcast"
                        disabled={!!characteristics["hostOrg"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["global"]}
                        name="global"
                        handleChange={onValueChange}
                        text="Global"
                        disabled={!!characteristics["regional"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["registration"]}
                        name="registration"
                        handleChange={onValueChange}
                        text="Registration"
                        disabled={!!characteristics["noRegistration"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["exhibition"]}
                        name="exhibition"
                        handleChange={onValueChange}
                        text="Exhibition"
                        disabled={!!characteristics["noRegistration"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["regional"]}
                        name="regional"
                        handleChange={onValueChange}
                        text="Regional"
                        disabled={!!characteristics["global"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["noRegistration"]}
                        name="noRegistration"
                        handleChange={onValueChange}
                        text="No registration fee"
                        disabled={!!characteristics["registration"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["mediaPresence"]}
                        name="mediaPresence"
                        handleChange={onValueChange}
                        text="W/ media presence by
                                                    invitation"
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["country"]}
                        name="country"
                        handleChange={onValueChange}
                        text="Country"
                        disabled={!!characteristics["global"]}
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["workshop"]}
                        name="workshop"
                        handleChange={onValueChange}
                        text="Workshops"
                    />
                </div>
                <div className="col-12 col-sm-6 d-flex justify-content-center character__item">
                    <FormCheckBox
                        checked={!!characteristics["opportunityForFunding"]}
                        name="opportunityForFunding"
                        handleChange={onValueChange}
                        text="Opportunity for funding"
                    />
                </div>
            </div>
        </div>
    )
}

export default EventCharacteristics
