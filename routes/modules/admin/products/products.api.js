var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProductSeedData = require('../../../../src/seeder/productSeeder').seedData;
var fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dirs = process.cwd() + '/uploads/products';
        if (!fs.existsSync(dirs)) {
            fs.mkdirSync(dirs);
        }
        cb(null, './uploads/products');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif'|| file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);

    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});


const Product = require('./product.model');
const auth = require('../../../../middleware/auth');
const admin = require('../../../../middleware/checkAdmin');
const { Mongoose } = require('mongoose');
const { stubObject } = require('lodash');

router.route('/').post([auth, admin, upload.single('file')], createProduct);
router.route('/').get(getAll);
router.route('/:id').put([auth, admin, upload.single('file')], updateProduct);
router.route('/:id').delete([auth, admin], removeProduct);
router.route('/add/tool').post([auth, admin], addToolToProduct);
router.route('/add/section').post([auth, admin], addSectionToProduct);
router.route('/update/tool').put([auth, admin], updatToolInProduct);

router.route('/update/section').put([auth, admin], updatSectionInProduct);
router.route('/remove/section').put([auth, admin], removeSectionfromProduct);
router.route('/remove/tool').put([auth, admin], removeToolFromProduct);
router.route('/create/seed').get([auth, admin], createProductSeed);

// i think there is no need for response back
function updateProduct(req, res) {
    if(req.file) {
        req.body.animationFile = req.file.path.replace("uploads/", "");
    }

    Product.findOneAndUpdate({ _id: req.params.id, "product.language":req.query.language || "eng" }, 
        {$set: {
            "product.$.title": req.body.title, 
            "product.$.shortDescription": req.body.shortDescription,
            "product.$.description": req.body.description,
            "product.$.redirectUrl": req.body.redirectUrl,
            "product.$.animationFile": req.body.animationFile,
            "product.$.videoUrl": req.body.videoUrl
            } 
        },
        { upsert: false, new: true })
        .then(prod => {
            res.status(200).json({
                status: true, data: prod, message: 'product updated successfully'
            })
        })
        .catch(error => res.status(500).json({
            status: false, message: error.message
        }))
}

function createProduct(req, res) {

    let sections = [];
    let product = req.body;
    req.body.sections.forEach(section => {
        sections.push(JSON.parse(section));
    })
    var _product = new Product();
    
    product.sections = sections;
    let file;
    if(req.file) {
        file = req.file.path.replace("uploads/", "");
    }
    product._id = _product._id;
    product.animationFile = file;
    _product.product.push(product);
    _product.save().then(product => {
        res.status(201).json({
            status: true,
            message: 'Product Created Successfully',
            data: product
        })
    })
    .catch(error => res.status(500).json({
        status: false, message: error.message
    }))
}
// added data in response co
function __createProduct(req, res) {
    
    let sections = [];
    req.body.sections.forEach(section => {
        sections.push(JSON.parse(section));
    })
    var product = new Product(req.body);
    product.sections = sections;
    let file;
    if(req.file) {
        file = req.file.path.replace("uploads/", "");
    }
    product.animationFile = file;
    product.save().then(product => {
        res.status(201).json({
            status: true,
            message: 'Product Created Successfully',
            data: product
        })
    })
        .catch(error => res.status(500).json({
            status: false, message: error.message
        }))
}

function getProductDetail(req, res) { }


// added section as response back
function addSectionToProduct(req, res) {
    let language = req.query.language;
    let section = {
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        body: req.body.body
    }
    Product.findOneAndUpdate({ _id: req.body.productId, "product.language":req.query.language || "eng" }, { $push: { "product.$.sections": section } }, { upsert: false, new: true })
        .then(product => {
            res.status(201).json({ status: true, data: section, message: 'section added successfully' });
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }));
}


function addToolToProduct(req, res) {
    if(!req.query.language) {
        req.query.language = 'eng';
    }

    let languages = ["eng", "bha", "fr", "sp", "vi"];
    if(languages.indexOf(req.query.language) == -1) {
        res.status(403).json({message: req.query.language + "language not exist"})
    }

    let tool = {
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        redirectUrl: req.body.redirectUrl,
        fileType:req.body.fileType,
        file: ''
    };

    switch (req.body.fileType) {
        case 'video':
            tool.file = "icons/video.png";
            break;
        case 'pdf':
            tool.file = "icons/pdf.png";
            break;
        case 'link':
            tool.file = "icons/link.png";
            break;
    }


    Product.findOneAndUpdate({ _id: req.body.productId, "product.language":req.query.language }, { $push: { "product.$.recommendedTools": tool } }, { upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, data: tool, message: 'Added Tool successfully'
            })
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }));
}
// added tool as response (OK)
function __addToolToProduct(req, res) {
    let tool = {
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        redirectUrl: req.body.redirectUrl,
        fileType:req.body.fileType,
        file: ''
    };

    switch (req.body.fileType) {
        case 'video':
            tool.file = "icons/video.png";
            break;
        case 'pdf':
            tool.file = "icons/pdf.png";
            break;
        case 'link':
            tool.file = "icons/link.png";
            break;
    }


    Product.findOneAndUpdate({ _id: req.body.productId }, { $push: { "product.$.recommendedTools": tool } }, { upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, data: tool, message: 'Added Tool successfully'
            })
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }));
}

function removeSectionfromProduct(req, res) {
    Product.findOneAndUpdate({ _id: req.query.pid }, { $pull: { sections: { _id: req.query.sid } } }, { upsert: false })
        .then(prod => {
            console.log(prod);
            res.status(200).json({
                status: true, message: 'Section removed successfully'
            })
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

function removeToolFromProduct(req, res) {
    Product.findOneAndUpdate({ _id: req.query.pid }, { $pull: { recommendedTools: { _id: req.query.tid } } }, { upsert: false })
        .then(prod => {
            res.status(200).json({
                status: true, message: 'Tool removed successfully'
            })
        })
        .catch(error => res.status(500).json({ status: false, message: error.message }))
}

//
function ___updatSectionInProduct(req, res) {

    let query = {
        'sections.$.title': req.body.title,
        'sections.$.body': req.body.body
    };

    if (!req.body.title) {
        delete query['sections.$.title']
    }

    if (!req.body.body) {
        delete query['sections.$.body']
    }

    Product.updateOne({ _id: req.query.pid, 'sections._id': req.query.sid }, { $set: query }, { upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, data: {title: req.body.title, body: req.body.body, _id: req.query.sid}, message: 'Successfully updated section'
            })
        })
        .catch(error => res.status(500).json({
            status: false,
            message: error.message
        }))
}


function updatSectionInProduct(req, res) {

    if(!req.query.language) {
        req.query.language = "eng";
    }
    let languages = ["eng", "bha", "fr", "sp", "vi"];
    if(languages.indexOf(req.query.language) == -1) {
        res.status(403).json({message: req.query.language + "language not exist"})
    }
    

    let query = {
        'product.$.sections.$[title]': req.body.title,
        'product.$.sections.$[body]': req.body.body
    };

    if (!req.body.title) {
        delete query['sections.$.title']
    }

    if (!req.body.body) {
        delete query['sections.$.body']
    }

    Product.update({ _id: req.query.pid}, 
    { $set: { "product.$[t].sections.$[sec].title": req.body.title, "product.$[t].sections.$[sec].body": req.body.body} },
    {arrayFilters:[{"t.language": req.query.language}, {"sec._id": req.query.sid}], upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, data: {title: req.body.title, body: req.body.body, _id: req.query.sid}, test: product, message: 'Successfully updated section'
            })
        })
        .catch(error => res.status(500).json({
            status: false,
            message: error.message
        }))
}


// added data in response (OK)
function updatToolInProduct(req, res) {

    if(!req.query.language) {
        req.query.language = "eng";
    }
    let languages = ["eng", "bha", "fr", "sp", "vi"];
    if(languages.indexOf(req.query.language) == -1) {
        res.status(403).json({message: req.query.language + "language not exist"})
    }
    
   let icon = "";
    if(req.body.fileType) {
       icon = 'icons/'+req.body.fileType + '.png'; 
    }
    
    let query = {
        'recommendedTools.$.title': req.body.title,
        'recommendedTools.$.redirectUrl': req.body.redirectUrl,
        'recommendedTools.$.fileType': req.body.fileType,
        'recommendedTools.$.file': icon
    };

    if (!req.body.title) {
        console.log('no title');
        delete query['recommendedTools.$.title']
    }
    if (!req.body.redirectUrl) {
        console.log('no redirect url');
        delete query['recommendedTools.$.redirectUrl']
    }
    if (!req.body.fileType) {
        console.log('no file type');
        delete query['recommendedTools.$.fileType']
    }

    

    Product.update({ _id: req.query.pid}, 
    { $set: { 
        "product.$[t].recommendedTools.$[tool].title": req.body.title, 
        "product.$[t].recommendedTools.$[tool].redirectUrl": req.body.body,
        "product.$[t].recommendedTools.$[tool].file": icon,
        "product.$[t].recommendedTools.$[tool].redirectUrl": req.body.redirectUrl
    } },
    {arrayFilters:[{"t.language": req.query.language}, {"tool._id": req.query.tid}], upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, 
                data: {
                    _id: req.query.tid,
                    title: req.body.title,
                    redirectUrl: req.body.redirectUrl,
                    fileType:req.body.fileType,
                    file: icon
                },
                test: product,
                message: 'Tool updated successfully'
            })
        })
        .catch(error => res.status(500).json({
            status: false,
            message: error.message
        }))
}


function ___updatToolInProduct(req, res) {

    console.log(req.body.title, req.query.pid, req.query.tid);
    let icon;
    if(req.body.fileType) {
       icon = 'icons/'+req.body.fileType + '.png'; 
    }
    
    let query = {
        'recommendedTools.$.title': req.body.title,
        'recommendedTools.$.redirectUrl': req.body.redirectUrl,
        'recommendedTools.$.fileType': req.body.fileType,
        'recommendedTools.$.file': icon
    };

    if (!req.body.title) {
        console.log('no title');
        delete query['recommendedTools.$.title']
    }
    if (!req.body.redirectUrl) {
        console.log('no redirect url');
        delete query['recommendedTools.$.redirectUrl']
    }
    if (!req.body.fileType) {
        console.log('no file type');
        delete query['recommendedTools.$.fileType']
    }

    

    Product.updateOne({ _id: req.query.pid, 'recommendedTools._id': req.query.tid }, { $set: query }, { upsert: false, new: true })
        .then(product => {
            res.status(200).json({
                status: true, 
                data: {
                    _id: req.query.tid,
                    title: req.body.title,
                    redirectUrl: req.body.redirectUrl,
                    fileType:req.body.fileType,
                    file: icon
                },
                message: 'Successfully updated section'
            })
        })
        .catch(error => res.status(500).json({
            status: false,
            message: error.message
        }))
}

function getAll(req, res) {
    req.query.language = req.query.language || "eng";
    let languages = ["eng", "bha", "fr", "sp", "vi"];

    if(languages.indexOf(req.query.language) == -1) {
        res.status(403).json({message: req.query.language + "language not exist"})
    }
    
    Product.find({}).then(products => {
        let _products = [];
        products.forEach(product => {
            let products = product.product.filter(prod => {
                return prod.language == req.query.language
            })
            _products.push(products[0]);
        })
        res.status(200).json({ status: true, data: _products, message: products.length + " products founds" })
    })
}

function removeProduct(req, res) {
    Product.findOneAndDelete({_id: req.params.id}).then(data => {
        res.json({
            status: true, message: 'Product deleted successfully'
        })
    })
    .catch(error => {
        res.status(500).json({status: false, message: error.message});
    })
}

async function createProductSeed(req, res) {
    try {
        console.log(ProductSeedData);
        let remove = await Product.remove({});
        console.log('removed older data');
        let addnew = await Product.create(ProductSeedData);
        res.status(200).json({status: true, message: 'Older Products Removed and New Products Added'});
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}

module.exports = router;

// Product.create(data).then(data => console.log(data)).catch(error => console.log(error));