const router = require("express").Router();
const {
  createPostCtrl,
  GetAllPostsCtrl,
  GetOnePostsCtrl,
  GetPostsCountCtrl,
  DeletePostCtrl,
  UpdatePostCtrl,
  UpdatePhotoPostCtr,
  ToggleLikeCtrl,
  GetOneImageCtrl,
} = require("../controllers/postController");
const PhotoUpload = require("../middlewares/PhotoUpload");
const VerifyObjectId = require("../middlewares/VerifyObjectId");
const {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenUser,
} = require("../middlewares/verifyToken");

router
  .route("/")
  .post(verifyTokenAndAdmin, PhotoUpload.single("image"), createPostCtrl)
  .get(verifyTokenUser,GetAllPostsCtrl);
router.route("/count").get(verifyTokenAndAdmin,GetPostsCountCtrl);
router
  .route("/Update-photo/:id")
  .put(verifyTokenAndAdmin,PhotoUpload.single("image"), UpdatePhotoPostCtr);
router.route("/likes/:id").put(VerifyObjectId, verifyToken, ToggleLikeCtrl);
router
  .route("/get-image/:ImageName")
  .get(GetOneImageCtrl)
router
  .route("/:id")
  .get(VerifyObjectId, GetOnePostsCtrl)
  .delete(verifyTokenAndAdmin, VerifyObjectId, DeletePostCtrl)
  .put(verifyTokenAndAdmin, VerifyObjectId, UpdatePostCtrl);

module.exports = router;
