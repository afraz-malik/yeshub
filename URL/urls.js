module.exports = {
    base_url: "localhost:4000",
    // base_url: "https://uat.hub.yesdigital.org",
};

async function getThreadsForAdmin(req, res) {
    try {
        let conversationIDs = await Message.find({})
            .sort({ createdAt: -1 })
            .distinct("conversationID");
        let threads = [];
        let communities = await knowledgeGroup.find({}, "name logo");

        let result = await Promise.all(
            _.map(conversationIDs, async function (id) {
                let ID = id.split("-");
                let user = null;
                let community = null;
                let event = null;
                let code = 0;

                // 0: user with admin
                // 1: event mod with user
                // 2: community mod with user in community
                // 3: mod with mod in community
                // 4: mode with user in event

                if (ID[0] == "admin") {
                    user = await User.findOne(
                        { _id: ID[1] },
                        "userName userImage"
                    );
                    code = 0;
                } else if (ID[0] == "ev") {
                    event = await Event.findOne(
                        { _id: ID[1] },
                        "eventName slug"
                    );
                    user = await User.findOne(
                        { _id: ID[2] },
                        "userName userImage"
                    );
                    code = 1;
                } else if (ID[0] == "in") {
                    community =
                        (await KnowledgeGroup.findOne(
                            { _id: ID[1] },
                            "logo name"
                        )) || ID[1];
                    code = 3;
                    delete id;
                } else if (
                    ID.length == 2 &&
                    ID[0] != "in" &&
                    ID[0] != "admin" &&
                    ID[0] != "iev"
                ) {
                    community = await KnowledgeGroup.findOne(
                        { _id: ID[0] },
                        "logo name"
                    );

                    user = await User.findOne(
                        { _id: ID[1] },
                        "userName userImage"
                    );
                    code = 2;
                } else if (ID.length == 2 && ID[0] == "iev") {
                    event = await Event.findOne(
                        { _id: ID[1] },
                        "eventName slug"
                    );
                    code = 4;
                }

                threads.push({
                    user: user,
                    event: event,
                    community: community,
                    conversationID: id,
                    code: code,
                });
                return id;
            })
        );

        communities.forEach((com) => {
            if (conversationIDs.indexOf("in-" + com._id) == -1) {
                threads.push({
                    user: null,
                    event: null,
                    community: com,
                    conversationID: "in-" + com._id,
                    code: 3,
                });
            }
        });
        let finalResponse = await transformAndSort(threads);
        //        let resp = await filterArchived(finalResponse, req.user.ID);

        let r = await Promise.all(
            _.map(finalResponse, async (itm) => {
                let counts = await countMessages(
                    itm.conversationID,
                    req.user.ID
                );
                Object.assign(itm, { counts: counts });
                return itm;
            })
        );
        let resp = await filterArchived(r, req.user.ID);
        res.json(resp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message });
    }
}
