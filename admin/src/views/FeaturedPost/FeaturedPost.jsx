import React from "react";
import { useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";

import assetUrl from "./../../helper/assetUrl";
import featuredPostApi from "./../../api/featurepost";
import { confirmMessage } from "../../helper/mixed";

const FeaturedPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        featuredPostApi.fetch().then((response) => {
            setPosts(response.data);
        });
    }, []);

    const deletePost = (id) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        featuredPostApi.delete(id).then(() => {
                            const filteredPosts = posts.filter((post) => post._id !== id);
                            setPosts(filteredPosts);
                        });
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Featured Post</CardTitle>
                                <Link className="btn btn-sm btn-primary" to="/admin/featured-post/create-update">
                                    Add Post
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>Post Image</th>
                                            <th>Upload Image</th>
                                            <th>Rediect Url</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {posts.length > 0 ? (
                                            posts.map((post, index) => (
                                                <tr key={post._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{post.title}</td>
                                                    <td>{post.author.userName}</td>
                                                    <td>
                                                        <img
                                                            className="table__image"
                                                            src={assetUrl(post.displayImage.thumbnail)}
                                                            alt={post.title}
                                                        />
                                                    </td>
                                                    <td>
                                                        <img
                                                            className="table__image"
                                                            src={assetUrl(post.displayImage.original)}
                                                            alt={post.title}
                                                        />
                                                    </td>
                                                    <td>{post.redirectUrl}</td>

                                                    <td className="text-right">
                                                        <Link
                                                            className="btn btn-primary btn-sm mr-2"
                                                            to={{
                                                                pathname: "/admin/featured-post/create-update",
                                                                state: { post },
                                                            }}
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Button
                                                            onClick={() => deletePost(post._id)}
                                                            size="sm"
                                                            color="danger"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={999} className="text-center">
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

export default FeaturedPost;
