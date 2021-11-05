import api from "./instance";

const moderator = {
    search: (keyword, id) => api.get(`community/searchUser/Search?ID=${id}&keyword=${keyword}`),
    sendInvite: (id, userID) =>
        api.post(`knowledgeGroup/invitation/sendInvite?ID=${id}`, {
            userID,
        }),
    removeModerator: (communityID, userID) =>
        api.delete("community/moderator/remove", {
            data: { communityID, userID },
        }),
};

export default moderator;
