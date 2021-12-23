var events = require("events").EventEmitter;
var EventEmitter = new events();
const {
    getCommunityName,
} = require("../../../modules/generalModules/communityGeneralOperations");
const {
    areNotificationsMuted,
} = require("../../../modules/generalModules/general.js");

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("SendJoningResponseNotify", async (arg) => {
    console.log("SendJoningResponseNotify =>");
    let community = await getCommunityName(arg.communityID);
    let notificationMuted = await areNotificationsMuted(arg.userID);
    if (notificationMuted) return;
    NOTIFICATION.singleNotifyUser({
        userID: arg.userID,
        message:
            CONSTANTS.IS_JOINING_RESPONSE_TEXT +
            arg.status +
            " for " +
            community.name,
        notificationType: CONSTANTS.IS_JOINING_RESPONSE,
        community: arg.communityID,
    });
});

//General method to trigger an event
function EventlogIt(eventName, message) {
    EventEmitter.emit(eventName, message);
}

module.exports = EventEmitter;
module.exports.JoiningResponselogIt = EventlogIt;
