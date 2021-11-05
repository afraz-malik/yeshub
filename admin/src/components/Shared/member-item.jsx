import React, { useState } from "react";
import { Button } from "reactstrap";

import moderator from "../../api/moderator";
import assetUrl from "../../helper/assetUrl";
import isBaseEncoded from "../../helper/isBaseEncoded";
import paginationIndexCounter from "../../helper/paginationIndexCounter";

const MemberItem = ({
  member,
  deleteMember,
  index,
  communityId,
  currentPage,
  limit = 10,
}) => {
  const [isRequested, setRequested] = useState(
    /* member.isModerator || */ member.isInvited,
  );
  const [justInvited, setjustInvited] = useState(false); // just invited and not refreshed page

  const makeAsModerator = (id) => {
    moderator
      .sendInvite(communityId, id)
      .then(() => {
        setRequested(true);
        setjustInvited(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr key={member._id}>
      <td>{paginationIndexCounter(currentPage, index, limit)}</td>
      <td>{member.userName}</td>
      <td>
        <img
          src={
            isBaseEncoded(member.userImage)
              ? member.userImage
              : assetUrl(member.userImage)
          }
          alt={member.userName}
          className="table__image"
        />
      </td>
      <td className="text-right">
        {!isRequested && !member.isModerator && (
          <Button
            onClick={() => {
              setRequested(true);
              makeAsModerator(member._id);
            }}
            size="sm"
            className="mr-2"
            color="warning"
          >
            Make as Moderator
          </Button>
        )}
        {member.isModerator && (
          <Button disabled size="sm" className="mr-2" color="success">
            Already Moderator
          </Button>
        )}
        {(member.isInvited || justInvited) && (
          <Button disabled size="sm" className="mr-2" color="info">
            Already Invited
          </Button>
        )}

        <Button
          onClick={() => deleteMember(member._id)}
          size="sm"
          color="danger"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default MemberItem;
