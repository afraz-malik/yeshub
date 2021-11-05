import React, { useState, useEffect } from "react";
import { CardBody, Card, CardHeader, Row, Col, CardTitle, Table, Button } from "reactstrap";

import languageApi from "../../api/language";
import { Link } from "react-router-dom";

const Language = () => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        languageApi.fetch().then((response) => setLanguages(response.data));
    }, []);

    const deleteLanguage = (id) => {
        languageApi.delete(id).then(() => {
            const ls = languages.filter((language) => language._id !== id);
            setLanguages(ls);
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader className="d-flex align-items-center justify-content-between">
                                <CardTitle tag="h5">Languages</CardTitle>
                                {process.env.REACT_APP_ENV === "local" ? (
                                    <Link to="/admin/language/create-update" className="btn btn-info btn-sm">
                                        Add Language
                                    </Link>
                                ) : null}
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Product</th>
                                            <th>Stage</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {languages.map((language, index) => (
                                            <tr key={language._id}>
                                                <td>{index + 1}</td>
                                                <td>{language.title}</td>
                                                <td>{language.display ? "Public" : "Private"}</td>
                                                <td>{language.stageDisplay ? "Public" : "Private"}</td>
                                                <td className="text-right">
                                                    <Link
                                                        className="btn btn-sm btn-info mr-2"
                                                        to={{
                                                            pathname: "/admin/language/create-update",
                                                            state: { language },
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    {process.env.REACT_APP_ENV === "local" ? (
                                                        <Button
                                                            color="danger"
                                                            size="sm"
                                                            onClick={() => deleteLanguage(language._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    ) : null}
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

export default Language;
