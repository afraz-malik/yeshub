import React from "react";
import { Row, Col, Button } from "reactstrap";

const FormBtns = ({ onCancelClick }) => {
    return (
        <Row>
            <Col className="text-center">
                <Button size="sm" color="warning" className="mr-2">
                    Save
                </Button>
                <Button onClick={onCancelClick} size="sm" outline={true} color="warning">
                    Cancel
                </Button>
            </Col>
        </Row>
    );
};

export default FormBtns;
