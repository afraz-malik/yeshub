const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//check for duplicate category in db using middleware
const checkForDuplicate = require('../../../../middleware/checkCategoryExist');
const Category = require('../../../../src/model/category/category');
const instance = new Category();
const { slug, deleteImage, validateID, deleteRequestFile } = require('../../generalModules/general');
var fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/category/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);

    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

//adding category
router.post('/add', upload.single('image'), checkForDuplicate, (req, res) => {
    const categoryAdd = new Category();
    let image;
    if (req.file) {
        image = req.file.path.replace("uploads/", "")
    }
    const categoryRequest = {
        "categoryName": req.body.name,
        "categoryDescription": req.body.description,
        "slug": slug(req.body.name),
        "image": image
    }

    const { error, value } = instance.validateCategory(categoryRequest);
    //check for validating data
    if (error) {
        //if error in validating data we have to delete uploaded file
        if (req.file) {
            //delete recently uploaded file
            if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg') {
                // delete file named
                fs.unlink(req.file.path, function (err) {
                    if (err) throw err;
                    // if no error, file has been deleted successfully
                    console.log('File deleted!');
                });
            }
        }
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: error.details[0].message
        }).end();
    }

    categoryAdd.categoryName = value.categoryName;
    categoryAdd.categoryDescription = value.categoryDescription;
    categoryAdd.slug = value.slug;
    categoryAdd.image = value.image;
    categoryAdd.save((err, category) => {
        if (err) {
            return res.status(CONSTANTS.SERVER_INTERNAL_SERVER_ERROR_HTTP_CODE).json({
                error: CONSTANTS.INTERNAL_ERROR,
                message: error.details[0].message
            }).end();
        }
        return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
            message: CONSTANTS.ADD_SUCCESSFULLY,
            data: category
        }).end();

    })
});
//updating catgory information
router.put('/update', async (req, res) => {

    if (validateID(req.body.ID)) {
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: CONSTANTS.INVALID_ID
        }).end();
    }
    Category.findById(req.body.ID, async (err, category) => {
        if (err) {
            throw err;
        }
        if (category === null) {
            if (req.file) {
                deleteRequestFile(req.file);
            }
            return res.status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE).json({
                message: CONSTANTS.NOT_EXIST,
            }).end();
        }
        //validating request
        const validateSchema = {
            "categoryName": req.body.name,
            "categoryDescription": req.body.description,
            "slug": slug(req.body.name),
        }
        const { error, value } = instance.updateValidateCategory(validateSchema);
        if (error) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: error.details[0].message
            }).end();
        }
        Category.findByIdAndUpdate(req.body.ID, {
            $set: {
                categoryName: value.categoryName,
                categoryDescription: value.categoryDescription,
                slug: value.slug
            }
        }, { new: true }, async (err, updatecategory) => {
            if (err) {
                throw err;
            }
            if (updatecategory === null) {
                return res.status(SERVER_NO_CONTENT_HTTP_CODE).json({
                    message: CONSTANTS.NOT_EXIST,
                }).end();
            }
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.UPDATED_SUCCESSFULLY,
                data: updatecategory
            }).end();
        });
    });



});
//updating category image
router.put('/updateCategoryImage', upload.single('image'), async (req, res) => {

    let image;
    if (req.file) {
        image = req.file.path.replace("uploads/", "")
    }
    const schema = {
        "image": image
    }
    const { error, value } = instance.validateImage(schema);
    if (error) {
        //if error in validating data we have to delete uploaded file
        if (req.file) {
            deleteRequestFile(req.file);
        }
        if (validateID(req.body.ID)) {
            return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
                error: CONSTANTS.JOI_VALIDATION_ERROR,
                message: CONSTANTS.INVALID_ID
            }).end();
        }
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: error.details[0].message
        }).end();
    }
    Category.findById(req.body.ID, async (err, category) => {

        if (err) {
            throw err;
        }
        if (category === null) {
            if (req.file) {
                deleteRequestFile(req.file);
            }
            return res.status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE).json({
                message: CONSTANTS.NOT_EXIST,
            }).end();
        }
        Category.findByIdAndUpdate(req.body.ID, {
            $set: {
                image: value.image
            }
        }, { new: true }, async (err, updatecategory) => {
            if (err) {
                throw err;
            }
            if (updatecategory === null) {
                return res.status(SERVER_NO_CONTENT_HTTP_CODE).json({
                    message: CONSTANTS.NOT_EXIST,
                }).end();
            }
            //deleting image
            deleteImage(category.image);
            return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).json({
                message: CONSTANTS.UPDATED_SUCCESSFULLY,
                data: updatecategory
            }).end();
        });
    });
});
//delete category
router.delete('/delete', async (req, res) => {

    if (validateID(req.query.ID)) {
        return res.status(CONSTANTS.SERVER_FORBIDDEN_HTTP_CODE).json({
            error: CONSTANTS.JOI_VALIDATION_ERROR,
            message: CONSTANTS.INVALID_ID
        }).end();
    }
    Category.findByIdAndRemove(req.query.ID, (err, result) => {
        if (err) throw err;
        if (result === null) {
            return res.status(CONSTANTS.SERVER_NO_CONTENT_HTTP_CODE).json({
                message: CONSTANTS.NOT_EXIST,
            }).end();
        }
        //deleting Image
        deleteImage(result.image);
        res.status(CONSTANTS.SERVER_GONE_HTTP_CODE).json({
            message: CONSTANTS.DELETED_SUCCESSFULLY,
            delete: true
        });

    });
});


module.exports = router;