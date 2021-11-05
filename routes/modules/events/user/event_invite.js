var events = require("events").EventEmitter;
var EventEmitter = new events();

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("JoinedRequestNotify", async (arg) => {
    console.log("Notify User for Event invitation =>");
    let userName = await getUserName(arg.userID);
    let CommunityName = await getCommunityName(arg.communityID);

    NOTIFICATION.singleNotifyUser({
        admin: CONSTANTS.ADMIN_NOTIFICATION_ID,
        message:
            "you are invited by " +
            arg.invitedBy.userName +
            " to become moderator of event " +
            org.eventTitle,
        notificationType: "Event Invitation",
        userID: arg.userID,
        person: arg.invitedBy._id,
    });
});
