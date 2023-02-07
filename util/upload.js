const AWS = require('aws-sdk');
const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
const multer = require('multer');
const multerS3 = require('multer-s3');

const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: process.env.S3_ACCESSKEY,
        secretAccessKey: process.env.S3_SECRETKEY,
    },
});

function setUpload(bucket) {
    let upload = multer({
        storage: multerS3({
            s3: S3,
            bucket: bucket,
            acl: 'public-read-write',
            key: function (req, file, cb) {
                let extension = path.extname(file.originalname);
                cb(null, Date.now().toString() + extension);
            },
        }),
    }).single('file');

    return upload;
}

module.exports = setUpload;
