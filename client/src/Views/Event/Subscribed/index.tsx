import React, { useEffect, useState } from "react"
import MyEvents from "../../Profile/Events"

const List = () => {
    return <MyEvents onlySubscribed={true} title={"Subscribed Events"} />
}

export default List
