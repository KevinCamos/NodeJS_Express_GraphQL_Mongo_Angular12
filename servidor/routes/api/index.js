var router = require("express").Router();

router.use("/", require("./users"));

router.use("/order", require("./order"));
router.use("/carousel", require("./carousel"));
router.use("/categories", require("./categories"));
router.use("/products", require("./products"));
router.use("/profiles", require("./profiles"));

router.use(function (err, req, res, next) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
