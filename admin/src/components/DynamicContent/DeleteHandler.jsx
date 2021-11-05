import React from "react";

const DeleteHandler = ({ text = "Delete", handler }) => {
    return (
        <span className="edit__mode" onClick={handler}>
            {text}
        </span>
    );
};

export default DeleteHandler;
