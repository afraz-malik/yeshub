import * as React from "react"
import DateInput from "../../../Shared/DateInput"
import EventCharacteristics from "../../Event/Create/Component/EventCharacter"
import { IFilters } from "./ListView"

export interface AdvanceSearchBoxProps {
    onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    filters: IFilters
    onDateChange: (name: string, date: Date | null) => void
    onValueChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void
    resetFilter: () => void
}

const AdvanceSearchBox: React.FC<AdvanceSearchBoxProps> = ({
    onFilterChange,
    filters,
    onDateChange,
    resetFilter,
    onValueChange,
    onSubmit,
}) => {
    const [isOpen, toggle] = React.useState(false)

    React.useEffect(() => {
        if (!isOpen) {
            resetFilter()
        }
        // eslint-disable-next-line
    }, [isOpen])

    const onCharacterClick = () => {
        toggle(!isOpen)
    }

    return (
        <React.Fragment>
            <div className="advance__search-box">
                <div className="d-flex">
                    <div className="main__search-container">
                        <h6 className="search__title">Advance Search</h6>

                        <div className="search__form px-2">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row align-items-center">
                                        <div className="col-md-8">
                                            <div className="form__input-custom flex-wrap flex-md-nowrap">
                                                <label htmlFor="date">Date</label>

                                                <div className="col-12 col-md-6 pl-0 px-2 px-md-2">
                                                    <DateInput
                                                        onChange={date => onDateChange("startDate", date)}
                                                        value={filters.startDate}
                                                        name="startDate"
                                                    />
                                                </div>

                                                <div className="col-12 col-md-6  pl-0 px-2 px-md-2">
                                                    <DateInput
                                                        onChange={date => onDateChange("endDate", date)}
                                                        value={filters.endDate}
                                                        name="endDate"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form__input-custom">
                                                <label htmlFor="countryInput">Country</label>
                                                <div className="input__field">
                                                    <input
                                                        type="text"
                                                        value={filters.country}
                                                        name="country"
                                                        id="countryInput"
                                                        onChange={onValueChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-6 pr-md-0">
                                    <div className="form__input-custom">
                                        <label htmlFor="organization">Organization</label>
                                        <div className="input__field">
                                            <input
                                                onChange={onValueChange}
                                                name="organization"
                                                type="text"
                                                id="organization"
                                                value={filters.organization}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 pl-md-0">
                                    <div className="form__input-custom" onClick={onCharacterClick}>
                                        <label htmlFor="characteristics">Characteristics</label>
                                        <div className="input__field">
                                            <select
                                                onChange={onValueChange}
                                                name="characteristics"
                                                id="characteristics"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="btn btn-search-submit" onClick={onSubmit}>
                        Submit
                    </button>
                </div>
            </div>

            {isOpen ? (
                <div className="advance__search-box mt-3">
                    <EventCharacteristics onValueChange={onFilterChange} characteristics={filters.characteristics} />
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default AdvanceSearchBox
