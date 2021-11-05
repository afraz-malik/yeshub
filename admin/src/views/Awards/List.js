import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import awardApi from '../../api/award';
import PaginationTable from "../../components/Shared/PaginationTable";
import usePagination from "./../../hooks/usePagination";
import paginationIndexCounter from "../../helper/paginationIndexCounter";
import { confirmAlert } from "react-confirm-alert";
import { confirmMessage } from "../../helper/mixed";
import { WEBSITE_URL } from "../../config/config";



export default () => {
  const [awards, setAwards] = useState([]);
  const { currentPage, totalPages, changePagination, changeTotalPages } = usePagination();


  const fetchRecors = () => {
    awardApi.fetch().then((rec) => {
      setAwards(rec.data)
    })
  }

  useEffect(() => {
    fetchRecors()
  },[])


  const deleteaward = (id) => {
       confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        awardApi.delete(id).then(() => {
                            fetchRecors()
                        })
                    },
                },
                {
                    label: "No",
                },
            ],
        });

  }


  return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Awards</CardTitle>
                                <div>
                                    <Link  className="btn btn-sm btn-primary" to={'/admin/award/create-update'}>
                                        Add award
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
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Cost</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {awards.map((award, index) => (
                                            <tr key={award._id}>
                                                <td>{paginationIndexCounter(currentPage, index)}</td>
                                                <td><img className="award__img" src={`${WEBSITE_URL}/${award.images[0]}`}/></td>
                                                <td>{award.awardName}</td>
                                                <td>{award.awardDescription}</td>
                                                <td>{award.cost}</td>
                                                <td>
                                                    <Link
                                                        className="btn btn-warning btn-sm mr-2"
                                                        to={{
                                                            pathname: "/admin/award/create-update",
                                                            state: { award },
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <Button
                                                        onClick={() => deleteaward(award._id)}
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
}
