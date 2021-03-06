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

/* DAME MIS PRODUCTOS */
router.get("/", auth.required, async function (req, res, next) {
  // console.log(req.payload);

  try {
    if (req.payload) {
      await Order.find({ id_user_buyer: req.payload.id })
        .populate("id_product")
        .then(function (orders) {
          if (!orders) {
            throw new Error("BROKEN");
          }
          // console.log(orders);
          return res.json(orders.map((order) => order.toJSONfor()));
        });
    } else {
      throw new Error("Hay un error en la autenticación JWT");
    }
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
});

/* COMPRAR UN PRODUCTE */
router.post("/:slug", auth.required, async function (req, res, next) {
  console.log("------------------------------");
  console.log(req.product);
  console.log("------------------------------");
  console.log(req.payload, req.product.author, req.product.status === true);
  // res.json(req.product);
  try {
    if (req.payload && req.product.author && req.product.status === true) {
      await User.findById(req.payload.id).then(function (user) {
        if (!user) {
          throw new Error("BROKEN");
        }
        let order = new Order();

        return res.json({
          order: order.createOrder(req.product, user),
        });
      });
    } else {
      throw new Error("BROKEN");
    }
  } catch (error) {
    res.status(500).send("Hubo un error");
  }
});

/* Update Rating */
router.put("/", auth.required, async function (req, res, next) {
  await Order.findById(req.body.order.id).then(function (order) {
    order.valoration = req.body.order.valoration;
    order.save();
  });
});

module.exports = router;
