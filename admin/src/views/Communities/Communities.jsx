import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import communityApi from "../../api/community";
import parseDescription from "./../../helper/parseDescription";
import PaginationTable from "../../components/Shared/PaginationTable";
import usePagination from "./../../hooks/usePagination";
import paginationIndexCounter from "../../helper/paginationIndexCounter";
import { confirmMessage } from "../../helper/mixed";
import communityJoinType from "../../helper/communityJoinType";
import { API_WEBSITE } from "../../config/config";

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const { currentPage, totalPages, changePagination, changeTotalPages } =
    usePagination();

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    communityApi.fetch(currentPage).then((response) => {
      setCommunities(response.data.docs);
      changeTotalPages(response.data.totalPages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const deleteCommunity = (id) => {
    confirmAlert({
      title: confirmMessage,
      message: "",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            communityApi.archive(id).then(() => {
              const c = communities.filter((community) => community._id !== id);
              setCommunities([...c]);
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
                <CardTitle tag="h4">Communities</CardTitle>
                <div>
                  <Link
                    className="btn btn-sm btn-warning mr-2"
                    to={
                      !["user", "moderator"].includes(userType)
                        ? "/admin/communities/archived"
                        : "#"
                    }
                  >
                    Archived Communities
                  </Link>

                  <Link
                    className="btn btn-sm btn-primary"
                    to={
                      !["user", "moderator"].includes(userType)
                        ? "/admin/communities/create-update"
                        : "#"
                    }
                  >
                    Add Community
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <PaginationTable
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPaginationClick={changePagination}
                >
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Join Type</th>
                      <th>Auto Post</th>
                      <th>Pending Joining</th>
                      <th>Pending Posts</th>
                      <th>Likes</th>
                      <th>Dislikes</th>
                      <th>Moderators</th>
                      <th>Members</th>
                      <th>Published</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {communities.map((community, index) => (
                      <tr key={community._id}>
                        <td>{paginationIndexCounter(currentPage, index)}</td>
                        <td>{community.name}</td>
                        <td>{parseDescription(community.description)}</td>
                        <td>{communityJoinType(community.joingType)}</td>
                        <td>
                          {community.autoPE ? "Auto" : "Needs Verification"}
                        </td>
                        <td>
                          <Link
                            className="btn btn-sm btn-muted"
                            to={{
                              pathname: `/admin/pending-request/${community._id}`,
                              state: {
                                pendingJoining: community.pendingJoining,
                              },
                            }}
                          >
                            Requests
                            {community.pendingJoining ? (
                              <span className="badge badge-counter badge-primary">
                                {community.pendingJoining}
                              </span>
                            ) : (
                              ""
                            )}
                          </Link>
                        </td>
                        <td>
                          <Link
                            className="btn btn-sm btn-muted"
                            to={`/admin/pending-posts/${community._id}`}
                          >
                            Posts{" "}
                            {community?.pendingPosts > 0 && (
                              <span className="badge badge-info">
                                {community?.pendingPosts}
                              </span>
                            )}
                          </Link>
                        </td>
                        <td>{community.likes.length}</td>
                        <td>{community.disliskes.length}</td>
                        <td>
                          <Link
                            className="btn btn-info btn-sm"
                            to={{
                              pathname: "/admin/moderators",
                              state: {
                                moderators: community.moderators,
                                community: community._id,
                              },
                            }}
                          >
                            Moderators
                            {community.moderators.length ? (
                              <span className="badge badge-counter badge-warning">
                                {community.moderators.length}
                              </span>
                            ) : (
                              ""
                            )}
                          </Link>
                        </td>

                        <td>
                          <Link
                            className="btn btn-warning btn-sm"
                            to={`/admin/members/${community._id}`}
                          >
                            Members
                          </Link>
                        </td>

                        <td>{community.published}</td>
                        <td>
                          <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href={`${API_WEBSITE}user/exports/in/community/${community._id}`}
                            className="btn btn-success btn-sm mr-2"
                          >
                            Export Members
                          </a>
                          <Link
                            className="btn btn-warning btn-sm mr-2"
                            to={{
                              pathname: "/admin/communities/create-update",
                              state: { community },
                            }}
                          >
                            Edit
                          </Link>
                          <Button
                            onClick={() => deleteCommunity(community._id)}
                            size="sm"
                            color="danger"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
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

export default Communities;
