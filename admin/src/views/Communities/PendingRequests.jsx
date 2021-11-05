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
import { useLocation, useParams } from "react-router-dom";

import communityApi from "../../api/community";
import GoBackButton from "../../components/GoBack/GoBackButton";

const LIMIT = 10;
const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const { state } = useLocation();
  const [pagination, setpagination] = useState({
    totalDocs: state.pendingJoining,
    hasNextPage: state.pendingJoining > LIMIT ? true : false,
    hasPrevPage: false,
    totalPages: Math.ceil(state.pendingJoining / LIMIT),
  });
  const { id: communityId } = useParams();
  const [page, setpage] = useState(1);

  useEffect(() => {
    console.log(state);
    communityApi
      .pendingJoiningRequests(communityId, page, LIMIT)
      .then((res) => {
        setPendingRequests([...res.data.docs]);

        // setpagination({
        //   ...res.data,
        //   docs: [],
        // });
      })
      .catch((err) => console.log(err));
  }, []);

  const next = () => {
    communityApi
      .pendingJoiningRequests(communityId, page + 1, LIMIT)
      .then((res) => {
        setPendingRequests([...res.data.docs]);

        setpage(page + 1);
        // setpagination({
        //   ...res.data,
        //   docs: [],
        // });
      })
      .catch((err) => console.log(err));
  };

  const prev = () => {
    communityApi
      .pendingJoiningRequests(communityId, page - 1, LIMIT)
      .then((res) => {
        setPendingRequests([...res.data.docs]);
        setpage(page - 1);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //     if (state && state.pendingJoining) {
  //         setPendingRequests([...state.pendingJoining]);
  //     }
  // }, [state]);

  const removeMemberFromList = (id) => {
    const m = pendingRequests.filter((member) => member._id !== id);
    setPendingRequests([...m]);
  };

  const acceptMember = (id) => {
    communityApi
      .acceptMember(communityId, id)
      .then(() => removeMemberFromList(id));
  };

  const rejectMember = (id) => {
    communityApi
      .rejectMember(communityId, id)
      .then(() => removeMemberFromList(id));
  };

  return (
    <React.Fragment>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Pending Requests</CardTitle>
                <GoBackButton />
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Image</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.map((request, index) => (
                      <tr key={request._id}>
                        <td>{index + 1}</td>
                        <td>{request.userName}</td>
                        <td>{request.email}</td>
                        <td>
                          <img
                            src={request.userImage}
                            class="img-fluid table__image"
                            alt="userImage"
                          />
                        </td>
                        <td className="text-right">
                          <Button
                            onClick={() => acceptMember(request._id)}
                            size="sm"
                            color="success"
                            className="mr-2"
                          >
                            Accept
                          </Button>

                          <Button
                            onClick={() => rejectMember(request._id)}
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
                {pagination.totalPages > 1 && (
                  <div className="d-flex flex-row">
                    <div className="ml-auto">
                      <button
                        className="btn btn-primary"
                        disabled={page <= 1}
                        onClick={() => prev()}
                      >
                        Prev
                      </button>
                      <button
                        className="btn btn-primary"
                        disabled={page >= pagination.totalPages}
                        onClick={() => next()}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default PendingRequests;
