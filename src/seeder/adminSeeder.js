
const User = require('../../src/model/user/userSchema');
const CONSTANTS = require('../../Enum/constants');
module.exports.seedAdmin = async () => {
    try {
        /** array to store new data */
        let users = [
            {
                _id: '5ea5bfe037cf27a84f9d8b87',
                address: {
                    telephone: "03324571945",
                    city: "lahore",
                    country: "pakistan"
                },
                fullName: "Admin",
                password: "$2a$10$6F0ydt4bm.GOL4x66TT0beggbcK2/OeXyWjvVIVkP7b90wZTJz/RG",
                // userImage: "user/1587815439012.png",
                assignedRoles: [`${CONSTANTS.ROLE_ADMIN}`],
                userName: "yesHubAdmin",
                email: "adminYesHub@yesHub.com",
            },

        ]
        /** little housekeeping before adding new roles */
        await User.deleteMany({
            _id: {
                $in: ["5ea5bfe037cf27a84f9d8b87"]
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
        users.forEach(user => {
            var CreateUser = new User(user);
            CreateUser.save();
        })
        console.log('default Admin is seed has been Populated!')
    } catch (error) {
        console.log(error)
    }
}
