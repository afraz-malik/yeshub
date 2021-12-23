const mongoose = require("mongoose");
const _ = require("lodash");
mongoose.connect("mongodb://127.0.0.1:27017/yesHub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Community = require("./src/model/knowledgeGroup/knowledgeGroup");

const userSchema = mongoose.Schema({
    name: String,
    score: Number,
});
// const User = mongoose.model("User", userSchema);
const User = require("./src/model/user/userSchema");

function agrre() {
    User.aggregate(
        [
            {
                $sort: {
                    score: -1,
                },
            },
            {
                $group: {
                    id: null,
                    name: "$name",
                    score: "$score",
                    rank: 1,
                },

                // },
                // {
                //     $group: {
                //         _id: '$author',
                //         'total_posts': {$sum: 1}
                //     }
                // }, {
                //     $project: {
                //         user: '$_id',
                //         totalPosts: '$total_posts',
                //         '_id': -1
                //     }
                // }, {
                //     $sort : {
                //         totalPosts: -1
                //     }
                // }, {
                //     $limit: 10
                // }
            },
        ],
        function (err, docs) {
            console.log(err, docs);
        }
    );
}

async function findAndUpdateTotalMembers() {
    const list = await Community.distinct("_id");
    const members = await Promise.all(
        _.map(list, async (itm) => {
            try {
                let mem = (
                    await User.find({ joinedCommunities: { $in: [itm] } })
                ).length;
                return { community: itm, counts: mem };
            } catch (error) {
                console.log(error);
            }
        })
    );

    let tot = await Promise.all(
        _.map(members, async (com) => {
            let upd = await Community.findOneAndUpdate(
                { _id: com.community },
                { totalMembers: 200 + com.counts },
                { upsert: false, new: true }
            );
            return upd;
        })
    );
    console.log(tot);
}
process.on("unhandledRejection", (err) => {
    console.log(err);
});
// findAndUpdateTotalMembers();
// agrre();

function pickingNumbers(a) {
    // Write your code here
    let maxLength = 0;
    let arr;
    let max = 1;
    let sorted = a.sort((a, b) => a - b);
    console.log(sorted);
    let counter = 0;
    let first = sorted[0];
    let nextFirst = sorted[0];
    let nextFirstIndex = 0;

    for (let i = 0; i < sorted.length; i++) {
        if (Math.abs(first - sorted[i]) <= 1) {
            console.log(
                i,
                " - ",
                first,
                ":",
                sorted[i],
                "(nextFirstIndex = " + nextFirstIndex,
                " nextFirst =" + nextFirst + ")"
            );
            counter++;
            if (first !== sorted[i] && nextFirst !== sorted[i]) {
                nextFirst = sorted[i];
                nextFirstIndex = i;
            }
        } else {
            if (max <= counter) {
                max = counter;
            }
            if (first !== sorted[i] && nextFirst !== sorted[i]) {
                nextFirst = sorted[i];
                nextFirstIndex = i;
            }
            counter = 0;
            first = nextFirst;
            i = nextFirstIndex;
        }
    }

    console.log("max: ", max >= counter ? counter : counter);
}

pickingNumbers([4, 6, 5, 3, 3, 1]);
