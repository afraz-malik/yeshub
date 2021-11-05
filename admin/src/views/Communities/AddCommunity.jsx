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
import { useLocation, useHistory } from "react-router-dom";
import GoBackButton from "../../components/GoBack/GoBackButton";

import communityApi from "../../api/community";
import converToFormData from "../../helper/convertToFormData";
import { linkify, unLinkify } from "../../helper/linkify";

const AddCategory = () => {
    const { state } = useLocation();
    const history = useHistory();

    const [isEditing, setIsEditing] = useState(false);
    const [communityImage, setCommunityImage] = useState({
        images: "",
    });
    const [community, setCommunity] = useState({
        name: "",
        description: "",
        joingType: 1,
        images: "",
        autoPE: false,
        rules: [""],
    });

    useEffect(() => {
        if (state && state.community) {
            setCommunity({
                ID: state.community._id,
                name: state.community.name,
                description: unLinkify(state.community.description),
                joingType: state.community.joingType,
                images: state.community.logo,
                autoPE: state.community.autoPE,
                rules: state.community.rules,
            });

            setIsEditing(true);
        }
    }, [state]);

    const addRule = () => {
        setCommunity({
            ...community,
            rules: [...community.rules, ""],
        });
    };

    const deleteRule = () => {
        const rules = [...community.rules];
        rules.pop();
        setCommunity({
            ...community,
            rules: [...rules],
        });
    };

    const handleChange = (event) => {
        const { type, checked, name, value } = event.target;

        setCommunity({
            ...community,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleRuleChange = (event, index) => {
        const rules = [...community.rules];
        rules[index] = event.target.value;

        setCommunity({ ...community, rules: [...rules] });
    };

    const handleImageChange = (event) => {
        setCommunity({ ...community, images: event.target.files[0] });
    };

    const handleImageUpdate = (event) => {
        setCommunityImage({
            images: event.target.files[0],
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const data = {
            ...community,
            description: linkify(community.description),
        };

        if (isEditing) {
            communityApi.update(data).then(() => {
                history.push("/admin/communities");
            });
            return;
        }

        const formData = converToFormData(data);

        communityApi.add(formData).then(() => {
            history.push("/admin/communities");
        });
    };

    const updateImage = (type) => {
        const formData = new FormData();

        formData.append("images", communityImage.images);
        formData.append("ID", state.community._id);

        if (type === "logo") {
            communityApi.updateLogo(formData);
        } else {
            communityApi.updateCover(formData);
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
                                <CardTitle tag="h5">Community</CardTitle>
                            </CardHeader>
                            <CardBody>
                                {isEditing && (
                                    <React.Fragment>
                                        <Row className="align-items-end">
                                            <Col xs="10">
                                                <FormGroup>
                                                    <Label htmlFor="logo">Update Logo</Label>
                                                    <CustomInput
                                                        id="logo"
                                                        onChange={handleImageUpdate}
                                                        type="file"
                                                        name="image"
                                                        className="custom-file-input file__input"
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col xs="2" className="mb-2">
                                                <Button
                                                    onClick={() => updateImage("logo")}
                                                    className="py-2"
                                                    block
                                                    color="info"
                                                >
                                                    Update
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Row className="align-items-end">
                                            <Col xs="10">
                                                <FormGroup>
                                                    <Label htmlFor="cover">Update Cover Image</Label>
                                                    <CustomInput
                                                        id="cover"
                                                        onChange={handleImageUpdate}
                                                        type="file"
                                                        name="image"
                                                        className="custom-file-input file__input"
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col xs="2" className="mb-2">
                                                <Button onClick={updateImage} className="py-2" block color="info">
                                                    Update
                                                </Button>
                                            </Col>
                                        </Row>
                                    </React.Fragment>
                                )}

                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={community.name}
                                                    required
                                                    placeholder="Name"
                                                    name="name"
                                                    type="text"
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
                                                    value={community.description}
                                                    required
                                                    type="textarea"
                                                    name="description"
                                                    placeholder="description"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    {!isEditing && (
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
                                    )}
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <label>Joining Type</label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={community.joingType}
                                                    required
                                                    type="select"
                                                    name="joingType"
                                                >
                                                    <option value="1">Auto Join</option>
                                                    <option value="2">Verify by Admin/Moderator</option>
                                                    <option value="3">Join on Signup/ Auto Join on Signup</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Input
                                                    onChange={handleChange}
                                                    checked={community.autoPE}
                                                    value={community.autoPE}
                                                    type="checkbox"
                                                    name="autoPE"
                                                    id="autoPE"
                                                    className="ml-2"
                                                />
                                                <label htmlFor="autoPE" className="ml-4 pl-1">
                                                    Auto Post
                                                </label>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row className="align-items-end">
                                        <Col xs="6">
                                            <label>Rules</label>
                                        </Col>

                                        <Col xs="6" className="text-right">
                                            <Button onClick={deleteRule} color="danger">
                                                Delete Rule
                                            </Button>

                                            <Button onClick={addRule} color="primary">
                                                Add Rule
                                            </Button>
                                        </Col>
                                    </Row>
                                    {community.rules.map((rule, index) => (
                                        <Row key={index}>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Input
                                                        required
                                                        placeholder="Rule"
                                                        type="text"
                                                        name="title"
                                                        value={rule}
                                                        onChange={(event) => handleRuleChange(event, index)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    ))}

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                {isEditing ? "Update" : "Add"} Community
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

export default AddCategory;
