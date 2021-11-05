import React from "react";
import { Card, CardHeader, Col, Label, Button, CardImg, CardFooter } from "reactstrap";
import { useState } from "react";

import slide from "./../../api/slide";
import { useEffect } from "react";
import assetUrl from "../../helper/assetUrl";

const SliderImageItem = ({ name, image, onDeleteImage }) => {
    const [img, setImg] = useState(null);
    const [hasAdd, setHasAdd] = useState(false);
    const [preview, setPreview] = useState("https://via.placeholder.com/250");

    useEffect(() => {
        if (image.image) {
            if (image.image.indexOf("http") !== -1) {
                setPreview(image.image);
            } else {
                setPreview(assetUrl(image.image));
            }
        }
    }, [image]);

    const addImage = () => {
        const data = new FormData();
        data.append("image", img);

        slide.add(data).then(() => {
            setHasAdd(true);
        });
    };

    const deleteImage = () => {
        if (image) {
            onDeleteImage(image._id);
        } else {
            onDeleteImage(null);
        }
    };

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files.length) {
            setImg(event.target.files[0]);

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <Col xs="12" md="4" lg="3">
            <Card>
                <CardHeader>
                    <Label for={`image__${name}`} className="d-block">
                        <CardImg className="card__img" top src={preview} />
                        <input
                            onChange={handleImageChange}
                            className="card__input"
                            type="file"
                            name="file"
                            id={`image__${name}`}
                        />
                    </Label>
                </CardHeader>
                <CardFooter className="text-center">
                    {(!image._id || hasAdd) && (
                        <Button onClick={addImage} color="info" className="mr-2">
                            Add
                        </Button>
                    )}
                    <Button onClick={deleteImage} color="danger">
                        Delete
                    </Button>
                </CardFooter>
            </Card>
        </Col>
    );
};

export default SliderImageItem;
