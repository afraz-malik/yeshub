import React, { FC, ReactElement, useEffect, useState } from "react"
import { Redirect, useParams } from "react-router-dom"

import Loader from "../../Shared/Loader"
import { isLoggedIn } from "../../Hooks/Auth/getAuth"
import { Verify } from "../../Helpers/Request/Services/Verify/Email"

const VerifyEmail: FC = (): ReactElement => {
    const [loading, setLoading] = useState(true)
    const { email, hash } = useParams()
    const [count, setCount] = useState(2)

    useEffect(() => {
        Verify.email(email || "", hash || "").then(() => {
            setLoading(false)
        })
    }, [email, hash])

    useEffect(() => {
        let counter: any
        if (!loading) {
            setTimeout(() => {
                window.location.href = "/profile/settings"
            }, 2000)
            counter = window.setInterval(() => {
                setCount(count - 1)
            }, 1000)
        }
        return () => clearInterval(counter)
        // eslint-disable-next-line
    }, [loading])

    if (isLoggedIn) {
        return <Redirect to={{ pathname: "/" }} />
    }

    return (
        <>
            <section>
                <div className="main-content pb-50">
                    <div className="main-content-wrap">
                        <div className="mx_width" style={{ maxWidth: 750 }}>
                            <div className="main-content-body">
                                <div className="mc-mid pt-lg-0 pt-5">
                                    <div className="mc-mid-content">
                                        <div className="mc-mid-wrap">
                                            <div
                                                className={
                                                    "post-container mt-5"
                                                }
                                            >
                                                <div className="post-wrap">
                                                    <div className="post-body">
                                                        <div className="ps-left">
                                                            <div className="left-wrapper">
                                                                {loading ? (
                                                                    <div>
                                                                        <h4 className="text-center">
                                                                            Verifying
                                                                        </h4>
                                                                        <Loader />
                                                                    </div>
                                                                ) : (
                                                                    <p className="d-flex justify-content-center">
                                                                        Email
                                                                        Verified
                                                                        Successfully,
                                                                        Redirecting
                                                                        to
                                                                        Settings
                                                                        in
                                                                        &nbsp;
                                                                        {count}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VerifyEmail
