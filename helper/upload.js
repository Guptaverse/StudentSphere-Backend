const cloudinary = require('cloudinary')
let streamifier = require('streamifier');
const dotenv = require('dotenv');
dotenv.config();

// cloudinary config files
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // api key
    api_secret: process.env.CLOUDINARY_API_SECRET, // api secret
});

// const uploadToCloud = (path, folderName = 'pdf') => {
//     return cloudinary.uploader.upload(path, { folder: folderName }); // upload from server to cloudinary
// };

let uploadToCloud = (data) => {

    return new Promise((resolve, reject) => {

        let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
            {
                folder: "foo"
            },
            (error, result) => {

                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(data).pipe(cld_upload_stream);
    });

};

module.exports = { uploadToCloud };