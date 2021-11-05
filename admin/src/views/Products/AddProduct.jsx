import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { CardBody, Card, CardHeader, Row, Col, FormGroup, Input, CardTitle, Form, Button, Label } from "reactstrap";
import productApi from "./../../api/product";

const AddProduct = () => {
    const [values, setValues] = useState({
        title: "",
        shortDescription: "",
        videoUrl: "",
        description: "",
        sections: [],
    });
    const [isEditing, toggleEditing] = useState(false);
    const { replace } = useHistory();
    const { state } = useLocation();

    useEffect(() => {
        if (state && state.product) {
            toggleEditing(true);
            setValues({ ...state.product });
        }
    }, [state]);

    const onSubmit = (event) => {
        event.preventDefault();

        if (isEditing) {
            productApi.update(values, values._id).then(() => {
                replace("/admin/products");
            });
        } else {
            productApi.add(values).then(() => {
                replace("/admin/products");
            });
        }
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">{isEditing ? "Update" : "Add"} Products</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Products</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    name="title"
                                                    type="select"
                                                    value={values.title}
                                                >
                                                    <option value="yesme">YES!ME</option>
                                                    <option value="yesacademy">YES!ACADEMY</option>
                                                    <option value="yesntel">YES!NTEL</option>
                                                    <option value="yescnxt">YES!CNXT</option>
                                                    <option value="tessa">YES!TESSA</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label>Title</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    placeholder="Title"
                                                    name="shortDescription"
                                                    type="text"
                                                    value={values.shortDescription}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label>Video Link</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    placeholder="Video Link"
                                                    name="videoUrl"
                                                    type="url"
                                                    value={values.videoUrl}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Description</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    placeholder="Description"
                                                    name="description"
                                                    type="textarea"
                                                    value={values.description}
                                                    maxLength={250}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                {isEditing ? "Update" : "Add"} Profile
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

export default AddProduct;
