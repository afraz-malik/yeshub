var events = require("events").EventEmitter;
var EventEmitter = new events();
//general User operations
const {
    incrementPoint,
    progressUpdate,
    checkUserProgressBar,
} = require("../../generalModules/userGeneralOperations");
const {
    getUserPostCount,
} = require("../../generalModules/postGeneralOperations");

const { areNotificationsMuted } = require("../../generalModules/general.js");

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("firstPost", async (arg) => {
    const count = await getUserPostCount(arg.ID);
    if (count != null) {
        let result = await checkUserProgressBar(arg.ID);
        if (result != null) {
            if (result.progressBar.firstPost === false) {
                if (count === 1) {
                    await incrementPoint(arg.ID, arg.points);
                    await progressUpdate(
                        { "progressBar.firstPost": true },
                        arg.ID
                    );
                    const muteNotifications = await areNotificationsMuted(
                        arg.ID
                    );
                    if (muteNotifications) return;
                    NOTIFICATION.singleNotifyUser({
                        userID: arg.ID,
                        message:
                            CONSTANTS.FIRST_POST_POINT_TEXT +
                            CONSTANTS.FIRST_POST_POINT +
                            CONSTANTS.IS_AWARD_TEXT,
                        notificationType: CONSTANTS.IS_AWARD,
                    });
                }
            }
        }
    }
});

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("TenPost", async (arg) => {
    const count = await getUserPostCount(arg.ID);
    if (count != null) {
        //
        let result = await checkUserProgressBar(arg.ID);
        if (result != null) {
            if (result.achievements.createTenPost === false) {
                if (count === 10) {
                    await incrementPoint(arg.ID, arg.points);
                    await progressUpdate(
                        { "achievements.createTenPost": true },
                        arg.ID
                    );
                    const muteNotifications = await areNotificationsMuted(
                        arg.ID
                    );
                    if (muteNotifications) return;
                    NOTIFICATION.singleNotifyUser({
                        userID: ID,
                        message:
                            CONSTANTS.CREATE_TEN_POST_POINT_TEXT +
                            CONSTANTS.CREATE_TEN_POST_POINT +
                            CONSTANTS.IS_AWARD_TEXT,
                        notificationType: CONSTANTS.IS_AWARD,
                    });
                }
            }
        }
    }
});

//event trigger when user verify their email and 20 points added to their karma
EventEmitter.on("TwentyFivePost", async (arg) => {
    const count = await getUserPostCount(arg.ID);
    if (count != null) {
        let result = await checkUserProgressBar(arg.ID);
        if (result != null) {
            if (result.achievements.createTwentyFivePost === false) {
                if (count === 25) {
                    await incrementPoint(arg.ID, arg.points);
                    await progressUpdate(
                        { "achievements.createTwentyFivePost": true },
                        arg.ID
                    );
                    const muteNotifications = await areNotificationsMuted(
                        arg.ID
                    );
                    if (muteNotifications) return;
                    NOTIFICATION.singleNotifyUser({
                        userID: arg.ID,
                        message:
                            CONSTANTS.CREATE_TWENTY_FIVE_POST_POINT_TEXT +
                            CONSTANTS.CREATE_TWENTY_FIVE_POST_POINT +
                            CONSTANTS.IS_AWARD_TEXT,
                        notificationType: CONSTANTS.IS_AWARD,
                    });
                }
            }
        }
    }
});

//event trigger at fift posts
EventEmitter.on("FiftyPost", async (arg) => {
    const count = await getUserPostCount(arg.ID);
    if (count != null) {
        let result = await checkUserProgressBar(arg.ID);
        if (result != null) {
            if (result.achievements.createFiftyPost === false) {
                if (count === 50) {
                    await incrementPoint(arg.ID, arg.points);
                    await progressUpdate(
                        { "achievements.createFiftyPost": true },
                        arg.ID
                    );
                    const muteNotifications = await areNotificationsMuted(
                        arg.ID
                    );
                    if (muteNotifications) return;
                    NOTIFICATION.singleNotifyUser({
                        userID: ID,
                        message:
                            CONSTANTS.CREATE_FIFTY_POST_POINT_TEXT +
                            CONSTANTS.CREATE_FIFTY_POST_POINT +
                            CONSTANTS.IS_AWARD_TEXT,
                        notificationType: CONSTANTS.IS_AWARD,
                    });
                }
            }
        }
    }
});

//event trigger at fift posts
EventEmitter.on("HundredPost", async (arg) => {
    const count = await getUserPostCount(arg.ID);
    if (count != null) {
        let result = await checkUserProgressBar(arg.ID);
        if (result != null) {
            if (result.achievements.createHundredPost === false) {
                if (count === 100) {
                    await incrementPoint(arg.ID, arg.points);
                    await progressUpdate(
                        { "achievements.createHundredPost": true },
                        arg.ID
                    );
                    const muteNotifications = await areNotificationsMuted(
                        arg.ID
                    );
                    if (muteNotifications) return;
                    NOTIFICATION.singleNotifyUser({
                        userID: ID,
                        message:
                            CONSTANTS.CREATE_HUNDRED_POST_POINT_TEXT +
                            CONSTANTS.CREATE_HUNDRED_POST_POINT +
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
module.exports.PostlogIt = EventlogIt;
