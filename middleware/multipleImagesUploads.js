const multer = require("multer");
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error("Allowed only .png, .jpg, .jpeg and .gif"));
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limit: { fileSize: 1024 * 1024 },
});

exports.ImageUploader = function (ImageCount, folderAddress, isNull) {
    //
    const uploadFiles = upload.array("images", null); // limit to 10 images
    return (req, res, next) => {
        uploadFiles(req, res, (err) => {
            req.folder = folderAddress;
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                if (err.code === "LIMIT_UNEXPECTED_FILE") {
                    console.log("size exceeded", err);
                    // Too many images exceeding the allowed limit
                    return res
                        .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                        .json({
                            error: CONSTANTS.JOI_VALIDATION_ERROR,
                            message: err.message,
                        })
                        .end();
                }
            } else if (err) {
                return res
                    .status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE)
                    .json({
                        error: CONSTANTS.INTERNAL_ERROR,
                        message: err.message,
                    })
                    .end();
                // handle other errors
            }
            // Everything is ok.
            next();
        });
    };
};

