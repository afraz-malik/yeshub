import React, { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { CardBody, Card, CardHeader, Row, Col, FormGroup, Input, CardTitle, Form, Label, Button } from "reactstrap";
import { useLocation, useParams, useHistory } from "react-router-dom";

import sectionApi from "../../api/product-section";
import { EDITOR_CONFIG } from "../../config/config";

const AddProductSection = () => {
    const editor = useRef(null);
    const [isEditing, setEditing] = useState(false);
    const { replace } = useHistory();
    const { state } = useLocation();
    const { id: pid } = useParams();
    const [body, setBody] = useState("");
    const [section, setSection] = useState({
        title: "",
        productId: pid,
    });

    useEffect(() => {
        if (state && state.section) {
            setSection({ ...state.section });
            setBody(state.section.body);
            setEditing(true);
        }
    }, [state]);

    const handleChange = (event) => {
        setSection({ ...section, [event.target.name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            sectionApi.update({ ...section, body }, pid, section._id).then(() => {
                replace("/admin/products");
            });
        } else {
            sectionApi.add({ ...section, body }).then(() => {
                replace("/admin/products");
            });
        }
    };

    const onSectionDescriptionChange = (content) => {
        setBody(content);
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">{isEditing ? "Update" : "Add"} Section</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Title</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    placeholder="Title"
                                                    name="title"
                                                    type="text"
                                                    value={section.title}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Description</Label>
                                                <JoditEditor
                                                    ref={editor}
                                                    value={body}
                                                    config={EDITOR_CONFIG}
                                                    onChange={onSectionDescriptionChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                {isEditing ? "Update" : "Add"} Section
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

export default AddProductSection;
