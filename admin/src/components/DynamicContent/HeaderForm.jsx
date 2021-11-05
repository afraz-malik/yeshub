import React, { useState, useEffect } from "react";
import { Row, Col, FormGroup, Label, Input, Form, CustomInput } from "reactstrap";
import FormBtns from "./FormBtns";

const HeaderForm = ({
    title = "",
    videoUrl = "",
    shortDescription = "",
    description = "",
    image = "",
    isStage = false,
    toggleEdit,
    handleSubmit,
}) => {
    const [values, setValues] = useState({
        title,
        videoUrl,
        image,
        shortDescription,
        description,
    });

    useEffect(() => {
        if (
            title !== values.title ||
            videoUrl !== values.videoUrl ||
            shortDescription !== values.shortDescription ||
            description !== values.body ||
            image !== values.image
        ) {
            if (isStage) {
                setValues({
                    title,
                    image,
                    shortDescription,
                    description,
                });
            } else {
                setValues({
                    title,
                    videoUrl,
                    shortDescription,
                    description,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [title, videoUrl, shortDescription, description]);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleImageChange = (event) => {
        if (event.target.files.length > 0) {
            setValues({
                ...values,
                [event.target.name]: event.target.files[0],
            });
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ ...values });
    };

    return (
        <React.Fragment>
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
                                value={values.title}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>{isStage ? "Image URL" : "Video URL"}</Label>
                            {!isStage ? (
                                <Input
                                    required
                                    onChange={handleChange}
                                    placeholder="Video URL"
                                    name="videoUrl"
                                    type="url"
                                    value={values.videoUrl}
                                />
                            ) : (
                                <CustomInput
                                    id="mainImage"
                                    onChange={handleImageChange}
                                    type="file"
                                    name="image"
                                    className="custom-file-input file__input"
                                />
                            )}
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
                            />
                        </FormGroup>
                    </Col>
                </Row>
                {!isStage && (
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="animationFile">Animation File</Label>
                                <CustomInput
                                    id="animationFile"
                                    onChange={handleImageChange}
                                    type="file"
                                    name="file"
                                    accept="image/gif,image/webp"
                                    className="custom-file-input file__input"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                )}
                <FormBtns onCancelClick={toggleEdit} />
            </Form>
        </React.Fragment>
    );
};

export default HeaderForm;
