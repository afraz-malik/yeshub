const User = require("../../../../src/model/user/userSchema");
const Post = require("../../../../src/model/user/post/postSchema");
const Community = require("../../../../src/model/knowledgeGroup/knowledgeGroup");
const Notification = require("../../../../src/model/notification/notificationSchema");
const { getUserName } = require("../userGeneralOperations");
const { getPostTitle } = require("../postGeneralOperations");
const { getCommunityName } = require("../communityGeneralOperations");

const config = require("config");
var Pusher = require("pusher");
let settingPusher = config.get("PUSHER");
var channels_client = new Pusher(settingPusher);

function notifyBulkUser(object) {
    Notification.insert(object)
        .then((Notification) => {
            Notification.map((result) => {
                var notificationObject = "my-event" + result.userID;
                channels_client.trigger(
                    "moquireNotification",
                    notificationObject,
                    result
                );
            });
        })
        .catch((error) => {});
}

function singleNotifyUser(object) {
    return new Promise(function (resolve, reject) {
        Notification.create(object).then(async function (Notification) {
            const notificatonObject = await getNotification(Notification._id);
            if (notificatonObject.userID) {
                var conversation = "my-event" + notificatonObject.userID;
                channels_client.trigger(
                    "notification",
                    conversation,
                    notificatonObject
                );
            }
            if (notificatonObject.admin) {
                var conversation = "my-event" + notificatonObject.admin;
                channels_client.trigger(
                    "notification",
                    conversation,
                    notificatonObject
                );
            }
            if (notificatonObject.moderator) {
                var conversation = "my-event" + notificatonObject.moderator;
                channels_client.trigger(
                    "notification",
                    conversation,
                    notificatonObject
                );
            }
            resolve(true);
        });
    });
}

async function getNotification(ID) {
    const populateOptions = [
        {
            path: "person",
            model: User,
        },
        {
            path: "post",
            model: Post,
        },
        {
            path: "community",
            model: Community,
        },
    ];
    return await Notification.findOne({ _id: ID }).populate(populateOptions);
}

exports.notifyBulkUser = notifyBulkUser;
exports.singleNotifyUser = singleNotifyUser;
