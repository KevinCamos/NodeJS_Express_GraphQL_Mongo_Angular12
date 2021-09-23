const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  reference: {
    type: Number,
    required: true,
  },
  name_category: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]

});

module.exports = mongoose.model("Category", CategorySchema);
