import React, { useState, useEffect } from "react";
import { Col, FormGroup, Input } from "reactstrap";

import languageApi from "../../api/language";

const SelectLanguage = ({ selected = "eng", onChange, type = "product" }) => {
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        languageApi.active(type === "stage").then((response) => {
            setLanguages(response.data);
        });
    }, [type]);

    return (
        <Col md={6}>
            <FormGroup>
                <Input name="language" value={selected} onChange={onChange} type="select">
                    {languages.map(({ title, shortCode, _id }) => (
                        <option key={_id} value={shortCode}>
                            {title}
                        </option>
                    ))}
                </Input>
            </FormGroup>
        </Col>
    );
};

export default SelectLanguage;
