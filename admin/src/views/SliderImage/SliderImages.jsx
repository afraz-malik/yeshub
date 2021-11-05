import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";

import SliderImageItem from "./item";
import slideApi from "../../api/slide";

const SliderImages = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        slideApi.fetch().then((response) => {
            setImages([...response.data]);
        });
    }, []);

    const addImage = () => {
        setImages([
            ...images,
            {
                id: null,
                image: "https://via.placeholder.com/250",
            },
        ]);
    };

    const deleteImage = (id) => {
        if (id) {
            slideApi.delete(id).then(() => {
                const imgs = images.filter((img) => img._id !== id);
                setImages(imgs);
            });
        } else {
            images.pop();
            setImages([...images]);
        }
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col>
                        <Card className="card-user">
                            <CardHeader className="d-flex justify-content-between">
                                <CardTitle tag="h5">Slider Images</CardTitle>
                                <Button onClick={addImage} color="info" size="sm">
                                    Add Image
                                </Button>
                            </CardHeader>
                            <CardBody>
                                <Row className="align-items-center">
                                    {images.map((img, index) => (
                                        <SliderImageItem
                                            key={index}
                                            image={img}
                                            name={index}
                                            onDeleteImage={deleteImage}
                                        />
                                    ))}
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default SliderImages;
