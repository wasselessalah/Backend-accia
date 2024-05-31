const router = require("express").Router();
const {
  CreateDocumentCtr,
  GetAllDocumentCtrl,
  GetOneDocumentCtrl,
  DeleteOneDocumentCtrl,
  UpdateOneDocumentCtrl,
  DownloadOneDocumentCtrl,
  readDocumentCtrl,
} = require("../controllers/documentController");
const DocumentUpload = require("../middlewares/RapportUpload");
const VerifyObjectId = require("../middlewares/VerifyObjectId");
const { verifyTokenUser } = require("../middlewares/verifyToken");
router
  .route("/")
  .post(DocumentUpload.single("pdfDocument"), CreateDocumentCtr)
  .get(verifyTokenUser, GetAllDocumentCtrl);
  router.route("/download/:id").get(VerifyObjectId,DownloadOneDocumentCtrl)
  router.get("/read/:id", readDocumentCtrl);
router
  .route("/:id")
  .get(VerifyObjectId, GetOneDocumentCtrl)
  .delete(VerifyObjectId, DeleteOneDocumentCtrl)
  .put(VerifyObjectId, UpdateOneDocumentCtrl);
module.exports = router;
