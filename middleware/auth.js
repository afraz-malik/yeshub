const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../src/model/user/userSchema");

// require('../src/database/configuration');

module.exports = async function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token)
        return res
            .status(CONSTANTS.SERVER_UNAUTHORIZED_HTTP_CODE)
            .json({
                error: CONSTANTS.UNAUTHORIZED,
                message: CONSTANTS.TOKEN_IS_REQUIRED,
            })
            .end();
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

        if (!decoded.ID) {
            return res
                .status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE)
                .json({
                    error: CONSTANTS.FORBIDDEN,
                    message: CONSTANTS.TOKEN_IS_INVALID,
                })
                .end();

            next();
        }

        req.user = { ...decoded };

        next();
    } catch (ex) {
        return res
            .status(CONSTANTS.SERVER_BAD_REQUEST_HTTP_CODE)
            .json({
                error: CONSTANTS.BAD_REQUEST,
                message: CONSTANTS.TOKEN_IS_INVALID,
            })
            .end();
    }
};
