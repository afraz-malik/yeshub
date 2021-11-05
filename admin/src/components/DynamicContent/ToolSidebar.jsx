import React from "react";
import EditToggler from "./EditToggler";
import { useState } from "react";
import ToolForm from "./ToolForm";
import assetUrl from "../../helper/assetUrl";
import DeleteHandler from "./DeleteHandler";

const ToolSidebar = (props) => {
    const [isEditMode, toggleEditMode] = useState(false);
    const [editTool, setEditTool] = useState(null);

    const toggleEdit = () => toggleEditMode(!isEditMode);

    const handleSubmit = (values) => {
        toggleEdit();
        if (!editTool) {
            props.handleSubmit({ ...values, _id: props._id });
        } else {
            props.handleSubmit({ ...values, _id: editTool._id });
        }
    };

    const addToolClick = () => {
        setEditTool(null);
        toggleEdit();
    };

    const handleEdit = (tool) => {
        setEditTool({ ...tool });
        toggleEdit();
    };

    return (
        <div className="bg-light-grey">
            <div>
                <h5 className="sidebar__heading">
                    <div>Resources</div>
                    <EditToggler text="Add Tool" toggleHandler={addToolClick} />
                </h5>
            </div>

            <div className="policies">
                {!isEditMode ? (
                    <React.Fragment>
                        {props.tools.map((tool) => (
                            <div className="policy__item" key={tool._id}>
                                <div className="policy__img">
                                    <img src={assetUrl(tool.file)} alt={tool.title} />
                                </div>

                                <div className="policy__actions">
                                    <EditToggler toggleHandler={() => handleEdit(tool)} />
                                    <DeleteHandler handler={() => props.handleDelete(tool._id)} />
                                </div>

                                <div className="policy__link">
                                    <a href={tool.redirectUrl} rel="noopener noreferrer" target="_blank">
                                        {tool.title}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ) : (
                    <ToolForm {...props} {...editTool} handleSubmit={handleSubmit} toggleHandler={toggleEdit} />
                )}
            </div>
        </div>
    );
};

export default ToolSidebar;
