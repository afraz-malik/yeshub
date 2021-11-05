var events = require("events").EventEmitter;
var EventEmitter = new events();
//general User operations
const {
    incrementPoint,
    getCommunities,
    progressUpdate,
    checkUserProgressBar,
} = require("../../generalModules/userGeneralOperations");

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("communityJoin", async (arg) => {
    console.log("community Join => ", arg.ID);
    const user = await getCommunities(arg.ID);
    if (user != null) {
        console.log(user.joinedCommunities.length);
        let result = await checkUserProgressBar(user._id);
        if (result != null) {
            if (result.progressBar.joinThreeCommunities === false) {
                if (user.joinedCommunities.length === 6) {
                    await incrementPoint(user._id, arg.points);
                    await progressUpdate(
                        { "progressBar.joinThreeCommunities": true },
                        user._id
                    );
                    if (user.muteNotifications) return;
                    NOTIFICATION.singleNotifyUser({
                        userID: id,
                        message:
                            CONSTANTS.FIRST_THREE_COMMUNITIES_JOINIED_TEXT +
                            CONSTANTS.FIRST_THREE_COMMUNITIES_JOINIED_POINT +
                            CONSTANTS.IS_AWARD_TEXT,
                        notificationType: CONSTANTS.IS_AWARD,
                    });
                }
            }
        }
    }
});

//General method to trigger an event
function EventlogIt(eventName, message) {
    EventEmitter.emit(eventName, message);
}

module.exports = EventEmitter;
module.exports.CommunitylogIt = EventlogIt;
