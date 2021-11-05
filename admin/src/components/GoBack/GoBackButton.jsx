import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

const GoBackButton = ({ floatRight = false }) => {
    const { goBack } = useHistory();
    return (
        <Button color="danger" size="sm" onClick={goBack} className={floatRight ? "float-right" : ""}>
            Go Back
        </Button>
    );
};

export default GoBackButton;
