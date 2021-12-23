module.exports = function (subEvents) {
    let ses = [];
    for (let i = 0; i < subEvents.length; i++) {
        if (
            subEvents[i].title.trim().length > 0 ||
            subEvents[i].description.trim().length > 0
        ) {
            ses.push(subEvents[i]);
        }
    }
    return ses;
};
