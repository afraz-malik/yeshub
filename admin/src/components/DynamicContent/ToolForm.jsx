import React from "react";
import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import { useState } from "react";
import FormBtns from "./FormBtns";
import { useEffect } from "react";

const ToolForm = ({ title, redirectUrl, fileType, handleSubmit, toggleHandler }) => {
    const [tool, setTool] = useState({
        title,
        redirectUrl,
        fileType,
    });

    useEffect(() => {
        setTool({ title, redirectUrl, fileType });
    }, [title, redirectUrl, fileType]);

    const handleChange = (event) => {
        setTool({
            ...tool,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ ...tool });
    };

    return (
        <Form onSubmit={onSubmit}>
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
                        <Label>Redirect Url</Label>
                        <Input
                            required
                            onChange={handleChange}
                            placeholder="Redirect Url"
                            name="redirectUrl"
                            type="url"
                            value={tool.redirectUrl}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <FormBtns onCancelClick={toggleHandler} />
        </Form>
    );
};

export default ToolForm;
