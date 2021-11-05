import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

import MemberItem from "../../components/Shared/member-item";
import communityApi from "./../../api/community";
import PaginationTable from "../../components/Shared/PaginationTable";
import usePagination from "../../hooks/usePagination";
import GoBackButton from "../../components/GoBack/GoBackButton";
import { confirmMessage } from "../../helper/mixed";

const Members = () => {
  const [members, setMembers] = useState([]);
  const { id: communityId } = useParams();
  const [totalPages, settotalPages] = useState(1);
  const [currentPage, setcurrentPage] = useState(1);
  //   const { changePagination, changeTotalPages, changeLimit, limit } =
  //     usePagination();
  const changePagination = (data) => {
    console.log(data);
    searchMemebers("", data);
    setcurrentPage(data);
  };
  const [keyword, setKeyword] = useState("");
  const [isLoading, toggleLoading] = useState(false);

  const searchMemebers = (searchKeyWord, page) => {
    if (!isLoading) {
      toggleLoading(true);

      communityApi
        .searchMemebers(searchKeyWord, communityId, page)
        .then((response) => {
          setMembers(response.data.docs);
          settotalPages(response.data.totalPages);
          //   changeLimit(response.data.limit);
          toggleLoading(false);
        });
    }
  };

  useEffect(() => {
    searchMemebers(keyword, 1);
    changePagination(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, communityId]);

  useEffect(() => {
    searchMemebers(keyword, currentPage); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, communityId]);

  const handleSearch = (event) => {
    setKeyword(event.target.value);
  };

  const getMembers = () => {
    console.log("fn called ...");
    communityApi.fetchMembers(communityId, 1).then((response) => {
      //   response.data.forEach((user) => {
      //     // console.log(user._id, user.userName, user.isInvited);
      //     // setMembers(res.)
      //   });
      setMembers(response.data.docs);
      settotalPages(response.data.totalPages);
      setcurrentPage(response.data.page);
    });
  };
  useEffect(() => {
    getMembers();
  }, []);

  const deleteMember = (id) => {
    confirmAlert({
      title: confirmMessage,
      message: "",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            communityApi.deleteMember(communityId, id).then(() => {
              const m = members.filter((member) => member._id !== id);

              setMembers([...m]);
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
                <CardTitle tag="h4">Members</CardTitle>
                <div className="d-flex align-items-center">
                  <Input
                    placeholder="Search"
                    onChange={handleSearch}
                    value={keyword}
                    className="mr-2"
                  />
                  <GoBackButton />
                </div>
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
                      <th>Image</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => (
                      <MemberItem
                        key={member._id}
                        deleteMember={deleteMember}
                        index={index}
                        communityId={communityId}
                        member={member}
                        limit={150}
                        currentPage={currentPage}
                      />
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

export default Members;
