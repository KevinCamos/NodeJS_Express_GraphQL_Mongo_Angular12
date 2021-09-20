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
});

module.exports = mongoose.model("Category", CategorySchema);
