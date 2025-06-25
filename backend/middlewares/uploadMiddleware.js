const multer = require('multer');


// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null,`${Date.now()}-${file.originalname}`); // Unique filename with timestamp
  },
});

//file filter to allow only image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg','image/png','image/jpg']; // Allowed image types

  // const isValid = allowedTypes.test(file.mimetype); // Check if file type is valid
  
  if(allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  }else{
    cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false); // Reject the file
  }
};

const upload = multer({ storage, fileFilter });


module.exports = upload; // Export the configured multer instance for use in routes
// This middleware handles file uploads using multer.