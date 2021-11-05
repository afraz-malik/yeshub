import React, { useEffect, useState } from "react";
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
import { useLocation, useHistory } from "react-router-dom";

import moderatorApi from "./../../api/moderator";
import communityApi from "./../../api/community";
import GoBackButton from "../../components/GoBack/GoBackButton";

const Moderators = () => {
  const { state } = useLocation();
  const history = useHistory();
  const [moderators, setModerators] = useState([]);

  // useEffect(() => {
  //     if (!state || !state.moderators || !state.community) {
  //         history.push("/admin/communities");
  //     } else {
  //         setModerators(state.moderators);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    console.log(state.community, "--- community ---");
    communityApi
      .moderatorsList(state.community, 1, 20)
      .then((res) => {
        setModerators([...res.data.docs]);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeModerator = (id) => {
    moderatorApi.removeModerator(state.community, id).then(() => {
      const m = moderators.filter((moderator) => moderator._id !== id);
      setModerators([...m]);
    });
  };

  return (
    <React.Fragment>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h4">Moderators</CardTitle>
                <GoBackButton />
                {/* <Link
									className="btn btn-primary"
									to={`/admin/moderators/create-update/${state.community}`}
									>
									Add Moderator
									</Link> */}
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moderators.length > 0 ? (
                      moderators.map((moderator, index) => (
                        <tr key={moderator._id}>
                          <td>{index + 1}</td>
                          <td>{moderator.userName}</td>
                          <td className="text-right">
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => removeModerator(moderator._id)}
                            >
                              Remove Moderator
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
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default Moderators;
