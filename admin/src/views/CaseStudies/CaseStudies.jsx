import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

import caseStudiesApi from "../../api/case-studies";
import { MAIN_WEBSITE } from "../../config/config";
import PaginationTable from "../../components/Shared/PaginationTable";
import usePagination from "../../hooks/usePagination";
import paginationIndexCounter from "../../helper/paginationIndexCounter";

const CaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const { currentPage, totalPages, changePagination, changeTotalPages } = usePagination();

    useEffect(() => {
        caseStudiesApi.fetchAll(currentPage).then((response) => {
            setCaseStudies([...response.data.docs]);
            changeTotalPages(response.data.totalPages);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const markAsFeaturedCaseStudy = (id) => {
        caseStudiesApi.markFeatured(id).then(() => {
            const updatedCaseStudies = caseStudies.map((caseStudy) => {
                if (caseStudy._id === id) {
                    caseStudy.isFeaturedCaseStudy = true;
                }
                return caseStudy;
            });
            setCaseStudies([...updatedCaseStudies]);
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Case Studies</CardTitle>
                                <div>
                                    <Link className="btn btn-warning btn-sm mr-2" to="/admin/featured-case-studies">
                                        Featured CaseStudies
                                    </Link>
                                    <Link className="btn btn-info btn-sm" to="/admin/pending-case-studies">
                                        Pending CaseStudies
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <PaginationTable
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPaginationClick={changePagination}
                                >
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Likes</th>
                                            <th>DisLikes</th>
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
                                                    <td>{caseStudy.likes.length}</td>
                                                    <td>{(caseStudy.disliskes || []).length}</td>
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
                                                        {!caseStudy.isFeaturedCaseStudy ? (
                                                            <Button
                                                                onClick={() => markAsFeaturedCaseStudy(caseStudy._id)}
                                                                size="sm"
                                                                color="success"
                                                                className="mr-2"
                                                            >
                                                                Mark as Featured
                                                            </Button>
                                                        ) : null}
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
