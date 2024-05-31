const mongoose = require("mongoose")
const joi = require("joi");

const documentSchema = new mongoose.Schema({
    title: {
        ar: { type: String, required: true, trim: true },
        fr: { type: String, required: true, trim: true },
        eng: { type: String, required: true, trim: true },
    },
    documentPath: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    date: {
        type: Date,
    },
    type: {
        type: String,
        required: true
    },
    isVisible: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true,
    timeseries: true
});
const RapportDocument = mongoose.model("Document", documentSchema);
function ValidateCreateDocument(obj) {
    const schema = joi.object({
        title_ar: joi.string().required(),
        title_fr: joi.string().required(),
        title_eng: joi.string().required(),
        type: joi.string().required(),
        isVisible: joi.boolean().required(),
        folderName: joi.string()
    })
    return schema.validate(obj)
}
function ValidateUpdateDocument(obj) {
    const schema = joi.object({
        title_fr: joi.string(),
        title_eng: joi.string(),
        title_ar: joi.string(),
        type: joi.string(),
        isVisible: joi.boolean()
    })
    return schema.validate(obj)
}
module.exports = {
    RapportDocument, ValidateCreateDocument, ValidateUpdateDocument
}