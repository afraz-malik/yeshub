import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";

import caseStudiesApi from "../../api/case-studies";
import { MAIN_WEBSITE } from "../../config/config";
import PaginationTable from "../../components/Shared/PaginationTable";
import usePagination from "../../hooks/usePagination";
import paginationIndexCounter from "../../helper/paginationIndexCounter";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { confirmAlert } from "react-confirm-alert";
import { confirmMessage } from "../../helper/mixed";

const CaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const { currentPage, totalPages, changePagination, changeTotalPages } = usePagination();

    useEffect(() => {
        caseStudiesApi.fetchInReview(currentPage).then((response) => {
            setCaseStudies([...response.data.docs]);
            changeTotalPages(response.data.totalPages);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const acceptStudy = (id) => {
        caseStudiesApi.approve(id).then(() => {
            const filteredCaseStudies = caseStudies.filter((caseStudy) => caseStudy._id !== id);
            setCaseStudies([...filteredCaseStudies]);
        });
    };

    const rejectStudy = (id) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        caseStudiesApi.reject(id).then(() => {
                            const filteredCaseStudies = caseStudies.filter((caseStudy) => caseStudy._id !== id);
                            setCaseStudies([...filteredCaseStudies]);
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
                                <CardTitle tag="h4">Pending Case Studies</CardTitle>
                                <GoBackButton />
                            </CardHeader>
                            <CardBody>
                                <PaginationTable
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPaginationClick={changePagination}
                                >
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Total Comments</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {caseStudies.length > 0 ? (
                                            caseStudies.map((caseStudy, index) => (
                                                <tr key={caseStudy._id}>
                                                    <td>{paginationIndexCounter(currentPage, index)}</td>
                                                    <td>{caseStudy.title}</td>
                                                    <td>{caseStudy.author.userName}</td>
                                                    <td>{caseStudy.totalComments}</td>
                                                    <td className="text-right">
                                                        <a
                                                            href={`${MAIN_WEBSITE}post/details/${caseStudy._id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="btn btn-sm btn-primary mr-2"
                                                        >
                                                            Visit Page
                                                        </a>
                                                        <Button
                                                            onClick={() => acceptStudy(caseStudy._id)}
                                                            size="sm"
                                                            color="success"
                                                            className="mr-2"
                                                        >
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            onClick={() => rejectStudy(caseStudy._id)}
                                                            size="sm"
                                                            color="danger"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={999} className="text-center">
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
        </React.Fragment>
    );
};

export default CaseStudies;
