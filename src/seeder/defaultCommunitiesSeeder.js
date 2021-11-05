
const knowledgeGroup = require('../../src/model/knowledgeGroup/knowledgeGroup');
module.exports.seedCommunity = async () => {
    try {
        /** array to store new data */
        let communities = [
            {
                _id: '5ea40c6025046d25d4a9fbf4',
                description: "Health Description",
                logo: "knowledge/logo_default.png",
                coverImage: "knowledge/cover_default.png",
                joingType: 1,
                pendingJoining: [

                ],
                likes: [],
                disliskes: [],
                invitesModerator: [],
                moderators: [],
                rules: [],
                name: "Health",
                slug: "health-6p7emd8wtn",
                author: "5ea5bfe037cf27a84f9d8b87",
                published: true
            },
            {
                _id: '5ea40dd025046d25d4a9fbf5',
                description: "Sports Description",
                logo: "knowledge/logo_default.png",
                coverImage: "knowledge/cover_default.png",
                joingType: 1,
                pendingJoining: [],
                likes: [],
                disliskes: [],
                invitesModerator: [],
                moderators: [],
                rules: [],
                name: "Sports",
                slug: "sports-ifeluquyzp",
                author: "5ea5bfe037cf27a84f9d8b87",
                published: true
            },
            {
                _id: '5ea40e483d019d2870d8c3cc',
                description: "Science Description",
                logo: "knowledge/logo_default.png",
                coverImage: "knowledge/cover_default.png",
                joingType: 1,
                pendingJoining: [],
                likes: [],
                disliskes: [],
                invitesModerator: [],
                moderators: [],
                rules: [],
                name: "Science",
                slug: "science-mxox5wfnb5",
                author: "5ea5bfe037cf27a84f9d8b87",
                published: true
            },
        ]
        /** little housekeeping before adding new roles */
        await knowledgeGroup.deleteMany({
            _id: {
                $in: ["5ea40c6025046d25d4a9fbf4", "5ea40dd025046d25d4a9fbf5", "5ea40e483d019d2870d8c3cc"]
            }
        }, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('default adminremove successfully');
            }
        }
        );
        /** create new database entry for every roles in the array */
        communities.forEach(role => {
            var community = new knowledgeGroup(role);
            community.save();
        })
        console.log('default communities Collection has been Populated!')
    } catch (error) {
        console.log(error)
    }
}
