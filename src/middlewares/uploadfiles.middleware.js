const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Proyectos_8_ApiRestFiles',
        allowedFormats: ['jpg', 'png', 'jpeg', 'gif']
    }
});
const upload = multer({ storage: storage });

module.exports = { upload };