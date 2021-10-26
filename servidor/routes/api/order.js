var router = require("express").Router();
var mongoose = require("mongoose");
var User = mongoose.model("User");
var Order = mongoose.model("Order");
var Product = mongoose.model("Product");
var auth = require("../auth");

router.param("slug", async (req, res, next, slug) => {
  await Product.findOne({ slug: slug })
    .populate("author")
    .then(function (product) {
      if (!product) {
        return res.sendStatus(404);
      }
      req.product = product;
      return next();
      // res.json(product);
    })
    .catch(next);
});

/* FOLLOW */
router.post("/:slug", auth.required, async function (req, res, next) {

  console.log(req.payload, req.product.author, req.product.status === true)
  // res.json(req.product);
  try {
    if (req.payload && req.product.author && req.product.status === true) {
      await User.findById(req.payload.id).then(function (user) {
        if (!user) {
          throw new Error("BROKEN");
        }
        let order = new Order();


        //  order.createOrder(req.product, user)
        return res.json({
          order: order.createOrder(req.product, user),
        });
        // return res.json({
        //   order: order.toJSONfor(req.product, user),
        // });
      });
    } else {
      throw new Error("BROKEN");
    }
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
});

module.exports = router;