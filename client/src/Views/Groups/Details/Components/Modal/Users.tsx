import React, { FC, ReactElement } from "react"
import { TrashIcon } from "../../../../../Shared/Images/Images"
import CommunitiesList from "../../../../../Helpers/Request/Services/Communities/Communities"
import { userId } from "../../../../../Constants/getUserId"
import { CommunityUsersList } from "../../../../../Interface/Communities/CommunityUsersInterface"

type CommunityUsers = {
    users: CommunityUsersList[]
    state: any
}

const CommunityUsers: FC<CommunityUsers> = ({
    users = [],
    state,
}): ReactElement => {
    return (
        <div className="grp-list-data mt-3">
            <ul className="list-unstyled">
                {users.map((item, idx) => (
                    <li key={idx}>
                        <div className="d-flex justify-content-between">
                            <div className="grp-members">
                                <span>{item.userName}</span>
                            </div>
                            {(userId === state.author_id ||
                                state.moderators.find(
                                    (item: { _id: string; userName: string }) =>
                                        item._id === userId
                                )) && (
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() =>
                                        CommunitiesList.removeUser(
                                            state._id,
                                            item._id
                                        )
                                    }
                                >
                                    <img src={TrashIcon} alt="del" />
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CommunityUsers
