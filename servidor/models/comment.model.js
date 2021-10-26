var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema(
  {
    body: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

// Requires population of author
CommentSchema.methods.toJSONFor = function (user) {
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    // author: this.author.toProfileJSONFor(user)
    author: user.toProfileJSONFor(),
  };
};

mongoose.model("Comment", CommentSchema);
