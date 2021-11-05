import React, { useState, useEffect } from "react";
import EditToggler from "./EditToggler";
import HeaderForm from "./HeaderForm";

const HeaderContent = (props) => {
    const [isEditMode, toggleEditMode] = useState(false);
    const [product, setProduct] = useState({ ...props });

    useEffect(() => {
        setProduct({ ...props });
    }, [props]);

    const toggleEdit = () => {
        toggleEditMode(!isEditMode);
    };

    const handleSubmit = (values) => {
        setProduct({ ...values });
        toggleEdit();
        props.handleSubmit({ ...values });
    };

    return (
        <React.Fragment>
            {!isEditMode ? (
                <React.Fragment>
                    <h1 className="stage__title">{product.title}</h1>
                    <p>{product.description}</p>
                    <EditToggler toggleHandler={toggleEdit} />
                </React.Fragment>
            ) : (
                <HeaderForm {...props} handleSubmit={handleSubmit} toggleEdit={toggleEdit} />
            )}
        </React.Fragment>
    );
};

export default HeaderContent;
