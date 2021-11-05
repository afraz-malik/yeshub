import React, { useState, useEffect } from "react";
import { CardBody, Card, CardHeader, Row, Col, FormGroup, CardTitle, Form, Button, Label } from "reactstrap";
import JoditEditor from "jodit-react";

import settingApi from "../../api/setting";
import { EDITOR_CONFIG } from "../../config/config";

const Banner = () => {
    const [content, setContent] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        settingApi.fetchBanner().then((response) => {
            const { content, _id } = response.data[0];

            setContent(content);
            setId(_id);
        });
    }, []);

    const handleChange = (content) => {
        setContent(content);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        settingApi.updateBanner({ content }, id);
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Banner</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Content</Label>
                                                <JoditEditor
                                                    config={EDITOR_CONFIG}
                                                    value={content}
                                                    onChange={handleChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    {id.length ? (
                                        <Row>
                                            <div className="update ml-auto mr-auto">
                                                <Button className="btn-round" color="primary" type="submit">
                                                    Update
                                                </Button>
                                            </div>
                                        </Row>
                                    ) : null}
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default Banner;
