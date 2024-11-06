const fs = require('fs'); // Import the fs module to interact with the filesystem
const multer = require('multer');
const path = require('path');

const createDirectory = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};
// Define directories
const avatarUploadDir = path.join(__dirname, '../uploads/avatar');
const contributionFileUploadDir = path.join(__dirname, '../uploads/contribution'); // Ensure this path is correct

// Create directories if they do not exist
createDirectory(avatarUploadDir);
createDirectory(contributionFileUploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarUploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const storageContributionFiles = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, contributionFileUploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Configuration for avatar uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images Only!'));
        }
    },
}).single('avatar');

// Configuration for contribution file uploads
const uploadContributionFiles = multer({
    storage: storageContributionFiles,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).array('files');

// Exporting both upload functions
module.exports = {
    upload,
    uploadContributionFiles,
};