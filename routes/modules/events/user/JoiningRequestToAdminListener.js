var events = require("events").EventEmitter;
var EventEmitter = new events();
const {
    getUserName,
} = require("../../../modules/generalModules/userGeneralOperations");
const {
    getCommunityName,
} = require("../../../modules/generalModules/communityGeneralOperations");
const {
    areNotificationsMuted,
} = require("../../../modules/generalModules/general.js");

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("JoinedRequestNotify", async (arg) => {
    console.log("JoingRequestNotify =>");
    let userName = await getUserName(arg.userID);
    let CommunityName = await getCommunityName(arg.communityID);

    NOTIFICATION.singleNotifyUser({
        admin: CONSTANTS.ADMIN_NOTIFICATION_ID,
        message:
            userName.userName +
            CONSTANTS.IS_NEW_JOINED_REQUEST_TEXT +
            CommunityName.name,
        notificationType: CONSTANTS.IS_NEW_JOINED_REQUEST,
        community: arg.communityID,
        person: arg.userID,
    });
});

EventEmitter.on("JoinedRequestPendingNotify", async (arg) => {
    console.log("JoinedRequestPendingNotify =>");
    let userName = await getUserName(arg.userID);
    let CommunityName = await getCommunityName(arg.communityID);

    NOTIFICATION.singleNotifyUser({
        admin: CONSTANTS.ADMIN_NOTIFICATION_ID,
        message: CONSTANTS.IS_JOINING_PENDING_REQUEST_TEXT + CommunityName.name,
        notificationType: CONSTANTS.IS_JOINING_PENDING_REQUEST,
        community: arg.communityID,
        person: arg.userID,
    });
});

//General method to trigger an event
function EventlogIt(eventName, message) {
    EventEmitter.emit(eventName, message);
}

module.exports = EventEmitter;
module.exports.JoiningRequestlogIt = EventlogIt;
