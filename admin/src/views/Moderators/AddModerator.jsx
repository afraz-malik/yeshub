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
    Table,
    Label,
} from "reactstrap";
import moderatorApi from "./../../api/moderator";
import { useParams } from "react-router-dom";
import GoBackButton from "../../components/GoBack/GoBackButton";

const AddModerator = () => {
    const [moderators, setModerators] = useState([]);
    const [keyword, setKeyWord] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (keyword.length > 3) {
            moderatorApi.search(keyword, id).then((response) => {
                setModerators(response.data.docs);
            });
        }
    }, [keyword, id]);

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setKeyWord(event.target.value);
    };

    const sendInvite = (userId) => {
        moderatorApi.sendInvite(id, userId).then(() => {
            const m = moderators.filter((moderator) => moderator._id !== userId);

            setModerators([...m]);
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card className="card-user">
                            <CardHeader>
                                <CardTitle tag="h5">Moderator</CardTitle>
                                <GoBackButton />
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={onSubmit}>
                                    <Row>
                                        <Col className="pr-1">
                                            <FormGroup>
                                                <Label>Keyword</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    placeholder="Keyword"
                                                    name="keyword"
                                                    value={keyword}
                                                    type="text"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Image</th>
                                                <th>Join Type</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {moderators.length > 0 ? (
                                                moderators.map((moderator, index) => (
                                                    <tr key={moderator._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{moderator.userName}</td>
                                                        <td>{moderator.userImage}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => sendInvite(moderator._id)}
                                                                className="btn btn-info btn-sm"
                                                            >
                                                                Send Invite
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <td className="text-center" colSpan={9999}>
                                                    No User Found
                                                </td>
                                            )}
                                        </tbody>
                                    </Table>

                                    <Row>
                                        <div className="update ml-auto mr-auto">
                                            <Button className="btn-round" color="primary" type="submit">
                                                Update Profile
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

export default AddModerator;
