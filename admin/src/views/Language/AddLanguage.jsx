import React from "react";
import { CardBody, Card, CardHeader, Row, Col, FormGroup, Input, CardTitle, Form, Button, Label } from "reactstrap";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import languageApi from "../../api/language";

const AddLanguage = () => {
    const { state } = useLocation();
    const { replace } = useHistory();
    const [isEditing] = useState(state && state.language ? true : false);
    const [values, setValues] = useState({
        title: "",
        shortCode: "",
        display: false,
        stageDisplay: false,
    });

    useEffect(() => {
        if (state && state.language) {
            setValues({
                id: state.language._id,
                title: state.language.title,
                display: !!state.language.display,
                stageDisplay: !!state.language.stageDisplay,
            });
        }
    }, [state]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setValues({ ...values, [name]: type === "checkbox" ? checked : value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            languageApi
                .update(
                    {
                        display: values.display,
                        title: values.title,
                        shortCode: values.shortCode,
                        stageDisplay: values.stageDisplay,
                    },
                    values.id
                )
                .then(() => replace("/admin/language"));
        } else {
            languageApi.create(values).then(() => replace("/admin/language"));
        }
    };

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card className="card-user">
                        <CardHeader>
                            <GoBackButton floatRight />
                            <CardTitle tag="h5">{isEditing ? "Update" : "Add"} Language</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={onSubmit}>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Title</Label>
                                            <Input
                                                onChange={handleChange}
                                                value={values.title}
                                                required
                                                placeholder="Title"
                                                name="title"
                                                type="text"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                {!isEditing ? (
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Short Code</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={values.shortCode}
                                                    required
                                                    placeholder="Short Code"
                                                    name="shortCode"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ) : null}

                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Input
                                                onChange={handleChange}
                                                checked={values.display}
                                                value={values.display}
                                                type="checkbox"
                                                name="display"
                                                id="display"
                                                className="ml-2"
                                            />
                                            <label htmlFor="display" className="ml-4 pl-1">
                                                Product
                                            </label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Input
                                                onChange={handleChange}
                                                checked={values.stageDisplay}
                                                value={values.stageDisplay}
                                                type="checkbox"
                                                name="stageDisplay"
                                                id="stageDisplay"
                                                className="ml-2"
                                            />
                                            <label htmlFor="stageDisplay" className="ml-4 pl-1">
                                                Stage
                                            </label>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <div className="update ml-auto mr-auto">
                                        <Button className="btn-round" color="primary" type="submit">
                                            {isEditing ? "Update" : "Add"} Language
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AddLanguage;
