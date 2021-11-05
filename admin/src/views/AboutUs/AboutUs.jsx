import React, { useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button, Label } from "reactstrap";
import { Link } from "react-router-dom";
import aboutUsApi from "../../api/about-us";
import { useState } from "react";
import assetUrl from "../../helper/assetUrl";
import isBaseEncoded from "../../helper/isBaseEncoded";

const AboutUs = () => {
    const [aboutUs, setAboutUs] = useState({
        _id: "",
        image: "",
        points: [],
    });

    useEffect(() => {
        aboutUsApi.fetch().then((response) => {
            if (response.data.length > 0) {
                setAboutUs(response.data[0]);
            }
        });
    }, []);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const data = new FormData();
            data.append("image", event.target.files[0]);
            aboutUsApi.updateImage(data, aboutUs._id).then((response) => {
                setAboutUs({
                    ...aboutUs,
                    image: response.data,
                });
            });
        }
    };

    const deleteBtn = (pointId) => {
        aboutUsApi.deletePoint(aboutUs._id, pointId).then(() => {
            const p = aboutUs.points.filter((point) => point._id !== pointId);
            setAboutUs({ ...aboutUs, points: [...p] });
        });
    };

    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader className="d-flex justify-content-between align-items-center">
                            <CardTitle tag="h4">About </CardTitle>
                        </CardHeader>
                        <CardBody className="mb-4">
                            <Row>
                                <Col md="6">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6>Points</h6>
                                        <Link
                                            to={{
                                                pathname: "/admin/about-us/point/create-update",
                                                state: { aboutId: aboutUs._id },
                                            }}
                                            className="btn btn-sm btn-primary"
                                        >
                                            Add Point
                                        </Link>
                                    </div>
                                    <ol>
                                        {aboutUs.points && aboutUs.points.length > 0 ? (
                                            aboutUs.points.map((point) => (
                                                <li key={point._id}>
                                                    <div
                                                        className="text"
                                                        dangerouslySetInnerHTML={{ __html: point.content }}
                                                    ></div>
                                                    <Link
                                                        to={{
                                                            pathname: `/admin/about-us/point/create-update`,
                                                            state: { point, aboutId: aboutUs._id },
                                                        }}
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Button
                                                        onClick={() => deleteBtn(point._id)}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Delete
                                                    </Button>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No Record Found</li>
                                        )}
                                    </ol>
                                </Col>
                                <Col md="6">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6>Image</h6>
                                        <Label for="about__image-input" className="text-white btn btn-info btn-sm">
                                            Change Image
                                            <input
                                                id="about__image-input"
                                                onChange={handleImageChange}
                                                type="file"
                                                className="about__image-input"
                                            />
                                        </Label>
                                    </div>
                                    <img
                                        className="img-thumbnail"
                                        src={isBaseEncoded(aboutUs.image) ? aboutUs.image : assetUrl(aboutUs.image)}
                                        alt={"aboutUs"}
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AboutUs;
