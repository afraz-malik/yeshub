import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button, Table } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";

import { MAIN_WEBSITE } from "../../config/config";
import eventApi from "../../api/event";
import { Link } from "react-router-dom";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { confirmMessage } from "../../helper/mixed";

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        eventApi.fetchFeatured().then((response) => {
            setEvents([...response.data]);
        });
    }, []);

    const removeFeaturedEvent = (id) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        eventApi.unMarkFeatured(id).then(() => {
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
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Featured Events</CardTitle>
                                <div>
                                    <Link
                                        to="/admin/featured-events/pending-approval"
                                        className="btn btn-sm btn-primary"
                                    >
                                        Pending Approval
                                    </Link>
                                    <GoBackButton />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Hosted By</th>
                                            <th>Location</th>
                                            <th>Contact Info</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {events.length > 0 ? (
                                            events.map((event, index) => (
                                                <tr key={event._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{event.eventName}</td>
                                                    <td>{event.description}</td>
                                                    <td>{event.hostedBy}</td>
                                                    <td>
                                                        {event.venue},{event.city},{event.country}
                                                    </td>
                                                    <td>{event.contactRsvp}</td>
                                                    <td>
                                                        <a
                                                            href={`${MAIN_WEBSITE}event/details/${event._id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-sm btn-primary mr-2"
                                                        >
                                                            Visit Page
                                                        </a>
                                                        <Button
                                                            onClick={() => removeFeaturedEvent(event._id)}
                                                            size="sm"
                                                            color="danger"
                                                            className="mr-2"
                                                        >
                                                            Remove
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
        </React.Fragment>
    );
};

export default Events;
