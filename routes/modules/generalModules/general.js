const cryptoRandomString = require("crypto-random-string");
var slugify = require("slugify");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Community = require("../../../src/model/knowledgeGroup/knowledgeGroup");
const User = require("../../../src/model/user/userSchema");

//General function to be used in all application

function randomString(len, charSet) {
    charSet =
        charSet ||
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var randomString = "";
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}
//making slug of a string
function makeSlug(postTitle) {
    return slugify(postTitle + " " + cryptoString(10), {
        replacement: "-", // replace spaces with replacement
        remove: /[*+~.()'"!:@]/g, //regex to remove characters
        lower: true, // result in lower case
    });
}
//deleting file
function deleteFile(path) {
    console.log(path);
    fs.unlink("uploads/" + path, function (err) {
        if (err) {
            console.log(err);
        }
        // if no error, file has been deleted successfully
        console.log("File deleted!");
    });
}
function validateObject(objectID) {
    return !mongoose.Types.ObjectId.isValid(objectID);
}
//deleting uploading file while sending request
function deleteRequestFile(file) {
    if (file) {
        //delete recently uploaded file
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            // delete file named
            fs.unlink(file.path, function (err) {
                if (err) throw err;
                console.log("File deleted!");
            });
        }
    }
}
function deleteRequestFiles(file) {
    if (!file) {
        file.map((name) => {
            fs.unlink("uploads/" + name, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                // if no error, file has been deleted successfully
                console.log("File deleted!");
            });
        });
    }
}

function cryptoString(len = 10) {
    return cryptoRandomString({ length: len, type: "base64" });
}

//deleting saved image
function deleteImages(file) {
    if (file) {
        file.map((name) => {
            fs.unlink("uploads/" + name, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                // if no error, file has been deleted successfully
                console.log("File deleted!");
            });
        });
    }
}

async function areNotificationsMuted(userId) {
    let { muteNotifications = false } = await User.findOne(
        { _id: userId },
        { muteNotifications: 1 }
    );

    console.log("muteNotifications: ", muteNotifications);
    return muteNotifications;
}

//exporting functions
exports.generateHash = randomString;
exports.slug = makeSlug;
exports.deleteImage = deleteFile;
exports.validateID = validateObject;
exports.deleteRequestFile = deleteRequestFile;
exports.deleteRequestFiles = deleteRequestFiles;
exports.cryptoString = cryptoString;
exports.deleteImages = deleteImages;
exports.areNotificationsMuted = areNotificationsMuted;
