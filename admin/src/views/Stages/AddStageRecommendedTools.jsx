import React, { useState, useEffect } from "react";
import {
    CardBody,
    Card,
    CardHeader,
    Row,
    Col,
    FormGroup,
    Input,
    CardTitle,
    Form,
    Button,
    Label,
    CustomInput,
} from "reactstrap";
import { useLocation, useParams, useHistory } from "react-router-dom";

import recommendedToolApi from "../../api/stage-recommended-tool";
import convertToFormData from "../../helper/convertToFormData";

const AddRecommendedTools = () => {
    const [isEditing, setEditing] = useState(false);
    const { state } = useLocation();
    const { id: stgId } = useParams();
    const { goBack, replace } = useHistory();

    const [tool, setTool] = useState({
        title: "",
        redirectUrl: "",
        file: "",
        fileType: "image",
        stageId: stgId,
    });

    useEffect(() => {
        if (!stgId) goBack();

        if (state && state.tool) {
            setTool({ ...state.tool });
            setEditing(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, stgId]);

    const handleChange = (event) => {
        setTool({
            ...tool,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        if (event.target.files) {
            setTool({
                ...tool,
                file: event.target.files[0],
            });
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const data = convertToFormData(tool);

        if (isEditing) {
            recommendedToolApi.update(data, stgId, state.tool._id).then(() => {
                replace("/admin/stages");
            });
        } else {
            recommendedToolApi.add(data, stgId).then(() => {
                replace("/admin/stages");
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
                                        <Col>
                                            <FormGroup>
                                                <Label>File</Label>
                                                <CustomInput
                                                    id="mainImage"
                                                    onChange={handleImageChange}
                                                    type="file"
                                                    name="file"
                                                    className="custom-file-input file__input"
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

export default AddRecommendedTools;
