const Role = require("../../src/model/user/roles/roleSchema");
module.exports.seedUserRoles = async () => {
    try {
        /** array to store new data */
        let roles = [
            {
                _id: "5e2fd51f34ce7375a792ffc0",
                roleName: "Super Admin",
            },
            {
                _id: "5e2fd51f34ce7375a792ffc1",
                roleName: "Admin",
            },
            {
                _id: "5e2fd51f34ce7375a792ffc2",
                roleName: "Moderator",
            },
            {
                _id: "5e2fd51f34ce7375a792ffc3",
                roleName: "Contributor",
            },
            {
                _id: "5e2fd51f34ce7375a792ffc4",
                roleName: "User",
            },
            {
                _id: "5e2fd51f34ce7375a792ffc5",
                roleName: "Guest",
            },
            {
                _id: "60e29aa226a6922071e17b7b",
                roleName: "staff",
            },
        ];
        /** little housekeeping before adding new roles */
        await Role.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("old data of collection remove successfully");
            }
        });
        /** create new database entry for every roles in the array */
        roles.forEach((role) => {
            var newRole = new Role(role);
            newRole.save();
        });
        console.log("role Collection has been Populated!");
    } catch (error) {
        console.log(error);
    }
};
