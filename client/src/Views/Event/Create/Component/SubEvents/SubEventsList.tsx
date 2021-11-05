import * as React from "react"
import { DragDropContext, DropResult, Droppable, Draggable } from "react-beautiful-dnd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

import FormTextArea from "../../../../../Components/Form/FormTextArea"
import TimeInput from "../../../../../Shared/TimeInput"
import DateInput from "../../../../../Shared/DateInput"
import { SubEvent } from "../../../../../Models/User/IEvent"
import FormInput from "../../../../../Components/Form/FormInput"

export interface SubEventsProps {
    events: Partial<SubEvent>[]
    onSubEventsTimeChange: (name: string, index: number, time: Date | null) => void
    onSubEventsChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void
    deleteSubEvent: (index: number) => void
    onDragEnd: (result: DropResult) => void
}

const SubEventsList: React.FC<SubEventsProps> = ({
    events,
    onSubEventsTimeChange,
    onSubEventsChange,
    deleteSubEvent,
    onDragEnd,
}) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {events.map((event, idx) => (
                            <Draggable index={idx} key={event._id} draggableId={`dragdrop-${idx}`}>
                                {provid => (
                                    <div
                                        ref={provid.innerRef}
                                        key={event._id}
                                        className="subevent__form-item"
                                        {...provid.draggableProps}
                                        {...provid.dragHandleProps}
                                    >
                                        <div className="close__icon text-right mb-2">
                                            <FontAwesomeIcon
                                                onClick={() => deleteSubEvent(idx)}
                                                icon={faTimes}
                                                className="icon"
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <FormInput
                                                    name="title"
                                                    label="Title"
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                        onSubEventsChange(event, idx)
                                                    }
                                                    props={{
                                                        value: event.title,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <label htmlFor="" className="form-label">
                                                        Start Date
                                                    </label>
                                                    <DateInput
                                                        name="date"
                                                        value={event.date}
                                                        onChange={date => onSubEventsTimeChange("date", idx, date)}
                                                    />
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
                                                        value={event.startTime}
                                                        onChange={date => onSubEventsTimeChange("startTime", idx, date)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md">
                                                <div className="form-group">
                                                    <TimeInput
                                                        name="endTime"
                                                        value={event.endTime}
                                                        onChange={date => onSubEventsTimeChange("endTime", idx, date)}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <FormTextArea
                                            type="text"
                                            className={"form-control form-input2"}
                                            name="description"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                onSubEventsChange(e, idx)
                                            }
                                            inputWrapperClass={"form-group mb-0"}
                                            isRequired={false}
                                            label="Description"
                                            props={{
                                                rows: "3",
                                                placeholder: "Description",
                                                value: event.description,
                                            }}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default SubEventsList
