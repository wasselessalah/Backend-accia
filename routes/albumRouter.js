const express = require('express');
const router = express.Router();
const { upload, extractAndUploadImages } = require("../middlewares/AlbumUpload");
const { handleFileUploadMiddleware, verifierAlbumName } = require('../middlewares/AlbumUpload');
const { createAlbumCtrl, UpdateAlbumCtrl, GetAllImageCtrl, GetOneImageCtrl, deleteOneImageCtrl } = require('../controllers/albumController');
router.route("/")
        .post(upload, extractAndUploadImages, createAlbumCtrl)
        .put(upload, extractAndUploadImages, UpdateAlbumCtrl)
router.route("/:eventFolder")
        .get(GetAllImageCtrl)
router.route("/:eventFolder/:imageName")
        .get(GetOneImageCtrl)
        .delete(deleteOneImageCtrl)
module.exports = router;


