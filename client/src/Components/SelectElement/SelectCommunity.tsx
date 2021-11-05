import React, { FC, ReactElement, useEffect, useState } from "react"

import CommunitiesList from "../../Helpers/Request/Services/Communities/Communities"
import CommunitiesListInterface from "../../Interface/Communities/CommunitiesListInterface"
import FormSelect from "../Form/FormSelect"

type SelectCommunity = {
    onSelect: Function
    selectedCommunity: string
}

let SelectCommunity: FC<SelectCommunity> = ({ onSelect, selectedCommunity }): ReactElement => {
    const [list, setList] = useState([])
    useEffect(() => {
        CommunitiesList.fetchList().then(response => {
            setList(response.data.data.joinedCommunities)
        })
    }, [])
    return (
        <FormSelect
            name={"knowledgeGroup"}
            onChange={onSelect}
            inputWrapperClass={"comuunity-dropdown mt-3"}
            label={<span className="stroke-line" />}
            labelClass={"coummunity-slect-label"}
            className={"form-control col-12"}
            defaultValue={selectedCommunity}
            value={selectedCommunity}
            isCommunity
        >
            <Options list={list} />
        </FormSelect>
    )
}

const Options: FC<CommunitiesListInterface> = ({ list = [] }): ReactElement => {
    return (
        <React.Fragment>
            {list.map(item => (
                <option value={item._id} key={item._id}>
                    {item.name}
                </option>
            ))}
        </React.Fragment>
    )
}

export default SelectCommunity
