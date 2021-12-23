const sharp = require("sharp");
const fs = require("fs");
module.exports = async (req, res, next) => {
    checkFolder(`uploads/${req.folder}`);
    if (!req.files) return next();
    req.body.images = [];
    await Promise.all(
        req.files.map(async (file) => {
            console.log("------------ mime type testing -------");
            console.log(file);
            console.log("------------ mime type testing -------");
            const newFilename = Date.now();
            await sharp(file.buffer)
                // .resize(250, null)
                .toFormat(
                    `${
                        file.mimetype.replace("image/", "") === "png"
                            ? "png"
                            : "jpg"
                    }`
                )
                // .png({ quality: 80 })
                .toFile(
                    `uploads/${req.folder}/${newFilename}.${
                        file.mimetype.replace("image/", "") === "png"
                            ? "png"
                            : "jpg"
                    }`
                );
            req.body.images.push(
                `${req.folder}/${
                    newFilename +
                    `${
                        file.mimetype.replace("image/", "") === "png"
                            ? ".png"
                            : ".jpg"
                    }`
                }`
            );
        })
    );
    next();
};

function checkFolder(folder) {
    fs.exists(folder, function (exists) {
        if (!exists) {
            fs.mkdir(folder, function (err) {
                if (err) {
                    console.log("Error in folder creation");
                }
            });
        }
    });
}
