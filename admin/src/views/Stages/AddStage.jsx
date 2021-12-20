import React, { useState, useEffect } from "react";
import {
  CardBody,
  Card,
  CardHeader,
  Row,
  Col,
  FormGroup,
  Input,
  CardTitle,
  Form,
  Button,
  Label,
  CustomInput,
} from "reactstrap";
import { useLocation, useHistory } from "react-router-dom";
import converToFormData from "../../helper/convertToFormData";
import stageApi from "./../../api/stage";

const AddStage = ({ editing = false, stageData, onCancel, onSubmited }) => {
  const [isEditing, setEditing] = useState(editing);
  const [stage, setStage] = useState({
    title: "",
    stageNumber: 1,
  });
  const { state } = useLocation();
  const { replace } = useHistory();

  useEffect(() => {
    console.log(stageData);
    setStage({ ...stageData });
  }, []);
  // useEffect(() => {
  // if (state && state.stage) {
  //   setEditing(true);
  //   delete state.stage.sections;
  //   delete state.stage.recommendedTools;

  //   setStage({ ...state.stage });
  // }
  // }, [state]);

  const handleChange = (event) => {
    setStage({
      ...stage,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files) {
      setStage({
        ...stage,
        [event.target.name]: event.target.files[0],
      });
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // const data = converToFormData(stage);

    if (isEditing) {
      stageApi
        .updateStage(stage._id, stage.stageNumber, stage.title)
        .then(() => {
          // replace("/admin/v3/stages");
        });
    } else {
      stageApi.add(stage).then(() => {
        // replace("/admin/v3/stages");
      });
    }

    onCancel();
  };

  return (
    <React.Fragment>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">
                  {isEditing ? "Update" : "Add"} Stage
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Title</Label>
                        <Input
                          required
                          onChange={handleChange}
                          placeholder="Title"
                          name="title"
                          type="text"
                          value={stage.title}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Stage Number</Label>
                        <Input
                          required
                          onChange={handleChange}
                          placeholder="URL"
                          name="stageNumber"
                          type="select"
                          value={stage.stageNumber}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Description</Label>
                                                <Input
                                                    required
                                                    onChange={handleChange}
                                                    placeholder="Description"
                                                    name="descriptions"
                                                    type="textarea"
                                                    value={stage.descriptions}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row> */}

                  {/* <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label>Image</Label>
                                                <CustomInput
                                                    id="mainImage"
                                                    onChange={handleImageChange}
                                                    type="file"
                                                    name="image"
                                                    className="custom-file-input file__input"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row> */}

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        {isEditing ? "Update" : "Add"} Stage
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default AddStage;
