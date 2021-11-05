import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";
import { useLocation, Link, useHistory, useParams } from "react-router-dom";

import sectionApi from "../../api/product-section";

const ProductSections = () => {
    const [sections, setSections] = useState([]);
    const { state } = useLocation();
    const { goBack } = useHistory();
    const { id: pid } = useParams();

    useEffect(() => {
        if (state && state.sections && pid) {
            setSections(state.sections || []);
        } else goBack();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);

    const deleteSection = (sid) => {
        sectionApi.delete(pid, sid).then(() => {
            const filteredTools = sections.filter((tool) => tool._id !== sid);
            setSections([...filteredTools]);
        });
    };

    return (
        <React.Fragment>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader className="d-flex justify-content-between align-items-center">
                                <CardTitle tag="h4">Sections</CardTitle>
                                <Link className="btn btn-primary" to={`/admin/products/sections/create-update/${pid}`}>
                                    Add Section
                                </Link>
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Content</th>
                                            <th className="text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sections.length > 0
                                            ? sections.map((section, index) => (
                                                  <tr key={section._id}>
                                                      <td>{index + 1}</td>
                                                      <td>{section.title}</td>
                                                      <td>{section.body}</td>

                                                      <td className="text-right">
                                                          <Link
                                                              className="btn btn-warning btn-sm mr-2"
                                                              to={{
                                                                  pathname: `/admin/products/sections/create-update/${pid}`,
                                                                  state: { section },
                                                              }}
                                                          >
                                                              Edit
                                                          </Link>
                                                          <Button
                                                              onClick={() => deleteSection(section._id)}
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

export default ProductSections;
