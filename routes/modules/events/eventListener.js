var events = require("events").EventEmitter;
var EventEmitter = new events();
const config = require("config");
const baseurl = require("../../../URL/urls").base_url;

//general User operations
const {
    incrementPoint,
    findUserByEmail,
    progressUpdate,
    checkUserProgressBar,
} = require("../generalModules/userGeneralOperations");
//email
const {
    sendingEmail,
    sendEmailVerification,
    sendEmailEvent,
} = require("../email/email2");

EventEmitter.on("UserList", (arg) => {});

const webLink = `${baseurl}/email/verify`;

//event trigger when user first time register on website and email verification send to user email.
EventEmitter.on("UserNewRegister", (arg) => {
    let link = `https://${webLink}/${arg.email}/${arg.hash}`;
    sendEmailVerification(arg.userName, arg.email, "Verify Email", link);
});
EventEmitter.on("eventEmail", (arg) => {
    let link = `${webLink}/${arg.email}/${arg.hash}`;
    sendEmailEvent(arg.eventName, arg.email, arg.message, arg.user);
});

//again resend request for verification email
EventEmitter.on("resendEmail", async (arg) => {
    let link = `https://${webLink}/${arg.email}/${arg.hash}`;
    sendEmailVerification(arg.userName, arg.email, "Verify Email", link);
});
//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("verifyEmail", async (arg) => {
    const user = await findUserByEmail(arg.email);
    if (user != null) {
        await incrementPoint(user._id, arg.points);

        NOTIFICATION.singleNotifyUser({
            userID: user._id,
            message:
                CONSTANTS.VERIFY_EMAIL_POINT_TEXT +
                CONSTANTS.VERIFY_EMAIL_POINT +
                CONSTANTS.IS_AWARD_TEXT,
            notificationType: CONSTANTS.IS_AWARD,
        });
    }
});

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("event_invitation", async (arg) => {
    NOTIFICATION.singleNotifyUser({
        message:
            "you are invited by " +
            arg.invitedBy.userName +
            " to become moderator of event " +
            arg.eventTitle,
        notificationType: "Event Invitation",
        userID: arg.userID,
        person: arg.invitedBy._id,
        event: arg.event,
    });
});

EventEmitter.on("event_accepted", async (arg) => {
    NOTIFICATION.singleNotifyUser({
        message:
            arg.acceptedBy.userName +
            " Accepted request to become moderator of event " +
            arg.eventTitle,
        notificationType: "Event Mod Request Accepted",
        userID: arg.userID,
        person: arg.acceptedBy._id,
        event: arg.event,
    });
});

EventEmitter.on("event_approved", async (arg) => {
    NOTIFICATION.singleNotifyUser({
        message: `Your event, "${arg.eventTitle}" has been Approved by Admin here's ${arg.points} cookie point for your contribution`,
        notificationType: "Event Mod Request Accepted",
        userID: arg.userID,
        event: arg.event,
    });
});

EventEmitter.on("event_rejected", async (arg) => {
    NOTIFICATION.singleNotifyUser({
        message:
            arg.rejectedBy.userName +
            " declined to accept request to become moderator of event " +
            arg.eventTitle,
        notificationType: "Event Mod Request Declined",
        userID: arg.userID,
        person: arg.rejectedBy._id,
        event: arg.event,
    });
});

EventEmitter.on("community_post_approved", async (arg) => {
    NOTIFICATION.singleNotifyUser({
        message: `your post "${arg.postTitle}" to community "${arg.communityName}" has been approved`,
        notificationType: arg.notificationType,
        userID: arg.userID,
        post: arg.post,
    });
});

EventEmitter.on("community_post_added", async (arg) => {
    NOTIFICATION.singleNotifyUser({
        message: `New Post "${arg.postTitle}" has been approved in community "${arg.communityName}" `,
        notificationType: arg.notificationType,
        userID: arg.userID,
        post: arg.post,
    });
});

//event trigger when user first time update their profile
EventEmitter.on("updateFirst", async (arg) => {
    incrementPoint(arg.ID, arg.points);
});

//General method to trigger an event
function EventlogIt(eventName, message) {
    EventEmitter.emit(eventName, message);
}

module.exports = EventEmitter;
module.exports.EventlogIt = EventlogIt;
