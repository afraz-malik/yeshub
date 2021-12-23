const sharp = require("sharp");
const fs = require("fs");
module.exports = async (req, res, next) => {
    checkFolder(`uploads/${req.folder}`);
    if (!req.files) return next();
    req.body.images = [];
    console.log("files length", req.files.length);
    await Promise.all(
        req.files.map(async (file) => {
            const newFilename = Math.floor(Math.random()*12000000) + Date.now();
            await sharp(file.buffer)
                .resize(null, null)
                .toFormat("png")
                .png({ quality: 50 })
                .toFile(`uploads/${req.folder}/${newFilename}.png`);
            req.body.images.push(`${req.folder}/${newFilename + ".png"}`);
            console.log(`${req.folder}/${newFilename + ".png"}`);
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
