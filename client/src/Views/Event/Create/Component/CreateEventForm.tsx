import React, { ChangeEvent, FC, Fragment, useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import Form from "../../../../Components/Form/Form"
import FormInput from "../../../../Components/Form/FormInput"
import FormTextArea from "../../../../Components/Form/FormTextArea"
import FormHeader from "../../../../Container/Top/FormHeader"
import TimeInput from "../../../../Shared/TimeInput"
import DateInput from "../../../../Shared/DateInput"
import FormSelect from "../../../../Components/Form/FormSelect"
import { PictureIcon } from "../../../../Shared/Icons"
import EventCharacteristics from "./EventCharacter"
import SubEvents from "./SubEvents/index"

import IEvent, { SubEvent } from "../../../../Models/User/IEvent"
import parseCharacterics from "../../../../Helpers/Functions/parseCharacter"
import assetUrl from "../../../../Helpers/Functions/assetUrl"
import TimeZones from "./../../../../Configs/timezone.json"
import Notification from "../../../../Shared/Notification/Notification"
import { isAfterDay } from "../../../../Helpers/Functions/isSameDay"
import { getHours, setHours } from "../../../../Helpers/Date/time"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import mediaUploader from "../../../../Helpers/Request/Services/uploadFile/FileUpload"

let start = new Date()
start.setHours(9, 0)

let notificationBefore = [
    { title: "15 minutes before the event", value: 15 },
    { title: "30 minutes before the event", value: 30 },
    { title: "1 hour before the event", value: 60 },
    { title: "1 day before the event", value: 1440 },
]

const CreateEventForm: FC = () => {
    const { state } = useLocation<IEvent>()

    const [relatedLinks, setRelatedLinks] = useState([
        {
            title: "",
            url: "",
        },
    ])
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined)

    const [values, setValues] = useState<any>({
        link: relatedLinks,
        contactRsvp: "",
        date: {
            startDate: new Date(),
            endDate: new Date(),
        },
        address: "",
        time: {
            startTime: start,
            endTime: start,
        },
        characteristics: {},
        subEvent: [
            {
                _id: "0",
                title: "",
                date: new Date(),
                startTime: new Date().setHours(9, 0),
                endTime: new Date().setHours(9, 0),
                description: "",
            },
        ],
        isPublished: true,
        notifyUser: 30,
        images: [],
    })
    const [dateInput, setDateInput] = useState({
        minTimeAllowed: values.date.startDate,
        maxTimeAllowed: values.date.startDate,
    })

    const onSubEventsChange = (subEvents: Partial<SubEvent>[]) => {
        setValues({
            ...values,
            subEvent: subEvents.map(subEvent => ({
                title: subEvent.title,
                date: subEvent.date,
                description: subEvent.description,
                endTime: subEvent.endTime,
                startTime: subEvent.startTime,
            })),
        })
    }

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { type, name, value, checked } = e.target

        if (type === "checkbox") {
            setValues({
                ...values,
                characteristics: {
                    ...values.characteristics,
                    [e.target.name]: checked,
                },
            })
            return
        }

        setValues({ ...values, [name]: value })
    }

    const onDateChange = (date: Date | null, name: string) => {
        if (name === "startDate" && date && isAfterDay(date, values.date.endDate)) {
            setValues({
                ...values,
                date: {
                    ...values.date,
                    [name]: date,
                    endDate: date,
                },
            })
        } else {
            setValues({
                ...values,
                date: {
                    ...values.date,
                    [name]: date,
                },
            })
        }
    }

    const onTimeChange = (time: Date | null | undefined, name: string) => {
        if (name === "startTime" && time && isAfterDay(time, values.date.endTime)) {
            setValues({
                ...values,
                time: {
                    // ...values.date,
                    [name]: time,
                    endTime: time,
                },
            })
        } else {
            setValues({
                ...values,
                time: {
                    ...values.time,
                    [name]: time,
                },
            })
        }
    }

    const onLinksChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value } = e.target

        let relatedClone = relatedLinks
        relatedClone[id] = { ...relatedClone[id], [name]: value }
        setRelatedLinks(relatedClone)
    }

    const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0]
            console.log("file being upload", file)
            const formData = new FormData()
            formData.append("images", file)
            mediaUploader.uploadFile(formData).then(res => {
                console.log(res)
                setValues({ ...values, images: [res.data.data] })
            })

            // setValues({ ...values, images: event.target.files[0] })

            const reader = new FileReader()
            reader.onload = e => {
                setImagePreview(e.target?.result?.toString())
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    const removeImage = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        // setValues({ ...values, images: null })
        setValues({ ...values, images: [] })
        setImagePreview(undefined)
    }

    const getFormData = () => {
        const chars: string[] = []

        Object.keys(values.characteristics).forEach(char => {
            if (values.characteristics[char]) {
                chars.push(char)
            }
        })

        return {
            ...values,
            // subEvent: JSON.stringify(values.subEvent), older version (for formData)
            subEvent: processSubEvents(values.subEvent),
            characteristics: chars,
            link: [...relatedLinks],
        }
    }

    useEffect(() => {
        if (state) {
            const data = {
                _id: state._id,
                time: {
                    startTime: state.time?.startTime ? new Date(state.time.startTime) : new Date(),
                    endTime: state.time?.endTime ? new Date(state.time.endTime) : new Date(),
                },
                date: {
                    startDate: new Date(state.date?.startDate || ""),
                    endDate: new Date(state.date?.endDate || ""),
                },
                city: state.city || "",
                country: state.country || "",
                description: state.description || "",
                address: state.address || "",
                coHostedBy: state.coHostedBy || "",
                hostedBy: state.hostedBy || "",
                contactRsvp: state.contactRsvp || "",
                eventName: state.eventName || "",
                link: state.link || "",
                images: state.images || [],
                notifyUser: state.notifyUser || 30,
                characteristics: parseCharacterics(state.characteristics || []),
                subEvent: [
                    ...state.subEvent.map((item: any) => {
                        item.date = new Date(item?.date || "")
                        item.startTime = new Date(item.startTime || "")
                        item.endTime = new Date(item.endTime || "")
                        return item
                    }),
                ],
            }

            console.log("Data", data)

            setValues(data)
            setRelatedLinks([...(state.link || [])])
            setImagePreview(assetUrl(state.images[0]))
        }
    }, [state])

    useEffect(() => {
        console.log("event testing", values)
        if (values.date.startDate) {
            const hour = getHours(values.time.startTime)

            setDateInput({
                minTimeAllowed: setHours(values.date.startDate, hour).toDate(),
                maxTimeAllowed: setHours(values.date.endDate, 23).toDate(),
            })
        }
    }, [values.date.startDate, values.time.startTime, values.date.endDate])

    return (
        <div className="cp-wrap">
            <FormHeader title="Create Event" showDrafts={false} />
            <div className="cp-form">
                <Form
                    data={getFormData()}
                    isFormData={false}
                    method={state && state.isPublished ? "PUT" : "POST"}
                    submitUrl={state && state.isPublished ? "event/update" : "general/event"}
                    saveAsDraftUrl={"draft/event"}
                    afterSubmit={() => {
                        Notification(
                            "You have successfully created an event! The admins will now review your submission before it is displayed on the Calendar.",
                            "success"
                        )
                    }}
                    props={{
                        saveAsDraft: !state,
                        draftURL: "draft/event",
                    }}
                    redirectUrl="/profile/events"
                    buttonText={state && state.isPublished ? "UPDATE" : "POST"}
                >
                    <div className="form-group">
                        <label htmlFor="eventImage" className="d-block w-100">
                            <div id="drop-region">
                                {imagePreview ? (
                                    <div id="image-preview" className="pointer-events-none">
                                        <div className="close__icon pointer-events-all" onClick={removeImage}>
                                            <FontAwesomeIcon icon={faTimesCircle} />
                                        </div>
                                        <img className="pointer-events-all" src={imagePreview} alt="" />
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <div className="drop-image">
                                            <div className="feature_link">{PictureIcon}</div>
                                        </div>
                                        <div className="drop-message">Click to upload</div>
                                    </React.Fragment>
                                )}

                                <input
                                    className="file__input"
                                    type="file"
                                    name="image"
                                    id="eventImage"
                                    onChange={onImageChange}
                                />
                            </div>
                        </label>
                    </div>
                    <FormInput
                        type="text"
                        className={"form-control form-input2"}
                        name="eventName"
                        onChange={onValueChange}
                        isRequired={true}
                        label="Event Title"
                        props={{
                            value: values.eventName,
                        }}
                    />
                    <div className="row">
                        <label htmlFor="startDate" className="col-12 form-label">
                            Event Date
                        </label>

                        <div className="col-12 col-md">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <DateInput
                                        name="startDate"
                                        value={values.date.startDate}
                                        options={{
                                            onChange: date => onDateChange(date, "startDate"),
                                            wrapperClassName: "form-group",
                                            placeholderText: "Start Date",
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <DateInput
                                        name="endDate"
                                        value={values.date.endDate}
                                        options={{
                                            onChange: date => onDateChange(date, "endDate"),
                                            wrapperClassName: "form-group",
                                            placeholderText: "End Date",
                                            minDate: values.date.startDate,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <label htmlFor="" className="col-12 form-label">
                            Event Time
                        </label>

                        <div className="col-12 col-md">
                            <div className="form-group">
                                <TimeInput
                                    name="startTime"
                                    value={values.time.startTime}
                                    onChange={onTimeChange}
                                    options={{
                                        placeholderText: "Start Time",
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md">
                            <div className="form-group">
                                <TimeInput
                                    name="endTime"
                                    value={values.time.endTime}
                                    onChange={onTimeChange}
                                    options={{
                                        placeholderText: "End Time",
                                        minTime: dateInput.minTimeAllowed,
                                        maxTime: dateInput.maxTimeAllowed,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <FormSelect onChange={onValueChange} isRequired={false} name="timezone" label="TimeZone">
                        {TimeZones.map(timezone => (
                            <option value={timezone} key={timezone}>
                                {timezone}
                            </option>
                        ))}
                    </FormSelect>

                    <FormInput
                        type="address"
                        className={"form-control form-input2"}
                        name="address"
                        onChange={onValueChange}
                        isRequired={true}
                        label="Address"
                        props={{
                            placeholder: "Building number, building name, street address",
                            value: values.address,
                        }}
                    />

                    <FormInput
                        type="text"
                        className={"form-control form-input2"}
                        name="hostedBy"
                        onChange={onValueChange}
                        isRequired={false}
                        label="Host"
                        props={{
                            placeholder: "Organization. Do not abbreviate.",
                            value: values.hostedBy,
                        }}
                    />
                    <FormInput
                        type="text"
                        className={"form-control form-input2"}
                        name="coHostedBy"
                        onChange={onValueChange}
                        isRequired={false}
                        label="Co-Host/s"
                        props={{
                            placeholder: "Separate different organizations with a comma",
                            value: values.coHostedBy,
                        }}
                    />
                    <div className="row">
                        <label htmlFor="startDate" className="col-12 form-label">
                            Venue
                        </label>

                        <div className="col-12 col-md">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <FormInput
                                        type="text"
                                        className={"form-control form-input2"}
                                        name="country"
                                        onChange={onValueChange}
                                        isRequired={false}
                                        props={{
                                            placeholder: "Country",
                                            value: values.country,
                                        }}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <FormInput
                                        type="text"
                                        className={"form-control form-input2"}
                                        name="city"
                                        onChange={onValueChange}
                                        isRequired={false}
                                        props={{
                                            placeholder: "City",
                                            value: values.city,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <FormTextArea
                        type="text"
                        className={"form-control form-input2"}
                        name="description"
                        onChange={onValueChange}
                        inputWrapperClass={"form-group"}
                        isRequired={false}
                        label="Description"
                        props={{
                            rows: "3",
                            value: values.description,
                        }}
                    />

                    <FormSelect
                        onChange={onValueChange}
                        isRequired={false}
                        name="notifyUser"
                        label="Notification options"
                        defaultValue={values.notifyUser}
                    >
                        {notificationBefore.map(notif => (
                            <option value={notif.value} key={notif.value}>
                                {notif.title}
                            </option>
                        ))}
                    </FormSelect>

                    {/* ################################ */}
                    <div className="event-chractersctics mb-2">
                        <div className="event-chractersctics-wrap">
                            <div className="event-chractersctics-wrap">
                                <div className="event-chr-head">
                                    <div className="row">
                                        <div className="col-md-12 pr-md-0">
                                            <h6 className="heading-6 section__heading-custom  d-flex">
                                                <span>Event Characteristics</span>
                                                <small>Select all that apply.</small>
                                            </h6>
                                        </div>
                                    </div>

                                    <EventCharacteristics
                                        onValueChange={onValueChange}
                                        characteristics={values.characteristics}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <FormTextArea
                        label={"RSVP"}
                        inputWrapperClass="form-group pb-4"
                        name={"contactRsvp"}
                        isRequired={false}
                        onChange={onValueChange}
                        className="form-control form-input2"
                        type={"text"}
                        props={{
                            row: 3,
                            placeholder: "Write details on how to pose inquiries and confirm attendance",
                            value: values.contactRsvp,
                        }}
                    />
                    <div className="row align-items-md-center">
                        <label className="form-label col-12">Related Link</label>

                        <div className="col-12 col-md">
                            <div className="row">
                                {relatedLinks.map((item, idx) => (
                                    <Fragment key={idx}>
                                        <div className="col-md-6">
                                            <FormInput
                                                defaultValue={item.title}
                                                type={"text"}
                                                className={"form-control form-input2"}
                                                name={"title"}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => onLinksChange(e, idx)}
                                                props={{
                                                    placeholder: "Title",
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                defaultValue={item.url}
                                                type="url"
                                                className={"form-control form-input2"}
                                                name="url"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => onLinksChange(e, idx)}
                                                props={{
                                                    placeholder: "Url",
                                                }}
                                            />
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                    <SubEvents onSubEventsChange={onSubEventsChange} eventsData={values.subEvent} />

                    {/* <EventFormModerator /> */}
                </Form>
            </div>
        </div>
    )
}

export default CreateEventForm

export const processSubEvents = (subEvents: any[]) => {
    let se = []
    for (let i = 0; i < subEvents.length; i++) {
        if (subEvents[i]?.title?.trim()?.length > 0 || subEvents[i]?.description?.trim()?.length > 0) {
            se.push(subEvents[i])
        }
    }
    return se
}
