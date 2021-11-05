import React from "react";
import { CardBody, Card, CardHeader, Row, Col, FormGroup, Input, CardTitle, Form, Button, Label } from "reactstrap";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import BannedEmails from "../../api/banned-emails";

const AddBannedEmails = () => {
    const { state } = useLocation();
    const { replace } = useHistory();
    const [isEditing] = useState(state && state.email ? true : false);
    const [values, setValues] = useState({
        email: "",
    });

    useEffect(() => {
        if (state && state.email) {
            setValues({
                id: state.email._id,
                email: state.email.email,
            });
        }
    }, [state]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (isEditing) {
            BannedEmails.update(values.id, { email: values.email }).then(() => {
                replace("/admin/banned-email");
            });
        } else {
            BannedEmails.create(values).then(() => {
                replace("/admin/banned-email");
            });
        }
    };

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card className="card-user">
                        <CardHeader>
                            <GoBackButton floatRight />
                            <CardTitle tag="h5">Add Banned Email</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={onSubmit}>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>Email</Label>
                                            <Input
                                                onChange={handleChange}
                                                value={values.email}
                                                required
                                                placeholder="Email"
                                                name="email"
                                                type="email"
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <div className="update ml-auto mr-auto">
                                        <Button className="btn-round" color="primary" type="submit">
                                            {isEditing ? "Update" : "Add"} Email
                                        </Button>
                                    </div>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AddBannedEmails;
