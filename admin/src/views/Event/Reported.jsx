import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, Button } from "reactstrap";

import eventApi from "../../api/event";
import { MAIN_WEBSITE } from "../../config/config";

const ReportedEvent = (event) => (
    <React.Fragment>
        <td>{event.event.eventName}</td>
        <td>{event.event.author ? event.event.author.userName : ""}</td>
        <td>Event</td>
    </React.Fragment>
);

const ReportedPost = (post) => (
    <React.Fragment>
        <td>{post.post.title}</td>
        <td>{post.post.author ? post.post.author.userName : ""}</td>
        <td>Post</td>
    </React.Fragment>
);

const ReportedEvents = () => {
    const [reported, setReported] = useState([]);

    useEffect(() => {
        eventApi.fetchReported().then((response) => {
            setReported([...response.data]);
        });
    }, []);

    const deleteReport = (id) => {
        const ri = reported.filter((report) => report._id !== id);
        setReported(ri);
    };

    /**
     *
     * @param {string} rId report id
     * @param {string} itemId post/event id
     * @param {'event'|'post'} type item type event|post
     */
    const onDeleteItem = (rId, itemId, type) => {
        eventApi.deleteReportedItem(itemId, type).then(() => {
            deleteReport(rId);
        });
    };

    /**
     *
     * @param {string} id report id
     */
    const onDeleteReport = (id) => {
        eventApi.deleteReported(id).then(() => {
            deleteReport(id);
        });
    };

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Reported Events</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Reason</th>
                                            <th>Name</th>
                                            <th>Created By</th>
                                            <th>Type</th>
                                            <th>Reported By</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reported.length > 0 ? (
                                            reported.map(
                                                (report, index) =>
                                                    (report.post || report.event) && (
                                                        <tr key={report._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{report.reason}</td>
                                                            {report.event ? (
                                                                <ReportedEvent event={report.event} />
                                                            ) : (
                                                                report.post && <ReportedPost post={report.post} />
                                                            )}
                                                            <td>{report.reportedBy.userName}</td>
                                                            <td className="text-right">
                                                                <a
                                                                    href={`${MAIN_WEBSITE}${
                                                                        report.event
                                                                            ? `event/details/${report.event._id}`
                                                                            : report.post &&
                                                                              `post/details/${report.post._id}`
                                                                    }`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-sm btn-primary mr-1"
                                                                >
                                                                    Visit Page
                                                                </a>

                                                                <Button
                                                                    onClick={() =>
                                                                        onDeleteItem(
                                                                            report._id,
                                                                            (report.event && report.event._id) ||
                                                                                (report.post && report.post._id),
                                                                            report.event ? "event" : "post"
                                                                        )
                                                                    }
                                                                    color="danger"
                                                                    size="sm"
                                                                    className="mr-1"
                                                                >
                                                                    Delete {report.event ? "Event" : "Post"}
                                                                </Button>

                                                                <Button
                                                                    onClick={() => onDeleteReport(report._id)}
                                                                    color="danger"
                                                                    size="sm"
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    )
                                            )
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
        </>
    );
};

export default ReportedEvents;
