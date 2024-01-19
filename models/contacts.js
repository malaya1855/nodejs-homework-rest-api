const { Schema, model } = require("mongoose");

const Joi = require("joi");
const { handleMongooseError } = require("../middlewares");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const addFavoriteschema = Joi.object({ favorite: Joi.boolean().required() });

const Contact = model("contact", contactSchema);

const schemas = { addSchema, addFavoriteschema };
module.exports = { schemas, Contact };
