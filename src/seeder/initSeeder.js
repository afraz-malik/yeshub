const { dbconfig } = require("../database/config");
const { seedUserRoles } = require("./userRoles");
const { seedCommunity } = require("./defaultCommunitiesSeeder");
const { seedAdmin } = require("./adminSeeder");
const { seedPost } = require("./defaultCommunitiesPostSeeder");
const { seedStages } = require("./stageSeeder");
const { seedProducts } = require("./productSeeder");

const startSeeder = () => {
    dbconfig();
    seedAdmin();
    seedCommunity();
    seedPost();
    seedUserRoles();
    seedStages();
    seedProducts();
};
module.exports = startSeeder;
