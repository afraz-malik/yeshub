import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import adApi from "./../../api/ad";
import assetUrl from "./../../helper/assetUrl";
import { confirmMessage } from "../../helper/mixed";

const Ads = () => {
    const [ads, setAds] = useState([]);

    const deleteAd = (id) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        adApi.delete(id).then(() => {
                            const adsClone = ads.filter((ad) => ad._id !== id);
                            setAds([...adsClone]);
                        });
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    useEffect(() => {
        adApi.fetch().then((response) => {
            setAds(response.data);
        });
    }, []);

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Ads</CardTitle>
                                <Link className="btn btn-primary" to="/admin/ads/create-update">
                                    Add Ad
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Rediect Url</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ads.length > 0 ? (
                                            ads.map((ad, index) => (
                                                <tr key={ad._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{ad.title}</td>
                                                    <td>{ad.description}</td>
                                                    <td>
                                                        <img
                                                            src={assetUrl(ad.image)}
                                                            alt={ad.title}
                                                            className="table__image"
                                                        />
                                                    </td>
                                                    <td>{ad.redirectUrl}</td>
                                                    <td className="text-right">
                                                        <Link
                                                            className="btn btn-sm btn-info mr-2"
                                                            to={{
                                                                pathname: "/admin/ads/create-update",
                                                                state: { ad },
                                                            }}
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Button
                                                            color="danger"
                                                            size="sm"
                                                            onClick={() => deleteAd(ad._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center" colSpan={999}>
                                                    No Record Found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default Ads;
