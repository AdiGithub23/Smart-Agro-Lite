const express = require('express');
const multer = require('multer');
const {
  uploadDistricts,
  uploadDivisions,
  uploadGSDivisions,
  uploadImages,
  viewDistricts
} = require('../controllers/recommendationController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload/districts', upload.single('file'), uploadDistricts);

router.post('/upload/divisions', upload.single('file'), uploadDivisions);

router.post('/upload/gs-divisions', upload.single('file'), uploadGSDivisions);

router.post('/upload/images', upload.single('file'), uploadImages);

router.get('/districts',viewDistricts);

module.exports = router;
