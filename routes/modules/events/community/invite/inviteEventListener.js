var events = require("events").EventEmitter;
var EventEmitter = new events();
const {
    getCommunityName,
} = require("../../../generalModules/communityGeneralOperations");

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("SendInviteNotify", async (arg) => {
    console.log("SendInvite =>");
    let communityName = await getCommunityName(arg.communityID);
    NOTIFICATION.singleNotifyUser({
        userID: arg.userID,
        message: CONSTANTS.IS_INVITATION_TEXT + communityName.name,
        notificationType: CONSTANTS.IS_INVITATION,
        community: arg.communityID,
        person: arg.userID,
    });
});

//General method to trigger an event
function EventlogIt(eventName, message) {
    EventEmitter.emit(eventName, message);
}

module.exports = EventEmitter;
module.exports.InvitelogIt = EventlogIt;
