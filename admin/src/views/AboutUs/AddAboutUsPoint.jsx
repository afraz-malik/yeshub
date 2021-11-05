import React, { useState, useEffect } from "react";
import JoditEditor from "jodit-react";

import { CardBody, Card, CardHeader, Row, Col, FormGroup, CardTitle, Form, Button, Label } from "reactstrap";
import aboutUsApi from "../../api/about-us";
import { useLocation, useHistory } from "react-router-dom";

const AddAboutUsPoint = () => {
    const { state } = useLocation();
    const history = useHistory();
    const [isEditing, toggleIsEditing] = useState(false);

    const [content, setContent] = useState("");

    const handleChange = (content) => {
        setContent(content);
    };

    useEffect(() => {
        console.log("State", state);

        if (state && state.point) {
            setContent(state.point.content);
            toggleIsEditing(true);
        }
    }, [state]);

    const onSubmit = (event) => {
        event.preventDefault();

        if (isEditing) {
            aboutUsApi.updatePoint({ content, pointID: state.point._id }, state.aboutId).then(() => {
                history.replace("/admin/about-us");
            });
        } else {
            aboutUsApi.addPoint({ content }, state.aboutId).then(() => {
                history.replace("/admin/about-us");
            });
        }
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">About Us Point</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label>Point</Label>
                                                <JoditEditor onChange={handleChange} value={content} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                {isEditing ? "Update" : "Create"}
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

export default AddAboutUsPoint;
