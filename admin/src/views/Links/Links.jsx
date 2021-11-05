import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";

import linkApi from "../../api/link";
import { Link } from "react-router-dom";

const PendingRequests = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        linkApi.fetch().then((response) => {
            setLinks(response.data);
        });
    }, []);

    const deleteLink = (id) => {
        linkApi.delete(id).then(() => {
            const li = links.filter((link) => link._id !== id);
            setLinks(li);
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Footer Links</CardTitle>
                                <Link className="btn btn-info btn-sm" to="/admin/links/create-update">
                                    Add Link
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Link</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {links.map((link, index) => (
                                            <tr key={link._id}>
                                                <td>{index + 1}</td>
                                                <td>{link.title}</td>
                                                <td>
                                                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                                                        {link.link}
                                                    </a>
                                                </td>

                                                <td className="text-right">
                                                    <Link
                                                        className="mr-2 btn btn-sm btn-info"
                                                        to={{ pathname: "/admin/links/create-update", state: { link } }}
                                                    >
                                                        Edit
                                                    </Link>

                                                    <Button
                                                        onClick={() => deleteLink(link._id)}
                                                        size="sm"
                                                        color="danger"
                                                    >
                                                        Reject
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
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

export default PendingRequests;
