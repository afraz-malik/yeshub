import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";
import assetUrl from "../../helper/assetUrl";
import { confirmAlert } from "react-confirm-alert";

import recommendedToolsApi from "../../api/product-recommended-tool";
import { confirmMessage } from "../../helper/mixed";

const RecommendedTools = () => {
    const { state } = useLocation();
    const [tools, setTools] = useState([]);
    const { id } = useParams();
    const { goBack } = useHistory();

    useEffect(() => {
        if (state && state.tools && id) {
            setTools(state.tools || []);
        } else goBack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, id]);

    const deleteTool = (tid) => {
        confirmAlert({
            title: confirmMessage,
            message: "",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => {
                        recommendedToolsApi.delete(id, tid).then(() => {
                            const filteredTools = tools.filter((tool) => tool._id !== tid);
                            setTools([...filteredTools]);
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
                                <CardTitle tag="h4">Recommended Tools</CardTitle>
                                <Link
                                    className="btn btn-primary"
                                    to={`/admin/products/recommended-tools/create-update/${id}`}
                                >
                                    Add Tool
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Icon</th>
                                            <th>Redirect URL</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tools.length > 0
                                            ? tools.map((tool, index) => (
                                                  <tr key={tool._id}>
                                                      <td>{index + 1}</td>
                                                      <td>{tool.title}</td>
                                                      <td>
                                                          <img src={assetUrl(tool.fileType)} alt={tool.title} />
                                                      </td>
                                                      <td>{tool.redirectUrl}</td>

                                                      <td className="text-right">
                                                          <Link
                                                              className="btn btn-warning btn-sm mr-2"
                                                              to={{
                                                                  pathname: `/admin/products/recommended-tools/create-update/${id}`,
                                                                  state: { tool },
                                                              }}
                                                          >
                                                              Edit
                                                          </Link>
                                                          <Button
                                                              onClick={() => deleteTool(tool._id)}
                                                              size="sm"
                                                              color="danger"
                                                          >
                                                              Delete
                                                          </Button>
                                                      </td>
                                                  </tr>
                                              ))
                                            : null}
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

export default RecommendedTools;
