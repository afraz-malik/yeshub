import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Button,
  Jumbotron,
  Container,
  FormGroup,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  Form,
} from "reactstrap";
import stageApi from "../../api/stage";
import stageSectionApi from "../../api/stage-section";
import stageToolApi from "../../api/stage-recommended-tool";
import JoditEditor from "jodit-react";
import HeaderContent from "../../components/DynamicContent/HeaderContent";
import SectionItem from "../../components/DynamicContent/SectionItem";
import ToolSidebar from "../../components/DynamicContent/ToolSidebar";
import assetUrl from "../../helper/assetUrl";
import converToFormData from "../../helper/convertToFormData";
import isBaseEncoded from "../../helper/isBaseEncoded";

import { EDITOR_CONFIG } from "../../config/config";
import "./../../assets/css/landing__pages.css";
import SelectLanguage from "../Products/SelectLanguage";
import section from "../../api/product-section";
import { section_data } from "./stage-data";
import media from "../../api/media-upload";
import AddStage from "./AddStage";
const sortStages = (stages) => {
  return stages.sort((a, b) => a.stageNumber - b.stageNumber);
};
let lastSelectedStage = 0;

const Stages = () => {
  const [stages, setStages] = useState([]);
  const [language, setLanguage] = useState("eng");
  const [selectedSection, setselectedSection] = useState(null);

  // const [sections, setsections] = useState([]);

  const [selectedStage, setSelectedStage] = useState({
    title: "",
    shortDescription: "",
    image: "",
    description: "",
  });
  const [sections, setSections] = useState([section_data]);
  const [tools, setTools] = useState([]);
  const [addsection, setaddsection] = useState(0);

  const [addtool, setaddtool] = useState(false);
  const [isEditStage, setisEditStage] = useState(false);
  const getData = () => {
    stageApi
      .fetchv3()
      .then((response) => {
        if (response.data.length > 0) {
          const sortedStages = sortStages(response.data);
          setStages([...sortedStages]);
          setSelectedStage({ ...sortedStages[0] });
          if (sortedStages[0].sections.length > 0) {
            setselectedSection({ ...sortedStages[0].sections[0] });
          } else {
            setselectedSection(null);
          }
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSectionChange = (event) => {
    const sectionIndex = selectedStage.sections.findIndex(
      (section) => section._id === event.target.value,
    );
    console.log(selectedStage.sections[sectionIndex]);
    let sec = selectedStage.sections[sectionIndex];
    setselectedSection({ ...sec });
  };

  const handleStageChange = (event) => {
    const sIndex = stages.findIndex(
      (stage) => stage._id === event.target.value,
    );
    if (sIndex !== -1) {
      lastSelectedStage = sIndex;
      setSelectedStage({ ...stages[sIndex] });
      if (stages[sIndex].sections.length > 0) {
        setselectedSection({ ...stages[sIndex].sections[0] });
      } else {
        setselectedSection(null);
      }
    }
  };

  const addAnotherSection = () => {
    setSections([
      ...sections,
      {
        title: "New Section",
        body: "New Section Body",
      },
    ]);
  };

  const handleStageSubmit = (values) => {
    delete values.videoUrl;
    const data = converToFormData({
      ...values,
      stageNumber: selectedStage.stageNumber,
      description: values.description,
    });
    stageApi.update(data, selectedStage._id, language).then((response) => {
      const stgIndex = stages.findIndex(
        (product) => product._id === selectedStage._id,
      );

      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        setSelectedStage({
          ...selectedStage,
          ...values,
          image: e.target.result,
        });
        stages[stgIndex] = {
          ...stages[stgIndex],
          ...values,
          image: e.target.result,
        };
        setStages(stages);
      });

      reader.readAsDataURL(values.image);
    });
  };

  const handleSectionSubmit = (values) => {
    if (values._id) {
      stageSectionApi
        .update(values, selectedStage._id, values._id, language)
        .then((response) => {
          const sId = selectedStage.sections.findIndex(
            (section) => section._id === values._id,
          );
          selectedStage.sections[sId] = values;
          setSelectedStage({
            ...selectedStage,
            sections: [...selectedStage.sections],
          });
        });
    } else {
      stageSectionApi
        .add({ ...values, stageId: selectedStage._id }, language)
        .then((response) => {
          selectedStage.sections = [...selectedStage.sections, response.data];
          setSelectedStage(selectedStage);
        });
    }
  };

  const handleToolSubmit = (values) => {
    if (values._id) {
      stageToolApi
        .update(values, selectedStage._id, values._id, language)
        .then((response) => {
          const toolIndex = tools.findIndex((tool) => tool._id === values._id);
          selectedStage.recommendedTools[toolIndex] = { ...response.data };

          setSelectedStage({
            ...selectedStage,
            recommendedTools: [...selectedStage.recommendedTools],
          });
        });
    } else {
      stageToolApi
        .add({ ...values, stageId: selectedStage._id }, language)
        .then((response) => {
          setSelectedStage({
            ...selectedStage,
            recommendedTools: [...tools, response.data],
          });
        });
    }
  };

  const deleteSectionHandler = (sid) => {
    stageSectionApi.delete(selectedStage._id, sid, language).then(() => {
      const sects = selectedStage.sections.filter(
        (section) => section._id !== sid,
      );
      setSelectedStage({ ...selectedStage, sections: sects });
    });
  };

  const deleteToolHandler = (tid) => {
    stageToolApi.delete(selectedStage._id, tid, language).then(() => {
      const sTools = tools.filter((tool) => tool._id !== tid);

      setSelectedStage({
        ...selectedStage,
        recommendedTools: [...sTools],
      });
    });
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="content bg-white pt-4">
        <Container>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Input
                  name="productDropDown"
                  value={selectedStage._id}
                  onChange={handleStageChange}
                  type="select"
                >
                  {stages.map((stage) => (
                    <option key={stage._id} value={stage._id}>
                      ({stage.stageNumber}) {stage.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                {selectedStage && selectedStage?.sections?.length > 0 && (
                  <Input
                    name="productDropDown"
                    value={selectedSection?._id}
                    onChange={(e) => handleSectionChange(e)}
                    type="select"
                  >
                    {selectedStage.sections.map((section, index) => (
                      <option key={section._id} value={section._id}>
                        ({index + 1}) {section.title}
                      </option>
                    ))}
                  </Input>
                )}
              </FormGroup>
            </Col>
          </Row>
        </Container>
        {isEditStage && selectedStage.title && (
          <AddStage
            editing={true}
            onCancel={() => setisEditStage(false)}
            stageData={{
              title: selectedStage?.title,
              stageNumber: selectedStage?.stageNumber,
              _id: selectedStage?._id,
            }}
          />
        )}
        <section className="mb-4">
          <Container>
            <Row>
              <Col>
                <Jumbotron className="p-4 bg-light-grey">
                  <Row>
                    <Col md={12}>
                      <h3>
                        {selectedStage.title}{" "}
                        <span
                          style={{ color: "blue" }}
                          onClick={() => setisEditStage(true)}
                        >
                          (edit)
                        </span>
                      </h3>
                    </Col>
                  </Row>
                </Jumbotron>
              </Col>
            </Row>
            {addsection === 1 && (
              <EditSection
                isEditing={false}
                section={{
                  stageID: selectedStage._id,
                  image: "",
                  title: "",
                  description: "",
                  mainContent: "",
                }}
                onUpdated={(data) => {
                  getData();
                }}
                onSubmitComplete={(data) => {
                  setSections([...sections, { ...data }]);
                  setaddsection(0);
                }}
                onCancel={() => setaddsection(0)}
              />
            )}
            {addsection === 2 && (
              <EditSection
                isEditing={true}
                section={{
                  stageID: selectedStage._id,
                  image: selectedSection?.image,
                  title: selectedSection?.title,
                  description: selectedSection?.description,
                  subContent: selectedSection.subContent,
                  mainContent: selectedSection.mainContent,
                  content: selectedSection?.content,
                  _id: selectedSection._id,
                }}
                onUpdated={() => {
                  getData();
                }}
                onSubmitComplete={(data) => {
                  console.log("data", data);
                  setSections([...sections, { ...data }]);
                }}
                onCancel={() => setaddsection(0)}
              />
            )}
            <section
              style={{ backgroundColor: "#f8f8f8", fontSize: "14px" }}
              className="p-4"
            >
              {/* {selectedStage?.sections?.length > 0 ? (
                selectedStage.sections.map((item, index) => (
                  <PreviewSection section={item} key={index} />
                ))
              ) : (
                <p className="text-center">
                  Currently There is no Section in the stage.
                </p>
              )} */}
              {selectedSection ? (
                <PreviewSection
                  section={selectedSection}
                  onEdit={(section) => setaddsection(2)}
                  onToolAdded={(tool) => {
                    selectedSection.tools.push(tool);
                    setselectedSection({ ...selectedSection });
                  }}
                />
              ) : (
                <p className="text-center">
                  Currently There is no Section in the stage.
                </p>
              )}
            </section>

            <span onClick={() => setaddsection(1)}> + Add new section</span>
          </Container>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Stages;

export const EditSection = ({
  section,
  isEditing,
  onSubmitComplete,
  onCancel,
  onUpdated,
}) => {
  const [_section, setsection] = useState(section);
  const [subContent, setsubContent] = useState(section.content); // subContent replaced by content
  const editor = useRef(null);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setsection({ ..._section, [name]: value });
  };

  const onSectionDescriptionChange = (content) => {
    setsubContent(content);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSubmitComplete({ ..._section, subContent: subContent });
    stageApi
      .addSection(
        _section.stageID,
        _section.title,
        _section.image,
        _section.description,
        subContent,
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const onUpdate = (e) => {
    e.preventDefault();
    // onSubmitComplete({ ..._section, subContent: subContent });
    stageApi
      .update(
        _section._id,
        _section.title,
        _section.image,
        _section.description,
        subContent,
      )
      .then((res) => onUpdated())
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">
                  {isEditing ? "Update" : "Add"} Section
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Form
                  onSubmit={(e) => {
                    if (isEditing) {
                      onUpdate(e);
                    } else {
                      onSubmit(e);
                    }
                  }}
                >
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
                          value={_section.title}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>Image</Label>
                        <ImageUploader
                          image={_section.image}
                          onCanceled={() => {}}
                          onUploaded={(f) =>
                            setsection({ ..._section, image: f })
                          }
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label>description</Label>
                        <textarea
                          required
                          className="form-control"
                          onChange={handleChange}
                          placeholder="description"
                          name="description"
                          type="text"
                          value={_section.description}
                        >
                          {_section.description}
                        </textarea>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Content</Label>
                        <JoditEditor
                          ref={editor}
                          value={subContent}
                          config={EDITOR_CONFIG}
                          onChange={onSectionDescriptionChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        {isEditing ? "Update" : "Add"} Section
                      </Button>
                      <Button
                        className="btn-round"
                        color="secondary"
                        type="button"
                        onClick={() => onCancel()}
                      >
                        Cancel
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

export const AddTool = ({
  isEditing,
  onSubmitComplete,
  onCanceled,
  sectionID,
}) => {
  const [_tool, settool] = useState({ title: "", items: [] });

  const handleChange = (e) => {
    const { value, name } = e.target;
    settool({ ..._tool, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    stageToolApi
      .add({ ..._tool, sectionID })
      .then((res) => {
        console.log("--- res ---");
        console.log(res);
        console.log("--- res ---");
        onSubmitComplete(_tool);
      })
      .catch((er) => console.log(er));
  };

  return (
    <React.Fragment>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user" style={{ border: "1px solid black" }}>
              <CardHeader>
                <CardTitle tag="h5">
                  {isEditing ? "Update" : "Add"} Tool
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
                          onChange={(e) =>
                            settool({ ..._tool, title: e.target.value })
                          }
                          placeholder="Title"
                          name="title"
                          type="text"
                          value={_tool.title}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button className="btn" color="primary" type="submit">
                        {isEditing ? "Update" : "Add"} Tool
                      </Button>
                      <Button
                        className="btn btn-secondary"
                        onClick={() => onCanceled()}
                      >
                        Cancel
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

export const SectionTools = ({ tool }) => {
  const [addtool, setaddtool] = useState(false);
  const [additem, setadditem] = useState(false);
  const [_tool, set_tool] = useState(tool);
  const onViewableChange = (v, itemid) => {
    stageToolApi
      .updateViewable(tool._id, itemid, v)
      .then((res) => alert("updated"))
      .catch((err) => alert(err.message));
  };
  const onDownloadableChange = (v, itemid) => {
    stageToolApi
      .updateDownloadable(tool._id, itemid, v)
      .then((res) => alert("updated"))
      .catch((err) => alert(err.message));
  };
  const onToolItemAdded = (toolItem) => {
    stageToolApi
      .addToolItem(tool._id, {
        ...toolItem,
      })
      .then((res) => {
        setadditem(false);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Container style={{ border: "1px solid black", margin: "5px 0" }}>
        <Row>
          <Col md={12}>
            <p className="mt-4" style={{ marginBottom: "5px" }}>
              <strong>{tool.title}</strong>
            </p>
            <div className="">
              <table className="table table-striped" style={{ width: "100%" }}>
                {tool.items.map((item, index) => (
                  <tr>
                    {/* {JSON.stringify(item)} */}
                    <td>{item.title}</td>
                    <td>0 views</td>
                    <td>
                      <CustomCheckbox
                        value={item.viewAble}
                        onChange={(e) => onViewableChange(e, item._id)}
                      />
                      is Viewable?
                    </td>
                    <td>
                      <CustomCheckbox
                        value={item.downloadAble}
                        onChange={(e) => onDownloadableChange(e, item._id)}
                      />
                      is downloadable?
                    </td>

                    <td>
                      <button className="btn btn-sm btn-outline-primary">
                        <a href={item.downloadLink}>
                          <i className="fa fa-download"></i>
                        </a>
                      </button>
                    </td>
                  </tr>
                ))}
              </table>

              {!additem && (
                <strong onClick={() => setadditem(true)}>
                  + add new tool item
                </strong>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {additem && (
              <AddToolItem
                onSubmit={(d) => {
                  onToolItemAdded(d);
                  _tool.items.push(d);
                  set_tool({ ..._tool });
                }}
                onCanceled={() => setadditem(false)}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export const PreviewSection = ({ section, onToolAdded, onEdit }) => {
  // const [_section, set_section] = useState(section);
  const [addtool, setaddtool] = useState(false);
  return (
    <>
      <Row>
        {/* <Col style={{ background: "gray" }} md={12}> */}
        <Col md={6}>
          <h2>
            {section.title}{" "}
            <strong
              onClick={onEdit}
              style={{ cursor: "pointer", fontSize: "14px" }}
            >
              ( Edit section )
            </strong>
          </h2>
          <p>
            <strong>description:</strong>
          </p>
          <p>{section.description}</p>
        </Col>
        <Col md={6}>
          <img
            src={assetUrl(section.image)}
            className="img-fluid stage__img"
            alt={"N/A"}
          />
        </Col>

        <Col md={12}>
          <p>
            <strong>content:</strong>
          </p>
          <div dangerouslySetInnerHTML={{ __html: section.content }} />
        </Col>
      </Row>

      <p>
        <strong>Tools:</strong>
      </p>
      {section.tools.map((tool, index) => (
        <SectionTools tool={tool} />
      ))}

      {!addtool && (
        <strong onClick={() => setaddtool(true)}>+ Add new tool </strong>
      )}
      {addtool && (
        <AddTool
          sectionID={section._id}
          onSubmitComplete={(d) => {
            onToolAdded(d);
          }}
          onCanceled={() => setaddtool(false)}
        />
      )}
      <hr />
      <br />
    </>
  );
};

export const AddToolItem = ({ onSubmit, onCanceled }) => {
  const onFileChange = (e) => {};

  const handleCheckBoxChange = (e) => {
    settoolitem({ ...toolitem, forOnlyStaff: e.target.checked });
  };

  const [toolitem, settoolitem] = useState({
    title: "",
    downloadLink: "",
    previewLink: "",
    downloadAble: false,
    forOnlyStaff: false,
    _id: "",
  });

  return (
    <>
      <Row style={{ border: "1px solid black" }}>
        <Col md={12}>
          <div className="d-flex flex-row justify-content-between">
            <input
              style={{ padding: "10px", maxWidth: "250px" }}
              type="text"
              className="form-control mb-auto mt-auto"
              placeholder="title"
              onChange={(e) =>
                settoolitem({ ...toolitem, title: e.target.value })
              }
            />
            <span style={{ marginTop: "auto", marginBottom: "auto" }}>
              <FileUploader
                onUploaded={(e) =>
                  settoolitem({
                    ...toolitem,
                    downloadLink: e.data,
                    previewLink: e.data,
                  })
                }
              />
            </span>
            <label className="mt-auto mb-auto" htmlFor="">
              <input
                type="checkbox"
                value={toolitem.forOnlyStaff}
                onChange={(e) => handleCheckBoxChange(e)}
              />{" "}
              Only For Staff
            </label>
            <span className="mb-auto mt-auto">
              <button
                className="btn btn-round btn-primary m-auto"
                onClick={() => onSubmit(toolitem)}
              >
                Add
              </button>
              <button
                className="btn btn-round btn-secondary m-auto"
                onClick={() => onCanceled()}
              >
                cancel
              </button>
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
};

export const FileUploader = ({ onUploaded }) => {
  const onChange = (e) => {
    let fd = new FormData();
    fd.append("images", e.target.files[0]);

    media
      .upload(fd)
      .then((res) => {
        console.log(res);
        onUploaded(res);
      })
      .catch((Err) => console.log(JSON.stringify(Err)));
  };

  return (
    <>
      <input type="file" onChange={(e) => onChange(e)} />
    </>
  );
};

export const ImageUploader = ({ image, onUploaded, onCanceled }) => {
  const [preview, setpreview] = useState(image);
  const [loading, setloading] = useState(false);
  const handleFileChange = (e) => {
    setloading(true);
    let fd = new FormData();
    fd.append("images", e.target.files[0]);
    media
      .upload(fd)
      .then((res) => {
        setpreview(res.data);
        setloading(false);
        onUploaded(res.data);
      })
      .catch((err) => {
        setloading(false);
        console.log(err);
      });
  };
  return (
    <div className="d-flex">
      {preview ? (
        <div style={{ position: "relative" }} className="d-flex p-relative">
          <img
            src={assetUrl(preview)}
            width="100px"
            alt={"section"}
            key={Math.random() * 123123123}
          />
          <span
            onClick={() => {
              setpreview("");
              onCanceled();
            }}
            className="d-flex"
            style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              border: "1px solid gray",
              borderRadius: "50%",
              width: "19px",
              height: "19px",
              cursor: "pointer",
              background: "white",
            }}
          >
            <i className="m-auto fa fa-times"></i>
          </span>
        </div>
      ) : (
        <Input
          style={{ opacity: 1 }}
          type="file"
          onChange={(e) => handleFileChange(e)}
        />
      )}
      {loading && (
        <span>
          <i className="fa fa-spin"></i>
        </span>
      )}
    </div>
  );
};

export const CustomCheckbox = ({ value, onChange }) => {
  const [state, setstate] = useState(value);
  return (
    <>
      <input
        style={{ marginRight: "10px" }}
        type="checkbox"
        checked={state}
        name="checkbox"
        onChange={(e) => {
          setstate(e.target.checked);
          onChange(e.target.checked);
        }}
      />
    </>
  );
};
