import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";
import { useParams } from "react-router-dom";

import communityApi from "../../api/community";
import eventApi from "../../api/event";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { MAIN_WEBSITE } from "../../config/config";

const PendingPosts = () => {
  const [pendingPosts, setPendingPosts] = useState([]);
  const { id: communityId } = useParams();
  const [pagination, setpagination] = useState({
    hasNext: false,
    hasPrev: false,
    totalDocs: 0,
    page: 1,
  });

  useEffect(() => {
    communityApi
      .pendingPosts(communityId, pagination.page)
      .then((response) => {
        setPendingPosts(response.data);
        setpagination({
          ...pagination,
          hasNext: response.hasNext,
          hasPrev: response.hasPrev,
          page: response.page,
          totalDocs: response.totalDocs,
        });
      })
      .catch((Err) => console.log(Err));
  }, [communityId]);

  const removePostFromList = (id) => {
    const p = pendingPosts.filter((post) => post._id !== id);
    setPendingPosts([...p]);
  };

  const accept = (id) => {
    communityApi.acceptPending(id).then(() => removePostFromList(id));
  };

  const reject = (id) => {
    eventApi.deleteReportedItem(id, "post").then(() => removePostFromList(id));
  };

  const next = () => {
    console.log(pagination);
    communityApi
      .pendingPosts(communityId, Number(pagination.page) + 1)
      .then((response) => {
        setPendingPosts([...response.data]);
        setpagination({
          ...pagination,
          hasNext: response.hasNext,
          hasPrev: response.hasPrev,
          page: response.page,
        });
      })
      .catch((err) => console.log(err));
  };

  const prev = () => {
    communityApi
      .pendingPosts(communityId, Number(pagination.page) - 1)
      .then((response) => {
        setPendingPosts([...response.data]);
        setpagination({
          ...pagination,
          hasNext: response.hasNext,
          hasPrev: response.hasPrev,
          page: response.page,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">
                  Pending Posts ({pagination.totalDocs})
                </CardTitle>
                <GoBackButton />
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>User Name</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingPosts.map((post, index) => (
                      <tr
                        style={{
                          background: !post.author ? "red" : "",
                          color: !post.author ? "white" : "",
                        }}
                        key={post._id}
                      >
                        <td>{(pagination.page - 1) * 10 + index + 1}</td>
                        <td>{post.title}</td>
                        <td>{post?.description?.slice(0, 20) + "..."}</td>
                        <td>{post.author?.userName || "USER REMOVED"}</td>

                        <td className="text-right">
                          <a
                            href={`${MAIN_WEBSITE}post/details/${post._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mr-2 btn btn-sm btn-info"
                          >
                            Visit
                          </a>

                          <Button
                            onClick={() => accept(post._id)}
                            size="sm"
                            color="success"
                            className="mr-2"
                          >
                            Accept
                          </Button>

                          <Button
                            onClick={() => reject(post._id)}
                            size="sm"
                            color="danger"
                          >
                            Reject
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {pendingPosts.length === 0 && (
                  <p className="text-center">No Pending Posts available</p>
                )}
                <div className="d-flex ml-auto">
                  <button
                    disabled={!pagination.hasPrev}
                    className="btn btn-primary"
                    onClick={() => prev()}
                  >
                    Prev
                  </button>
                  <button
                    disabled={!pagination.hasNext}
                    className="btn btn-primary"
                    onClick={() => next()}
                  >
                    Next
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default PendingPosts;
