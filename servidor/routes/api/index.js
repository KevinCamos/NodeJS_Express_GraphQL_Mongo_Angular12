var router = require("express").Router();
const products = require("./products");
const categories = require("./categories");
const carousel = require("./carousel");

/**s
 *
 * router.use("/ruta postman/", carpeta de uso de );
 */
router.use("/products/", products);
router.use("/categories/", categories);
router.use("/carousel/", carousel);

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
