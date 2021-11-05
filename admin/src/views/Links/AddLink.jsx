import React, { useState } from "react";
import { CardBody, Card, CardHeader, Row, Col, FormGroup, Input, CardTitle, Button, Label, Form } from "reactstrap";
import { useLocation, useHistory } from "react-router-dom";

import GoBackButton from "../../components/GoBack/GoBackButton";
import linkApi from "./../../api/link";
import { useEffect } from "react";

const AddModerator = () => {
    const { state } = useLocation();
    const { push } = useHistory();
    const [isEditing, setEditing] = useState(false);
    const [link, setLink] = useState({
        title: "",
        link: "",
    });

    useEffect(() => {
        if (state && state.link) {
            setEditing(true);
            setLink({
                link: state.link.link || "",
                title: state.link.title || "",
            });
        }
    }, [state]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLink({
            ...link,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            linkApi.update(link, state.link._id).then(() => {
                push("/admin/links");
            });
            return;
        }
        linkApi.add(link).then(() => {
            push("/admin/links");
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader className="d-flex justify-content-between">
                                <CardTitle tag="h5">Add Link</CardTitle>
                                <GoBackButton />
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col className="pr-1">
                                            <FormGroup>
                                                <Label>Title</Label>
                                                <Input
                                                    required
                                                    value={link.title}
                                                    onChange={handleChange}
                                                    placeholder="Title"
                                                    name="title"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1">
                                            <FormGroup>
                                                <Label>Link</Label>
                                                <Input
                                                    required
                                                    placeholder="https://www.pofe.ws"
                                                    value={link.link}
                                                    onChange={handleChange}
                                                    name="link"
                                                    type="url"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                {isEditing ? "Update" : "Add"} Link
                                            </Button>
                                        </div>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default AddModerator;
