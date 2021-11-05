var events = require("events").EventEmitter;
var EventEmitter = new events();
const {
    getUserName,
} = require("../../../modules/generalModules/userGeneralOperations");

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("SendInviteResponseNotify", async (arg) => {
    console.log("SendInviteResponse =>");
    let userName = await getUserName(arg.userID);

    NOTIFICATION.singleNotifyUser({
        admin: CONSTANTS.ADMIN_NOTIFICATION_ID,
        message:
            arg.status +
            " By " +
            userName.userName +
            CONSTANTS.IS_INVITATION_RESPONSE_TEXT,
        notificationType: CONSTANTS.IS_INVITATION_RESPONSE,
        community: arg.communityID,
        person: arg.userID,
    });
});

//General method to trigger an event
function EventlogIt(eventName, message) {
    EventEmitter.emit(eventName, message);
}

module.exports = EventEmitter;
module.exports.InviteResponselogIt = EventlogIt;
