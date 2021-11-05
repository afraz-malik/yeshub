/**
 * Parse Join Type of community
 * @param {number} joinType
 *
 * @returns {string}
 */

const communityJoinType = (joinType) => {
    switch (joinType) {
        case 1:
            return "Auto";
        case 2:
            return "By Admin/Moderator";
        case 3:
            return "Join on Signup/ Auto Join on Signup";
        default:
            return "Auto";
    }
};

export default communityJoinType;
