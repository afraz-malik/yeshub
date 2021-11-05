import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Form, Row, Col, FormGroup, Label, Input } from "reactstrap";
import FormBtns from "./FormBtns";
import { EDITOR_CONFIG } from "../../config/config";

const SectionForm = ({ title, body: propBody, toggleEdit, handleSubmit }) => {
    const editor = useRef(null);
    const [section, setSections] = useState({ title });

    const [body, setBody] = useState(propBody);

    const handleChange = (event) => {
        setSections({
            ...section,
            [event.target.name]: event.target.value,
        });
    };

    const onSectionDescriptionChange = (body) => {
        setBody(body);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ ...section, body });
    };

    return (
        <React.Fragment>
            <Form onSubmit={onSubmit}>
                <div>
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
                                    config={EDITOR_CONFIG}
                                    value={body}
                                    onChange={onSectionDescriptionChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </div>

                <FormBtns onCancelClick={toggleEdit} />
            </Form>
        </React.Fragment>
    );
};

export default SectionForm;
