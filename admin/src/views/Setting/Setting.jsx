import React, { useState, useEffect } from "react";
import { CardBody, Card, CardHeader, Row, Col, FormGroup, Input, CardTitle, Form, Button, Label } from "reactstrap";

import settingApi from "./../../api/setting";

const Setting = () => {
    const [values, setValues] = useState({});

    useEffect(() => {
        settingApi.fetch().then((response) => {
            setValues({
                counter: response.data?.counter || 0,
                id: response.data?._id || "",
            });
        });
    }, []);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        settingApi.update({ counter: values.counter }, values.id);
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Setting</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Counter</Label>
                                                <Input
                                                    onChange={handleChange}
                                                    value={values.counter}
                                                    required
                                                    placeholder="Resource Counter"
                                                    name="counter"
                                                    type="number"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                Update
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

export default Setting;
