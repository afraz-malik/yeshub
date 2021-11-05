import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import { confirmAlert } from "react-confirm-alert";

import communityApi from "./../../api/community";
import assetUrl from "../../helper/assetUrl";
import PaginationTable from "../../components/Shared/PaginationTable";
import usePagination from "../../hooks/usePagination";
import paginationIndexCounter from "../../helper/paginationIndexCounter";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { confirmMessage } from "../../helper/mixed";

const ArchivedCommunities = () => {
    const [communities, setCommunities] = useState([]);
    const { currentPage, totalPages, changePagination, changeTotalPages } = usePagination();

    useEffect(() => {
        communityApi.fetchArchived(currentPage).then((response) => {
            setCommunities(response.data.docs);
            changeTotalPages(response.data.totalPages);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const undoDelete = (id) => {
        communityApi.undoArchived(id).then(() => {
            const filteredCommunity = communities.filter((community) => community._id !== id);
            setCommunities([...filteredCommunity]);
        });
    };

    const deleteCommunity = (id) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        communityApi.delete(id).then(() => {
                            const filteredCommunity = communities.filter((community) => community._id !== id);
                            setCommunities([...filteredCommunity]);
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
                                <CardTitle tag="h4">Archived Communities</CardTitle>
                                <GoBackButton />
                                {/* <Link
									className="btn btn-primary"
									to={`/admin/moderators/create-update/${state.community}`}
									>
									Add Moderator
									</Link> */}
                            </CardHeader>
                            <CardBody>
                                <PaginationTable
                                    onPaginationClick={changePagination}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                >
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Logo</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {communities.length > 0 ? (
                                            communities.map((community, index) => (
                                                <tr key={community._id}>
                                                    <td>{paginationIndexCounter(currentPage, index)}</td>
                                                    <td>{community.name}</td>
                                                    <td>{community.description}</td>
                                                    <td>
                                                        <img
                                                            src={assetUrl(community.logo)}
                                                            className="table__image"
                                                            alt=""
                                                        />
                                                    </td>
                                                    <td className="text-right">
                                                        <Button
                                                            color="success"
                                                            size="sm"
                                                            className="mr-2"
                                                            onClick={() => undoDelete(community._id)}
                                                        >
                                                            Undo Delete
                                                        </Button>
                                                        <Button
                                                            color="danger"
                                                            size="sm"
                                                            onClick={() => deleteCommunity(community._id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center" colSpan="9999">
                                                    No Moderator found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </PaginationTable>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
};

export default ArchivedCommunities;
