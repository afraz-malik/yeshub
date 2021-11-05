const express = require("express");
const router = express.Router();
const path = require("path");

const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|mov|avi|flv)$/i)) {
        return cb(new Error("Only media files are allowed!"), false);
    }
    cb(null, true);
};

// const upload = multer({ storage: storage, fileFilter: imageFilter });

const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
AWS.config.loadFromPath("../config/s3.json");
const fs = require("fs");
const { json } = require("body-parser");

function readDir(path) {
    fs.readdir("../sec", function (err, files) {
        console.log(files.length);
        fs.writeFileSync("./files.json", JSON.stringify(files));
    });
}

function uploadFile(file) {
    const files = require("./files.json");
    fs.readFile("sec/" + files[0], function (err, data) {
        console.log(err);
        if (err) return;
        var s3bucket = new AWS.S3({ params: { Bucket: "static.hub" } });
        // var s3bucket = new AWS.S3({params: {Bucket: 'socialapp-deployments-mobilehub-1094133098'}});
        s3bucket.createBucket(function () {
            var params = {
                Key: `${new Date().toISOString()}${files[0]}`, //file.name doesn't exist as a property
                Body: data,
            };
            s3bucket.upload(params, function (err, data) {
                console.log(data);
                console.log(err);
            });
        });
    });
}

uploadFile();
