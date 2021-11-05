import React, { useState, useEffect } from "react";

import EditToggler from "./EditToggler";
import DeleteHandler from "./DeleteHandler";
import SectionForm from "./SectionForm";

const SectionItem = (props) => {
    const [isEditingMode, toggleEditMode] = useState(false);
    const [section, setSection] = useState({ ...props });

    useEffect(() => {
        setSection({ ...props });
    }, [props]);

    const toggleEdit = () => toggleEditMode(!isEditingMode);

    const handleSubmit = (values) => {
        props.handleSubmit({ ...values, _id: props._id });
        setSection(values);
        toggleEdit();
    };

    const deleteSectionHandler = () => {
        props.sectionDeleteHandler(section._id);
    };

    return (
        <React.Fragment>
            {!isEditingMode ? (
                <section className="section__item">
                    <h4 className="faq__heading">
                        {section.title}
                        <EditToggler toggleHandler={toggleEdit} />
                        <DeleteHandler handler={deleteSectionHandler} />
                    </h4>
                    <p className="faq__description" dangerouslySetInnerHTML={{ __html: section.body }} />
                </section>
            ) : (
                <SectionForm {...section} handleSubmit={handleSubmit} toggleEdit={toggleEdit} />
            )}
        </React.Fragment>
    );
};

export default SectionItem;
