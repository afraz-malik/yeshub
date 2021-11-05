import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";
import caseStudiesApi from "../../api/case-studies";
import { MAIN_WEBSITE } from "../../config/config";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { confirmAlert } from "react-confirm-alert";
import { confirmMessage } from "../../helper/mixed";

const FeaturedCaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState([]);

    useEffect(() => {
        caseStudiesApi.featured().then((response) => {
            setCaseStudies([...response.data]);
        });
    }, []);

    const unMarkFeatured = (id) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        caseStudiesApi.unMarkFeatured(id).then(() => {
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
                                <CardTitle tag="h4">Featured Case Studies</CardTitle>
                                <GoBackButton />
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Total Comments</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {caseStudies.length > 0 ? (
                                            caseStudies.map((caseStudy, index) => (
                                                <tr key={caseStudy._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{caseStudy.title}</td>
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
                                                            onClick={() => unMarkFeatured(caseStudy._id)}
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
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default FeaturedCaseStudies;
