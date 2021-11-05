import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";
import assetUrl from "../helper/assetUrl";
import { useState } from "react";
import { useEffect } from "react";
import userApi from "../api/user";
import PaginationTable from "../components/Shared/PaginationTable";
import usePagination from "../hooks/usePagination";
import paginationIndexCounter from "../helper/paginationIndexCounter";

const Users = () => {
  const [users, setUsers] = useState([]);
  const { currentPage, totalPages, changePagination, changeTotalPages } =
    usePagination();
  const [keyword, setKeyword] = useState("");
  const [isLoading, toggleLoading] = useState(false);

  const searchUser = (user, page) => {
    if (!isLoading) {
      toggleLoading(true);

      userApi.search(user, page).then((response) => {
        setUsers(response.data.docs);
        console.log(response.data);
        changeTotalPages(response.data.totalPages);
        toggleLoading(false);
      });
    }
  };

  useEffect(() => {
    searchUser(keyword, 1);
    changePagination(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    // searchUser(keyword, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const makeItUSer = (userID, index) => {
    userApi
      .makeItUser(userID)
      .then((doc) => {
        users[index].assignedRoles[0].roleName = "user";
        setUsers([...users]);
      })
      .catch((err) => console.log(err));
  };

  const makeItStaff = (userID, index) => {
    userApi
      .makeItStaff(userID)
      .then((doc) => {
        users[index].assignedRoles[0].roleName = "staff";
        setUsers([...users]);
      })
      .catch((err) => console.log(err));
  };

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const onDelete = (id) => {
    userApi.delete(id).then(() => {
      const us = users.filter((user) => user._id !== id);
      setUsers(us);
    });
  };

  return (
    <React.Fragment>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Users</CardTitle>
                <div>
                  <Input
                    placeholder="Search User"
                    onChange={handleSearch}
                    value={keyword}
                  />
                </div>
              </CardHeader>
              <CardBody>
                <div className="table--overflow">
                  <PaginationTable
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPaginationClick={changePagination}
                  >
                    <thead className="text-primary">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Image</th>
                        <th>department</th>
                        <th>home office</th>
                        <th>organization</th>
                        <th>position</th>
                        <th>supervisor manager</th>
                        <th>Image</th>
                        <th className="text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user._id}>
                          <td>{paginationIndexCounter(currentPage, index)}</td>
                          <td>{user.userName}</td>
                          <td>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </td>
                          <td>
                            {user.assignedRoles && user.assignedRoles.length > 0
                              ? user.assignedRoles
                                  .map((role) => role.roleName)
                                  .join(", ")
                              : "User"}
                          </td>
                          <td>
                            <img
                              src={assetUrl(user.userImage)}
                              alt={""}
                              className="table__image"
                            />
                          </td>
                          <td>{user.deparmentTeam || "N/A"}</td>
                          <td>{user.homeOffice || "N/A"}</td>
                          <td>{user.organization || "N/A"}</td>
                          <td>{user.position || "N/A"}</td>
                          <td>{user.supervisorManager || "N/A"}</td>
                          <td className="text-right">
                            {user.assignedRoles.length > 0 &&
                            user?.assignedRoles[0]?.roleName === "staff" ? (
                              <Button
                                onClick={() => makeItUSer(user._id, index)}
                                color="warning"
                                size="sm"
                                className="mr-2"
                              >
                                Make It User
                              </Button>
                            ) : (
                              <Button
                                onClick={() => makeItStaff(user._id, index)}
                                color="info"
                                size="sm"
                                className="mr-2"
                              >
                                Make It Staff
                              </Button>
                            )}
                            <Button
                              onClick={() => onDelete(user._id)}
                              color="danger"
                              size="sm"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </PaginationTable>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Users;
