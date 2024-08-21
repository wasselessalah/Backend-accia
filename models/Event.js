const mongoose = require("mongoose");
const Joi = require("joi");

const EventSchema = new mongoose.Schema(
  {
    title: {
      ar: { type: String, required: true, trim: true },
      fr: { type: String, required: true, trim: true },
      eng: { type: String, required: true, trim: true },
    },
    description: {
      ar: { type: String, required: true, trim: true },
      fr: { type: String, required: true, trim: true },
      eng: { type: String, required: true, trim: true },
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicID: null,
      },
    },
    H_Start: {
      type: Date,
      required: true,
    },
    H_Fin: {
      type: Date,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    Sponsor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sponsor",
      },
    ],

    isVisible: {
      type: Boolean,
      required: true,
    },
    isSpecial: {
      type: Boolean,
      required: true,
    },  isExpired:{
      type: Boolean,
      default: false
  
    }
  },

  {
    timeseries: true,
    timestamps: true,
  }
);


const Event = mongoose.model('Event', EventSchema);

function ValidateCreateEvent(obj) {
    const schema = Joi.object({
      title_ar: Joi.string().required(),
      title_fr: Joi.string().required(),
      title_eng: Joi.string().required(),
      description_ar: Joi.string().required(),
      description_fr: Joi.string().required(),
      description_eng: Joi.string().required(),
      Location: Joi.string().trim().min(5).required(),
      H_Start: Joi.date().required(),
      H_Fin: Joi.date().required(),
      date: Joi.date().required(),
      isVisible: Joi.boolean().required(),
      isSpecial: Joi.boolean().required(),
      folderName: Joi.string(),
    });
    return schema.validate(obj);
}
function ValidateUpdateEvent(obj) {
    const schema = Joi.object({
      title_ar: Joi.string(),
      title_fr: Joi.string(),
      title_eng: Joi.string(),
      description_ar: Joi.string(),
      description_fr: Joi.string(),
      description_eng: Joi.string(),
      Location: Joi.string().trim().min(5),
      H_Start: Joi.date().iso(),
      H_Fin: Joi.date().iso(),
      date: Joi.date(),
      Upload: Joi.string(),
      isVisible: Joi.boolean(),
      isSpecial: Joi.boolean(),
    });
    return schema.validate(obj);
}
module.exports = {
    Event, ValidateCreateEvent, ValidateUpdateEvent
}