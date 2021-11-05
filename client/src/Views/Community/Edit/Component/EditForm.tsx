import React, { FC, ReactElement, useState, ChangeEvent, useEffect } from "react"
import Form from "../../../../Components/Form/Form"
import FormTextArea from "../../../../Components/Form/FormTextArea"
import FormInput from "../../../../Components/Form/FormInput"
import { useHistory } from "react-router-dom"

type CommunityId = {
    state: Record<string, any>
}

const EditForm: FC<CommunityId> = ({ state }): ReactElement => {
    const { goBack } = useHistory()
    const [rules, setRules] = useState<string[]>(state.rules)
    const [data, setData] = useState({
        ID: state._id,
        name: state.name,
        description: state.description,
        rules: rules,
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        setData({ ...data, rules: rules })
        // eslint-disable-next-line
    }, [rules])

    const onAddRules = () => {
        setRules(rules.concat(""))
    }

    const onChangeRules = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        let clone = rules
        clone[index] = e.target.value
        setRules([...clone])
    }

    return (
        <div className="mc-border">
            <Form
                submitUrl="/knowledgeGroup/update"
                className=""
                validate
                data={data}
                method={"PUT"}
                buttonText={"POST"}
                props={{
                    extraSubmitButtons: (
                        <button type="button" className="btn btn-draft" onClick={goBack}>
                            CANCEL
                        </button>
                    ),
                }}
                submitBtnWrapperClass={"form-group text-right mb-0 pt-1"}
            >
                <label className="form-label text-uppercase">Description</label>
                <FormTextArea
                    name={"description"}
                    onChange={onChange}
                    props={{ rows: 3, placeholder: "Intro of the Community" }}
                    className={"form-control form-input2"}
                    defaultValue={data.description}
                />
                <label className="form-label">RULES OF COMMUNITY</label>
                {rules.map((item, idx) => (
                    <FormInput
                        key={idx}
                        name="rule"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeRules(e, idx)}
                        props={{
                            placeholder: "DESCRIPTION (OPTIONAL)",
                            value: item,
                        }}
                        className={"form-control form-input2 mb-3"}
                    />
                ))}
                <div className="add-sub-events">
                    <span onClick={onAddRules}>
                        <span style={{ fontSize: 18 }}>+ Add More</span>
                    </span>
                </div>
            </Form>
        </div>
    )
}

export default EditForm
