var events = require("events").EventEmitter;
var EventEmitter = new events();
//general User operations
const {
    getUserName,
} = require("../../../generalModules/userGeneralOperations");

const {
    getPostAuthorID,
} = require("../../../generalModules/postGeneralOperations");

const { areNotificationsMuted } = require("../../../generalModules/general");

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("likePost", async (arg) => {
    const Username = await getUserName(arg.person);

    const author = await getPostAuthorID(arg.postID);
    const muteNotifications = await areNotificationsMuted(author.author);
    if (muteNotifications) return;

    NOTIFICATION.singleNotifyUser({
        userID: author.author,
        message: Username.userName + CONSTANTS.IS_POST_Liked_TEXT,
        notificationType: CONSTANTS.IS_POST_Liked,
        post: arg.postID,
        person: arg.person,
    });
});
EventEmitter.on("DislikePost", async (arg) => {
    const Username = await getUserName(arg.person);

    const author = await getPostAuthorID(arg.postID);
    const muteNotifications = await areNotificationsMuted(author.author);
    if (muteNotifications) return;

    NOTIFICATION.singleNotifyUser({
        userID: author.author,
        message: Username.userName + CONSTANTS.IS_POST_DISLiked_TEXT,
        notificationType: CONSTANTS.IS_POST_DISLiked,
        post: arg.postID,
        person: arg.person,
    });
});
//General method to trigger an event
function EventlogIt(eventName, message) {
    EventEmitter.emit(eventName, message);
}

module.exports = EventEmitter;
module.exports.PostLikeDislikelogIt = EventlogIt;
