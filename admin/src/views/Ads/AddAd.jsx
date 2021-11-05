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

import adApi from "../../api/ad";
import { useLocation, useHistory } from "react-router-dom";
import converToFormData from "../../helper/convertToFormData";
import GoBackButton from "../../components/GoBack/GoBackButton";

const AddAd = () => {
    const { state } = useLocation();
    const history = useHistory();
    const [isEditing, toggleIsEditing] = useState(false);
    const [ad, setAd] = useState({
        title: "",
        redirectUrl: "",
        image: "",
        description: "",
    });

    const handleChange = (event) => {
        setAd({ ...ad, [event.target.name]: event.target.value });
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setAd({
                ...ad,
                image: event.target.files[0],
            });
        }
    };

    useEffect(() => {
        if (state && state.ad) {
            setAd({
                redirectUrl: state.ad.redirectUrl,
                title: state.ad.title,
                description: state.ad.description,
            });
            toggleIsEditing(true);
        }
    }, [state]);

    const onSubmit = (event) => {
        event.preventDefault();
        const data = converToFormData(ad);

        if (isEditing) {
            adApi.update(data, state.ad._id).then(() => {
                history.replace("/admin/ads");
            });
        } else {
            adApi.add(data).then(() => {
                history.replace("/admin/ads");
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
                                <GoBackButton floatRight />
                                <CardTitle tag="h5">Ad</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={ad.title}
                                                    placeholder="Title"
                                                    name="title"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label>Redirect URL</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={ad.redirectUrl}
                                                    type="url"
                                                    name="redirectUrl"
                                                    placeholder="Redirect URL"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label>Description</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={ad.description}
                                                    type="textarea"
                                                    maxLength={300}
                                                    name="description"
                                                    placeholder="Description"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label htmlFor="mainImage">Image</Label>
                                                <CustomInput
                                                    id="mainImage"
                                                    onChange={handleImageChange}
                                                    type="file"
                                                    name="image"
                                                    className="custom-file-input file__input"
                                                />
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

export default AddAd;
