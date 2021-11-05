import React, { ChangeEvent, FC, Fragment, ReactElement, useEffect, useState } from "react"

import Form from "../../../../Components/Form/Form"
import FormInput from "../../../../Components/Form/FormInput"
import FormTextArea from "../../../../Components/Form/FormTextArea"
import Notification from "../../../../Shared/Notification/Notification"
import { MetaInfo, ProjectProgram } from "../../../../Interface/Profile/Stats"

type MoreInfo = {
    metaInfo: MetaInfo
}

type MetaInfoForm = {
    project: Partial<ProjectProgram>[]
    projectProgram: string
    organization: string
    position: string
    departmentTeam: string
    supervisorManager: string
    homeOffice: string
}

const MoreInformationForm: FC<MoreInfo> = ({ metaInfo }): ReactElement => {
    const [projects, setProjects] = useState([
        {
            title: "",
            description: "",
        },
    ])
    const [values, setValues] = useState<MetaInfoForm>({
        project: projects,
        projectProgram: "",
        organization: "",
        position: "",
        departmentTeam: "",
        supervisorManager: "",
        homeOffice: "",
    })

    const [tooltip, showTooltip] = useState(false)

    const ToggleTooltip = () => {
        showTooltip(state => !state)
    }

    useEffect(() => {
        delete values.projectProgram
        setValues({ ...values, project: projects })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projects])

    useEffect(() => {
        console.log(metaInfo)
        setValues({
            ...values,
            departmentTeam: metaInfo?.departmentTeam || "",
            homeOffice: metaInfo?.homeOffice || "",
            organization: metaInfo?.organization || "",
            position: metaInfo?.position || "",
            project: metaInfo?.projectProgram || [],
            supervisorManager: metaInfo?.supervisorManager || "",
        })
        if (metaInfo) {
            metaInfo.projectProgram.forEach((item: any) => {
                return delete item._id
            })
            if (metaInfo.projectProgram.length) {
                setProjects(metaInfo.projectProgram)
            } else {
                setProjects([{ title: "", description: "" }])
            }
        }
        // eslint-disable-next-line
    }, [metaInfo])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        type === "checkbox"
            ? setValues({
                  ...values,
                  [name]: checked,
              })
            : setValues({ ...values, [name]: value })
    }

    const onAddProject = () => {
        setProjects(
            projects.concat({
                title: "",
                description: "",
            })
        )
    }
    const onRemoveProject = (index: number) => {
        if (projects.length === 1) {
            Notification("Minimum one project is required", "info")
            return
        }
        let clone = projects
        clone.splice(index, index)
        setProjects([...clone])
    }

    const onProjectChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const { name, value, type, checked } = e.target
        const cloneProjects = projects
        cloneProjects[id] = {
            ...cloneProjects[id],
            [name]: type === "checkbox" ? checked : value,
        }
        setProjects(cloneProjects)
    }

    return (
        <div className="mc-border px-5 mt-4">
            <div className="pb-2 mb-3 tooltip">
                <h5 className="event-head-text">Background</h5>
                <p>
                    This information will be used to help us approve your posts in Communities that require screening of
                    submissions. Only YES!HUB admin will have full visibility of your input here. Misrepresentation is a
                    violation of Community Standards.
                </p>
            </div>
            <div className="more-info-form">
                <div className="row">
                    <div className="col-md-12">
                        <Form
                            submitUrl={"/user/moreInfo"}
                            data={values}
                            method={"PUT"}
                            refreshUser
                            props={{ submitButtonClass: "btn btn-save" }}
                            submitBtnWrapperClass={"more-info-form_save_btn"}
                            buttonText={"Update"}
                        >
                            <div className="row">
                                <div className="col-12">
                                    <label className="form-check-label" htmlFor="organization">
                                        organization
                                    </label>
                                    <FormInput
                                        type={"text"}
                                        name={"organization"}
                                        onChange={onChange}
                                        props={{
                                            placeholder: "Organization",
                                        }}
                                        defaultValue={values.organization}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <label className="form-check-label" htmlFor="organization">
                                        position
                                    </label>
                                    <FormInput
                                        type={"text"}
                                        name={"position"}
                                        onChange={onChange}
                                        props={{ placeholder: "Position" }}
                                        defaultValue={values.position}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-check-label" htmlFor="organization">
                                        Department or Team
                                    </label>
                                    <FormInput
                                        type={"text"}
                                        name={"departmentTeam"}
                                        onChange={onChange}
                                        props={{
                                            placeholder: "Department/Team",
                                        }}
                                        defaultValue={values.departmentTeam}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label className="form-check-label" htmlFor="organization">
                                        HR Office Email Address
                                    </label>
                                    <FormInput
                                        type={"email"}
                                        name={"supervisorManager"}
                                        onChange={onChange}
                                        props={{
                                            placeholder: "Email Address of HR Officer or Department",
                                        }}
                                        defaultValue={values.supervisorManager}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <label className="form-check-label" htmlFor="organization">
                                        Home Address
                                    </label>
                                    <FormInput
                                        type={"text"}
                                        name={"homeOffice"}
                                        onChange={onChange}
                                        props={{
                                            placeholder: "Home Office",
                                        }}
                                        defaultValue={values.homeOffice}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <h6 className="event-head-text">Projects and Programs</h6>
                            </div>
                            <div className="project_container">
                                {projects.map((item, idx) => (
                                    <Fragment key={idx}>
                                        <div className="row d-flex justify-content-end mr-2 mb-2">
                                            <i className="fa fa-times" onClick={() => onRemoveProject(idx)}>
                                                X
                                            </i>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label className="form-check-label" htmlFor="organization">
                                                    Name
                                                </label>
                                                <div className="form-group">
                                                    <FormInput
                                                        type={"text"}
                                                        name={"title"}
                                                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                            onProjectChange(e, idx)
                                                        }
                                                        props={{
                                                            placeholder: "Name of Project/Program",
                                                        }}
                                                        defaultValue={item.title}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <label className="form-check-label" htmlFor="organization">
                                                    About
                                                </label>
                                                <FormTextArea
                                                    name={"description"}
                                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                        onProjectChange(e, idx)
                                                    }
                                                    props={{
                                                        placeholder:
                                                            "Short description of your work and/or about the project/program",
                                                        rows: "5",
                                                    }}
                                                    defaultValue={item.description}
                                                />
                                            </div>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>

                            <div className="add-sub-events mb-2 pb-1">
                                <span>
                                    <span style={{ fontSize: 14 }} onClick={onAddProject}>
                                        + Add another project or program
                                    </span>
                                </span>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreInformationForm
