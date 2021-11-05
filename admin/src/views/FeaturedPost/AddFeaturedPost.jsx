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
import featurePostApi from "../../api/featurepost";
import { useLocation, useHistory } from "react-router-dom";
import converToFormData from "../../helper/convertToFormData";
import GoBackButton from "../../components/GoBack/GoBackButton";

const AddFeaturedPost = () => {
    const { state } = useLocation();
    const history = useHistory();
    const [isEditing, toggleIsEditing] = useState(false);
    const [featuredPost, setFeaturedPost] = useState({
        title: "",
        redirectUrl: "",
        image: "",
        description: "",
    });

    const handleChange = (event) => {
        setFeaturedPost({
            ...featuredPost,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setFeaturedPost({
                ...featuredPost,
                image: event.target.files[0],
            });
        }
    };

    useEffect(() => {
        if (state && state.post) {
            setFeaturedPost({
                redirectUrl: state.post.redirectUrl,
                title: state.post.title,
                description: state.post.description,
            });
            toggleIsEditing(true);
        }
    }, [state]);

    const onSubmit = (event) => {
        event.preventDefault();
        const data = converToFormData(featuredPost);

        if (isEditing) {
            featurePostApi.update(data, state.post._id).then(() => {
                history.replace("/admin/featured-post");
            });
        } else {
            featurePostApi.add(data).then(() => {
                history.replace("/admin/featured-post");
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
                                <CardTitle tag="h5">Feature Post</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={featuredPost.title}
                                                    required
                                                    placeholder="Title"
                                                    name="title"
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={featuredPost.description}
                                                    required
                                                    placeholder="description"
                                                    name="description"
                                                    type="textarea"
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
                                                    value={featuredPost.redirectUrl}
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

export default AddFeaturedPost;
