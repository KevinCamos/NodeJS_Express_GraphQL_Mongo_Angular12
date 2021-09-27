const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema({
  routeImg: {
    type: String,
    required: true,
  },
  id_product: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", ImageSchema);