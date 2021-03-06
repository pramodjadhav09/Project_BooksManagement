const aws = require("aws-sdk")
const express = require('express');
const removeUploadedFiles = require('multer/lib/remove-uploaded-files');
const router = express.Router();




//S3FileUpload---------------

//Config Setup-

aws.config.update(
    {
        accessKeyId: "AKIAY3L35MCRVFM24Q7U",
        secretAccessKey: "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",
        region: "ap-south-1"
    }
)

//Function For File Upload-

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new aws.S3({ apiVersion: "2006-03-01" })
        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "pramod/" + file.originalname,
            Body: file.buffer
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            return resolve(data.Location)
        }
        )
    }
    )
}

//UploadFiles-
const uploadFiles = async function (req, res) {

    try {
        let files = req.files
        if (files && files.length > 0) {

            let uploadedFileURL = await uploadFile(files[0])
            return res.status(201).send({ msg: "file uploaded succesfully", data: uploadedFileURL })
        }
        else {
            return res.status(400).send({ msg: "No file found" })
        }
    } catch (err) {
        return res.status(500).send({ msg: err })
    }
}


module.exports.uploadFiles = uploadFiles