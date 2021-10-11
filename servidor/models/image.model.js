const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  id_product: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Image", ImageSchema);
