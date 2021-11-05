import Select, { ValueType, OptionTypeBase, ActionMeta } from "react-select"
import makeAnimated from "react-select/animated"
import React, { ChangeEvent, FC, ReactElement, useEffect, useRef, useState } from "react"

import Form from "../../../../Components/Form/Form"
import FormInput from "../../../../Components/Form/FormInput"
import { OtherInfo } from "../../../../Interface/Profile/Stats"
import { Nationalities } from "../../../../Constants/Nationalities"
import { Months, Years } from "../../../../Constants/MonthYears"
import { user } from "../../../../Constants/getUserId"
import Notification from "../../../../Shared/Notification/Notification"

const animatedComponents = makeAnimated()

type FAQs = {
    otherInfo: OtherInfo
}

const FAQs: FC<FAQs> = ({ otherInfo }): ReactElement => {
    const [values, setValues] = useState<any>({
        identifyAs: user.otherInfo?.identifyAs || "",
        city: user.otherInfo?.city || "",
        nationalities: user.otherInfo?.nationalities || "",
        birthDetail: {
            month: user.otherInfo?.birthDetail.month || new Date().getMonth().toString(),
            year: user.otherInfo?.birthDetail.year || new Date().getFullYear().toString(),
        },
    })
    const ref = useRef(null)

    useEffect(() => {
        if (otherInfo) {
            setValues({ ...values, ...otherInfo })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otherInfo])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        type === "checkbox"
            ? setValues({
                  ...values,
                  disabilityGroup: {
                      ...values.disabilityGroup,
                      [name]: checked,
                  },
              })
            : setValues({ ...values, [name]: value })
    }

    const onNationalityChange = (e: ValueType<OptionTypeBase>, { action }: ActionMeta<OptionTypeBase>) => {
        switch (action) {
            case "select-option":
                if (e && e.length > 2) {
                    Notification("Maximum limit exceeds", "error")
                    return
                }
                break
            case "remove-value":
                if (Array.isArray(e)) {
                    setValues({ ...values, nationalities: e.map(e => e.value) })
                } else {
                    setValues({ ...values, nationalities: [] })
                }
                break
            default:
                return
        }
    }

    const onBirthChange = (e: Record<string, string>, type: string) => {
        const { value } = e
        setValues({
            ...values,
            birthDetail: {
                ...values.birthDetail,
                [type]: value.toString(),
            },
        })
    }

    const onChangeIdentifyAs = (e: Record<string, string>, name: string) => {
        setValues({
            ...values,
            identifyAs: {
                ...values.identifyAs,
                identifyAs: e.value,
            },
        })
    }

    return (
        <div className="mc-border px-5 mt-4">
            <h4 className="FAQ-head-text">Personal information</h4>

            <p className=" pb-2">
                The following questions below will help us serve you and the community better. We commit to keeping this
                information safe, and in no way will your response be attributed to you in any external communications.
            </p>
            <div className="inquo-from">
                <Form
                    submitUrl={"/user/otherInfo"}
                    data={values}
                    validate
                    method={"PUT"}
                    refreshUser
                    buttonText={"UPDATE"}
                    props={{ submitButtonClass: "btn btn-save" }}
                    submitBtnWrapperClass={"FAQ-form_save_btn"}
                >
                    <>
                        <div className="row">
                            <div className="col-12 col-md-12">
                                <label className="form-label1">1. What do you identify as?</label>
                                <Select
                                    ref={ref}
                                    onChange={(e: any) => onChangeIdentifyAs(e, "identifyAs")}
                                    className={"form-select"}
                                    name="identifyAs"
                                    options={[
                                        { value: "Male", label: "Male" },
                                        { value: "Female", label: "Female" },
                                        { value: "Prefer Not To Say", label: "Prefer Not To Say" },
                                    ]}
                                    components={animatedComponents}
                                    placeholder="Select one that most applies"
                                    defaultValue={values.identifyAs}
                                    classNamePrefix="react__select"
                                />
                                {/* <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="identifyAs"
                                        id="male"
                                        value="Male"
                                        onChange={onChange}
                                        checked={values.identifyAs === "Male"}
                                    />
                                    <label className="form-check-label" htmlFor="male">
                                        Man
                                    </label>
                                </div> */}
                                {/* <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="identifyAs"
                                        id="female"
                                        value="Female"
                                        onChange={onChange}
                                        checked={values.identifyAs === "Female"}
                                    />
                                    <label className="form-check-label" htmlFor="female">
                                        Woman
                                    </label>
                                </div> */}
                                {/* <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="identifyAs"
                                        id="preferNotToSay"
                                        value="Prefer Not To Say"
                                        checked={values.identifyAs === "Prefer Not To Say"}
                                        onChange={onChange}
                                    />
                                    <label className="form-check-label" htmlFor="preferNotToSay">
                                        Prefer Not To Say
                                    </label>
                                </div> */}
                            </div>
                        </div>
                    </>

                    <div className="row">
                        <div className="col-12 col-md-12">
                            <label htmlFor="date" className="form-label1">
                                3. From which city are you currently working?
                            </label>

                            <FormInput
                                name={"city"}
                                onChange={onChange}
                                labelClass={"form-label1"}
                                props={{ placeholder: "Enter City Here" }}
                                defaultValue={values.city}
                            />
                        </div>
                    </div>

                    <label htmlFor="date" className="form-label1">
                        4. When were you born?
                    </label>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <Select
                                ref={ref}
                                onChange={(e: any) => onBirthChange(e, "year")}
                                className={"form-select"}
                                options={Years(new Date().getFullYear() - 18)}
                                components={animatedComponents}
                                placeholder="Select Year"
                                defaultValue={values.birthDetail.year}
                                classNamePrefix="react__select"
                            />
                        </div>
                        <div className="col-12 col-md-6">
                            <Select
                                ref={ref}
                                onChange={(e: any) => onBirthChange(e, "year")}
                                className={"form-select"}
                                options={Months}
                                components={animatedComponents}
                                placeholder="Select Month"
                                defaultValue={values.birthDetail.month}
                                classNamePrefix="react__select"
                            />
                        </div>
                    </div>

                    <div className="row my-3">
                        <div className="col-12">
                            <label className="form-label1">5. What is your nationality?</label>
                        </div>

                        <div className="col-12">
                            <Select
                                isMulti
                                ref={ref}
                                onChange={onNationalityChange}
                                className={"form-select"}
                                options={Nationalities}
                                components={animatedComponents}
                                value={(values.nationalities || []).map((nationality: string) => ({
                                    label: nationality,
                                    value: nationality,
                                }))}
                                classNamePrefix="react__select"
                            />
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default FAQs
