const mongoose = require("mongoose");
const joi = require("joi");

const AlbumSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // unique:true
    },
    description: {
      type: String,
      default:'Album',
    
    
      // unique:true
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model("Album", AlbumSchema);
function ValidateCreateAlbum(obj) {
  const schema = joi.object({
    nameFolder: joi.string().trim().min(2).required(),
    description: joi.string().max(50)
  });
  return schema.validate(obj);
}
module.exports = {
  Album,
  ValidateCreateAlbum,
};
