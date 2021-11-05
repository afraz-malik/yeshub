import React, { useState, useEffect } from "react";
import { CardBody, Card, CardHeader, Row, Col, FormGroup, Input, CardTitle, Form, Button, Label } from "reactstrap";
import { useLocation, useParams, useHistory } from "react-router-dom";

import recommendedToolApi from "../../api/product-recommended-tool";

const AddRecommendedTools = () => {
    const [isEditing, setEditing] = useState(false);
    const { state } = useLocation();
    const { id } = useParams();
    const { goBack, replace } = useHistory();
    const youTubeRegex = new RegExp(
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
    );

    const [tool, setTool] = useState({
        title: "",
        redirectUrl: "",
        fileType: "image",
        productId: id,
    });

    useEffect(() => {
        if (youTubeRegex.test(tool.redirectUrl)) {
            setTool({ ...tool, fileType: "video" });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tool.redirectUrl]);

    useEffect(() => {
        if (!id) goBack();

        if (state && state.tool) {
            setTool({ ...state.tool });
            setEditing(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, id]);

    const handleChange = (event) => {
        setTool({
            ...tool,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (isEditing) {
            recommendedToolApi.update(tool, id, state.tool._id).then(() => {
                replace("/admin/products");
            });
        } else {
            recommendedToolApi.add(tool, id).then(() => {
                replace("/admin/products");
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
                                <CardTitle tag="h5">{isEditing ? "Update" : "Add"} Resources</CardTitle>
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
                                                    value={tool.title}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>URL</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    placeholder="URL"
                                                    name="redirectUrl"
                                                    type="url"
                                                    value={tool.redirectUrl}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>File Type</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    placeholder="Type"
                                                    name="fileType"
                                                    type="select"
                                                    value={tool.fileType}
                                                >
                                                    <option value="video">Video</option>
                                                    <option value="link">Link</option>
                                                    <option value="pdf">PDF</option>
                                                </Input>
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

export default AddRecommendedTools;
