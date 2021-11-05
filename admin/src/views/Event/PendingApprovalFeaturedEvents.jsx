import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";

import GoBackButton from "../../components/GoBack/GoBackButton";
import PaginationTable from "../../components/Shared/PaginationTable";

import eventApi from "../../api/event";
import { MAIN_WEBSITE } from "../../config/config";
import usePagination from "../../hooks/usePagination";
import { confirmMessage } from "../../helper/mixed";
import paginationIndexCounter from "../../helper/paginationIndexCounter";

const PendingApprovalFeaturedEvents = () => {
    const [events, setEvents] = useState([]);
    const { currentPage, totalPages, changePagination, changeTotalPages } = usePagination();

    useEffect(() => {
        eventApi.fetchFeaturedPending(currentPage).then((response) => {
            setEvents(response.data.docs);
            changeTotalPages(response.data.totalPages);
        });
        // eslint-disable-next-line
    }, [currentPage]);

    const approveEvent = (id) => {
        eventApi.approveFeatured(id).then(() => {
            const e = events.filter((event) => event._id !== id);
            setEvents([...e]);
        });
    };

    const rejectEvent = (id) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        eventApi.rejectFeatured(id).then(() => {
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
                            <CardTitle tag="h4">Pending Featured Events</CardTitle>
                            <GoBackButton />
                        </CardHeader>
                        <CardBody>
                            <PaginationTable
                                currentPage={currentPage}
                                onPaginationClick={changePagination}
                                totalPages={totalPages}
                                responsive
                            >
                                <thead className="text-primary">
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Hosted By</th>
                                        <th>Location</th>
                                        <th>Contact Info</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.length > 0 ? (
                                        events.map((event, index) => (
                                            <tr key={event._id}>
                                                <td>{paginationIndexCounter(currentPage, index)}</td>
                                                <td>{event.eventName}</td>
                                                <td>{event.description}</td>
                                                <td>{event.hostedBy}</td>
                                                <td>
                                                    {event.venue},{event.city},{event.country}
                                                </td>
                                                <td>{event.contactRsvp}</td>

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
                                                        onClick={() => approveEvent(event._id)}
                                                    >
                                                        Approve
                                                    </Button>

                                                    <Button
                                                        color="danger"
                                                        size="sm"
                                                        className="ml-2"
                                                        onClick={() => rejectEvent(event._id)}
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
                            </PaginationTable>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PendingApprovalFeaturedEvents;
