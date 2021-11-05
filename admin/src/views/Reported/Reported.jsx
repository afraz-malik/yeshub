import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

import ReportedItem from "./ReportedItem";
import eventApi from "../../api/event";
import PaginationTable from "../../components/Shared/PaginationTable";
import usePagination from "../../hooks/usePagination";

const Reported = () => {
    const [reported, setReported] = useState([]);
    const { currentPage, totalPages, changePagination, changeTotalPages } = usePagination();

    useEffect(() => {
        eventApi.fetchReported(currentPage).then((response) => {
            setReported([...response.data.docs]);
            changeTotalPages(response.data.totalPages);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const deleteReport = (id) => {
        const ri = reported.filter((report) => report._id !== id);
        setReported(ri);
    };

    /**
     *
     * @param {string} rId report id
     * @param {string} itemId post/event/comment id
     * @param {'event'|'post'|'comment'} type item type event|post
     */
    const onDeleteItem = (rId, itemId, type) => {
        if (type === "comment") {
            eventApi.deleteComment(itemId).then(() => {
                deleteReport(rId);
            });;
        } else {
            eventApi.deleteReportedItem(itemId, type).then(() => {
                deleteReport(rId);
            });
        }

        eventApi.actionPerformed(itemId).then(response => console.log(response), error => console.log(error))
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
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Reported</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <PaginationTable
                                    currentPage={currentPage}
                                    onPaginationClick={changePagination}
                                    totalPages={totalPages}
                                >
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Reason</th>
                                            <th>Text</th>
                                            <th>Created By</th>
                                            <th>Type</th>
                                            <th>Reported By</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reported.map((report, index) => (
                                            <ReportedItem
                                                key={report._id}
                                                index={index}
                                                onDeleteReport={onDeleteReport}
                                                onDeleteItem={onDeleteItem}
                                                report={report}
                                            />
                                        ))}
                                    </tbody>
                                </PaginationTable>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default Reported;
