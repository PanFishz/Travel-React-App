const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// if in development, get environment variables from .env
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    //console.log(process.env.CLOUDINARY_CLOUD_NAME);    //to check
}
//image storage, upload img to cloudinary, and get an url back which can be put in <img src="">
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'TravelApp',
        allowedFormat: ['jpeg', 'png', 'jpg']
    }
})

module.exports = { cloudinary, storage }