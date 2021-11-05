import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Button } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";

import eventApi from "../../api/event";
import { MAIN_WEBSITE } from "../../config/config";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { confirmMessage } from "../../helper/mixed";

const PendingApprovalEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventApi.fetchPending().then((response) => {
            setEvents(response.data);
        });
    }, []);

    const approveEvent = (pId, id) => {
        eventApi.approve(pId, id).then(() => {
            const e = events.filter((event) => event._id !== id);
            setEvents([...e]);
        });
    };

    const rejectEvent = (pId, id) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        eventApi.reject(pId, id).then(() => {
                            const e = events.filter((event) => event._id !== id);
                            setEvents([...e]);
                        });
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader className="d-flex justify-content-between align-items-center">
                            <CardTitle tag="h4">Pending Events</CardTitle>
                            <GoBackButton />
                        </CardHeader>
                        <CardBody>
                            <Table responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Contributor</th>
                                        <th>Hosted By</th>
                                        <th>Related Links</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.length > 0 ? (
                                        events.map((event, index) => (
                                            <tr key={event._id}>
                                                <td>{index + 1}</td>
                                                <td>{event.eventName}</td>
                                                <td>{event.author.userName}</td>
                                                <td>{event.hostedBy}</td>
                                                <td>
                                                    {event.link.map((l) => (
                                                        <a
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            key={l._id}
                                                            href={l.url}
                                                        >
                                                            {l.title}
                                                        </a>
                                                    ))}
                                                </td>

                                                <td className="text-right">
                                                    <a
                                                        href={`${MAIN_WEBSITE}event/details/${event._id}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="btn btn-sm btn-primary mr-2"
                                                    >
                                                        Visit Page
                                                    </a>

                                                    <Button
                                                        color="info"
                                                        size="sm"
                                                        onClick={() => approveEvent(event.parentID, event._id)}
                                                    >
                                                        Approve
                                                    </Button>

                                                    <Button
                                                        color="danger"
                                                        size="sm"
                                                        className="ml-2"
                                                        onClick={() => rejectEvent(event.parentID, event._id)}
                                                    >
                                                        Reject
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center" colSpan={999}>
                                                No Record Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PendingApprovalEvents;
