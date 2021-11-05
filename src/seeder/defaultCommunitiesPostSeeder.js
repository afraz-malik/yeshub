
const Post = require('../../src/model/user/post/postSchema');
module.exports.seedPost = async () => {
    try {
        /** array to store new data */
        let posts = [
            {
                _id: "5ea3e96d7254922474775d3a",
                knowledgeGroup: "5ea40c6025046d25d4a9fbf4",
                profile: null,
                likes: [],
                disLikes: [],
                isPublished: true,
                title: "Testing Post",
                author: "5ea5bfe037cf27a84f9d8b87",
                description: "This is description 1",
                slug: "testing-post-1-cftpkqbpnb",
            },
            {
                _id: "5ea406cf01f4c81a38eecc04",
                knowledgeGroup: "5ea40dd025046d25d4a9fbf5",
                profile: null,
                likes: [],
                disLikes: [],
                isPublished: true,
                title: "Testing Post-2",
                author: "5ea5bfe037cf27a84f9d8b87",
                description: "This is description 1",
                slug: "testing-post-2-upj1gt2cip",
            },
            {
                _id: "5ea406e201f4c81a38eecc07",
                knowledgeGroup: "5ea40e483d019d2870d8c3cc",
                profile: null,
                likes: [],
                disLikes: [],
                isPublished: true,
                title: "Testing Post-3",
                author: "5ea5bfe037cf27a84f9d8b87",
                description: "This is description 1",
                slug: "testing-post-3-oc8vpz/wor",
            },
        ]
        /** little housekeeping before adding new roles */
        await Post.deleteMany({
            _id: {
                $in: ["5ea3e96d7254922474775d3a", "5ea406cf01f4c81a38eecc04", "5ea406e201f4c81a38eecc07"]
            }
        }, function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log('default post remove successfully');
            }
        }
        );
        /** create new database entry for every roles in the array */
        posts.forEach(postrole => {
            var post = new Post(postrole);
            post.save();
        })
        console.log('default post Collection has been Populated!')
    } catch (error) {
        console.log(error)
    }
}
