const multer = require('multer');
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { ValidateCreateAlbum } = require('../models/Album');
// Définir le répertoire temporaire pour les fichiers téléchargés
const tempUploadDir = path.join(__dirname, '../public/tempUploads/');
if (!fs.existsSync(tempUploadDir)) {
  fs.mkdirSync(tempUploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempUploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === 'application/zip') {
      cb(null, true);
    } else {
      cb(
        { message: 'Format de fichier non pris en charge. Veuillez télécharger un fichier zip.' },
        false
      );
    }
  }
}).single('zipFile');

function isMetaFile(zipEntry) {
  return zipEntry.entryName.startsWith('__MACOSX/') || zipEntry.entryName.startsWith('._');
}
// Middleware pour gérer le téléchargement et l'extraction du dossier zip
const extractAndUploadImages = (req, res, next) => {

  try {
    const tempUploadDir = path.join(__dirname, '../public/tempUploads/');
    if (!fs.existsSync(tempUploadDir)) {
      fs.mkdirSync(tempUploadDir, { recursive: true });
    }
    // Vérifier si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).send('Aucun fichier n\'a été téléchargé.');
    }
    const { error } = ValidateCreateAlbum(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    // Récupérer le fichier zip téléchargé
    const zipFile = req.file;
    // Extraire le contenu du fichier zip
    const zip = new AdmZip(zipFile.path);
    const zipEntries = zip.getEntries();

    // Créer un dossier pour stocker les fichiers extraits
    const uploadDir = path.join(__dirname, "../public/Gallerie");
    const tempDir = path.join(uploadDir, 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    const subDir = path.join(uploadDir, req.body.nameFolder || 'corbeille');
    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir, { recursive: true });
    }

    // Extraire chaque fichier du zip
    zipEntries.forEach((zipEntry) => {
      if (zipEntry.entryName.match(/\.(jpg|jpeg|png|gif)$/i) && !isMetaFile(zipEntry)) {
        zip.extractEntryTo(zipEntry, tempDir, false, true);
      }
    });

    req.tempDirectory = tempDir


    // Supprimer le fichier zip temporaire

    fs.rmSync(zipFile.path, { force: true, recursive: true });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Une erreur est survenue lors du traitement du fichier.');
  }
};

module.exports = {
  upload,
  extractAndUploadImages
}