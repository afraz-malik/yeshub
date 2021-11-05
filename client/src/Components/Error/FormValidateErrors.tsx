import React, { FC, useEffect, useState } from "react"

type ErrorsList = {
    errors: any
}

export const ErrorsList: FC<ErrorsList> = ({ errors }) => {
    const [allErrors, setErrors] = useState(errors)
    useEffect(() => {
        setErrors(errors)
    }, [errors])
    return (
        <div className={"errors-div"}>
            {Array.isArray(allErrors)
                ? allErrors.map((item: any, idx) => {
                      return (
                          <li
                              key={idx}
                              className={"error-list-item"}
                              style={{ color: "#f00", textAlign: "center" }}
                          >
                              {item}
                          </li>
                      )
                  })
                : Object.values(allErrors).map((item: any, idx) => {
                      return (
                          <li key={idx} className={"error-list-item"}>
                              {item}
                          </li>
                      )
                  })}
        </div>
    )
}
