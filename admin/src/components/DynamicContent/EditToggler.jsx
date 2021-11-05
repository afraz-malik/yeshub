import React from "react";

const EditToggler = ({ text = "Edit", toggleHandler }) => {
    return (
        <span className="edit__mode" onClick={toggleHandler}>
            {text}
        </span>
    );
};

export default EditToggler;
