const router=require("express").Router()
const { CreateEventCtrl, GetAllEventCtrl, GetOneEventCtrl, UpdateOneEventCtrl, UpdatePhotoEventCtrl, DeleteOneEventCtrl, GetOneImageCtrl, hasSpecialEvent } = require("../controllers/EventController")
const PhotoUpload = require("../middlewares/PhotoUpload")
const { verifyTokenAndAdmin, verifyTokenUser } = require("../middlewares/verifyToken")

router
  .route("/")
  .post(PhotoUpload.single("image"), CreateEventCtrl)
  .get(verifyTokenUser, GetAllEventCtrl);
router.route("/has-special-event").get(verifyTokenUser, hasSpecialEvent);
router.route("/get-image/:ImageName").get(GetOneImageCtrl)
router.route("/update-photo/:id").put(PhotoUpload.single("image"),UpdatePhotoEventCtrl)
router
  .route("/:id")
  .get(GetOneEventCtrl)
  .put(verifyTokenAndAdmin, UpdateOneEventCtrl)
  .delete(verifyTokenAndAdmin, DeleteOneEventCtrl);

module.exports = router;
