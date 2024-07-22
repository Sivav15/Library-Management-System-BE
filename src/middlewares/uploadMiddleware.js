const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

const s3Storage = multerS3({
  s3: s3, // s3 instance
  bucket: process.env.S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  // acl: "public-read",
  metadata: (req, file, cb) => {
    cb(null, { fieldname: file.fieldname, contentType: file.mimetype });
  },
  key: (req, file, cb) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage: s3Storage,
});

module.exports = upload;
