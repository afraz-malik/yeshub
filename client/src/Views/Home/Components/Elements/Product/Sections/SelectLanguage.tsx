import React, { FC, ReactElement, useState, useEffect } from "react"
import { ILanguage } from "../../../../../../Models/General"
import { HomeApis } from "../../../../../../Helpers/Request/Services/Home/Home"

export interface SelectLanguageProps {
    lang: string
    onChange: (lang: string) => void
    isStage?: boolean
}

const SelectLanguage: FC<SelectLanguageProps> = ({ lang, onChange, isStage = false }): ReactElement => {
    const [languages, setLanguages] = useState<ILanguage[]>([])

    useEffect(() => {
        HomeApis.languages(isStage).then(response => {
            setLanguages(response.data.data)
        })
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-end" style={{ marginTop: "5rem", marginBottom: "-5rem" }}>
                <select name={"lang"} className='language__select' onChange={event => onChange(event.target.value)} value={lang}>
                    {languages.map(({ title, shortCode, _id }) => (
                        <option value={shortCode} key={_id}>
                            {title}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default SelectLanguage
