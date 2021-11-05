import React from "react"
import { connect } from "react-redux"

import { RootState } from "../index"
import { login, logout } from "../actions/user"

const mapStateToProps = (state: RootState) => ({
    username: state.user.details,
})
const mapDispatchToProps = { login, logout }
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps
const UnconnectedAuth: React.FC<Props> = props => {
    // Do auth things here!
    return <>{props.username}</>
}
export const Auth = connect(
    mapStateToProps,
    mapDispatchToProps
)(UnconnectedAuth)
