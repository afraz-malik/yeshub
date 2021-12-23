const Event = require("../../../../src/model/user/events/eventSchema").model;
const User = require("../../../../src/model/user/userSchema");
const { EventlogIt } = require("../../events/eventListener");
const baseurl = require("../../../../URL/urls").base_url;

var cron = require("node-cron");
cron.schedule("* * * * *", () => {
    let todayEvents = getEvents();
    todayEvents
        .then((eventData) => {
            eventData.map(async (event) => {
                if (event.time) {
                    if (event.time.startTime) {
                        var startDateTime = new Date(event.time.startTime);
                        if (event.notifyUser > 1) {
                            var durationInMinutes = event.notifyUser;

                            startDateTime.setMinutes(
                                event.time.startTime.getMinutes() -
                                    durationInMinutes
                            );

                            let minutes = getMinutesBetweenDates(
                                new Date(startDateTime),
                                new Date()
                            );

                            if ([1, 0].includes(Math.sign(minutes))) {
                                if (minutes <= 0) {
                                    await Event.updateOne(
                                        { _id: event._id },
                                        {
                                            $set: {
                                                isNotify: true,
                                            },
                                        }
                                    );
                                    let getUser = await getEventSubscribers(
                                        event._id
                                    );

                                    sendNotificationToUser(
                                        getUser,
                                        event._id,
                                        event.notifyUser,
                                        event.eventName,
                                        event
                                    );
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch((err) => {});
});

function getMinutesBetweenDates(startDate, endDate) {
    var newYear1 = new Date(startDate);
    var newYear2 = new Date(endDate);

    var dif = newYear2.getTime() - newYear1.getTime();
    var dif = Math.round(dif / (1000 * 60));
    return dif;
}

function getEvents() {
    return new Promise((resolve, reject) => {
        var today = new Date();
        let yesterday = today.setDate(today.getDate() - 1);

        Event.find(
            {
                // "isNotify":false,
                "date.startDate": {
                    $gt: new Date(yesterday),
                    $lt: new Date(),
                },
            },
            {}
        )
            .then((data) => {
                //
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

async function getEventSubscribers(eventID) {
    let userID = await User.find({
        subscribedEvents: { $in: eventID },
        $or: [
            { muteNotifications: false },
            { muteNotifications: { $exists: false } },
        ],
    }).select({ email: 1, _id: 1, userName: 1 });
    return userID;
}

async function sendNotificationToUser(
    UserID,
    EventID,
    TimeLeft,
    EventName,
    event
) {
    console.log("event: ", event);
    UserID.map((user) => {
        NOTIFICATION.singleNotifyUser({
            userID: user._id,
            message:
                "Event(" +
                EventName +
                ")" +
                CONSTANTS.EVENT_IS_START_TEXT +
                TimeLeft +
                " minutes",
            notificationType: CONSTANTS.EVENT_IS_START,
            event: EventID,
            person: user._id,
        });
        let messaging = `<span><p>Just ${TimeLeft} left before ${EventName} starts! Kindly go to <a href="${baseurl}/event/details/${event._id}"> Event page </a> to get more information and be prepared on your upcoming event!</p></span>`;
        EventlogIt("eventEmail", {
            eventName: EventName,
            email: user.email,
            message: messaging,
            user,
        });
    });
}
