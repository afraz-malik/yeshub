import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button, Table } from "reactstrap";
import { Link } from "react-router-dom";

import bannedEmailApi from "./../../api/banned-emails";

const BannedEmails = () => {
    const [emails, setEmails] = useState([]);

    useEffect(() => {
        bannedEmailApi.fetch().then((response) => {
            setEmails(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const deleteEmail = (id) => {
        bannedEmailApi.delete(id).then(() => {
            const e = emails.filter((email) => email._id !== id);
            setEmails(e);
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Banned Emails</CardTitle>
                                <div>
                                    <Link className="btn btn-sm btn-primary" to="/admin/banned-email/create-update">
                                        Add Banned Email
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Table>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Email</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {emails.map((email, index) => (
                                            <tr key={email._id}>
                                                <td>{index + 1}</td>
                                                <td>{email.email}</td>
                                                <td className="text-right">
                                                    <Link
                                                        className="btn btn-info btn-sm mr-2"
                                                        to={{
                                                            pathname: "/admin/banned-email/create-update",
                                                            state: { email },
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Button
                                                        size="sm"
                                                        color="danger"
                                                        onClick={() => deleteEmail(email._id)}
                                                    >
                                                        Delete
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

export default BannedEmails;
