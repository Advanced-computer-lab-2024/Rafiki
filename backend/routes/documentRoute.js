// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const router = express.Router();

// // Configure Multer storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // The folder where files will be saved
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Set unique file name
//     }
// });

// // Create the Multer upload middleware
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10000000 }, // Limit file size to 10MB
//     fileFilter: (req, file, cb) => {
//         // Only accept certain file types (e.g., .pdf, .doc, .png, .jpg)
//         const filetypes = /pdf|doc|docx|png|jpg|jpeg/;
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = filetypes.test(file.mimetype);

//         if (extname && mimetype) {
//             return cb(null, true);
//         } else {
//             cb(new Error('Only .pdf, .doc, .png, .jpg files are allowed'));
//         }
//     }
// });

// // Handle the file upload
// router.post('/uploadDocument', upload.single('file'), (req, res) => {
//     try {
//         // Check if the file exists
//         if (!req.file) {
//             return res.status(400).send({ message: 'No file uploaded' });
//         }

//         // File uploaded successfully
//         res.status(200).send({ message: 'File uploaded successfully', file: req.file });
//     } catch (err) {
//         res.status(500).send({ message: 'Server error', error: err.message });
//     }
// });



// router.get('/uploadedDocuments', (req, res) => {
//     const uploadsDir = path.join(__dirname, '../uploads');
    
//     fs.readdir(uploadsDir, (err, files) => {
//       if (err) {
//         return res.status(500).send({ message: 'Unable to scan files' });
//       }
  
//       const fileList = files.map(file => {
//         return {
//           filename: file,
//           originalname: file // You can modify this if you want to store original file names
//         };
//       });
  
//       res.status(200).json(fileList);
//     });
//   });
//   router.get('/uploadedDocuments', (req, res) => {
//     const uploadsDir = path.join(__dirname, '../uploads');
    
//     fs.readdir(uploadsDir, (err, files) => {
//       if (err) {
//         return res.status(500).send({ message: 'Unable to scan files' });
//       }
  
//       const fileList = files.map(file => {
//         return {
//           filename: file,
//           originalname: file // You can modify this if you want to store original file names
//         };
//       });
  
//       res.status(200).json(fileList);
//     });
//   });
    



// module.exports = router;
