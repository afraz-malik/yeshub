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
    FormText,
} from "reactstrap";
import { PictureIcon } from "../../assets/img/icons";
import { useLocation, useHistory } from "react-router-dom";

import awardApi from "../../api/award";
import converToFormData from "../../helper/convertToFormData";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { WEBSITE_URL } from "../../config/config";

const Awards = () => {
    const [award, setAward] = useState({});
    const [imagePreview, setImagePreview] = useState(false);
    let [descKey, setDescKey] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    const { state } = useLocation();
    const history = useHistory();

    useEffect(() => {
        if (state && state.award) {
            setAward({
                ...state.award,
            });
            setIsEditing(true);
            setImagePreview(`${WEBSITE_URL}/${state.award.images[0]}`);
        }
    }, [state]);

    const handleChange = (e) => {
        setAward({ ...award, [e.target.name]: e.target.value });
    };

    const removeImage = (e) => {
        e.preventDefault();
        setAward({ ...award, images: null });
        setImagePreview(undefined);
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setAward({ ...award, images: event.target.files[0] });

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result?.toString());
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let formData = {};
        let form = { ...award };

        if (imagePreview) {
            form["imageUploaded"] = true;
        }
        formData = converToFormData(form);

        if (isEditing) {
            handleEditMode(formData);
        } else {
            awardApi.add(formData).then((resp) => {
                history.push("/admin/awards");
            });
        }
    };

    const handleEditMode = (form) => {
        awardApi.update(form).then((resp) => {
            history.push("/admin/awards");
        });
    };

    return (
        <React.Fragment>
            <div className="content award__container">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <div className="d-flex align-items-center jutify-space-between">
                                    <CardTitle tag="h5">Awards</CardTitle>

                                    <GoBackButton />
                                </div>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleFormSubmit}>
                                    <Row>
                                        <Col>
                                            <label htmlFor="eventImage" className="d-block w-100 award-image-label">
                                                <div id="drop-region">
                                                    {imagePreview ? (
                                                        <div id="image-preview" className="pointer-events-none">
                                                            <div
                                                                className="close__icon pointer-events-all"
                                                                onClick={removeImage}
                                                            >
                                                                X
                                                            </div>
                                                            <img
                                                                className="pointer-events-all"
                                                                src={imagePreview}
                                                                alt=""
                                                            />
                                                        </div>
                                                    ) : (
                                                        <React.Fragment>
                                                            <div className="drop-image">
                                                                <div className="feature_link">{PictureIcon}</div>
                                                            </div>
                                                            <div className="drop-message">Click to upload</div>
                                                        </React.Fragment>
                                                    )}

                                                    <input
                                                        className="file__input"
                                                        type="file"
                                                        name="image"
                                                        id="eventImage"
                                                        onChange={onImageChange}
                                                    />
                                                </div>
                                            </label>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={award.awardName}
                                                    required
                                                    placeholder="Name"
                                                    name="awardName"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label>Points</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={award.cost}
                                                    required
                                                    placeholder="Points"
                                                    name="cost"
                                                    type="number"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Label>Description</Label>
                                            <FormGroup>
                                                <textarea
                                                    key={descKey}
                                                    onChange={handleChange}
                                                    value={award.awardDescription || ""}
                                                    required
                                                    placeholder="Description"
                                                    name="awardDescription"
                                                    className="awards__ta"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                Save
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

export default Awards;
