var router = require("express").Router();
var auth = require("../auth");

var mongoose = require("mongoose");
var Comment = mongoose.model("Comment");
var User = mongoose.model("User");

const Product = require("../../models/product.model");
const Category = require("../../models/category.model");

//açò va quan busquem un producte per "Slug"
router.param("slug", async (req, res, next, slug) => {
  console.log("Esta función es llamada antes del get.");
  await Product.findOne({ slug: slug })
    .then(function (product) {
      if (!product) {
        return res.sendStatus(404);
      }
      req.product = product;
      console.log(product);
      return next();
      // res.json(product);
    })
    .catch(next);
});

router.get("/:slug", async (req, res) => {
  if (!req.product) {
    try {
      console.log("No ha trobat res a 'param'-'slug' i ha entrat ací");

      let product = await Product.findOne({ slug: req.params.slug });
      console.log(product);

      if (!product) {
        res.status(404).json({ msg: "No existe el product" });
      }
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
  } else {
    res.json(req.product);
  }
});

/**
 * router.get /search/:search es una función para buscar productos slug
 */
router.get("/list-search/:search", async (req, res) => {
  try {
    console.log("Ha entrat a search");
    let search = new RegExp(req.params.search);
    console.log(search);

    // const product = await Product.find({  $or: [{name: {$regex: search }  }, { location: {$regex: search }  }] });
    const product = await Product.find({ name: { $regex: search } }).limit(20);

    if (!product) {
      res.status(404).json({ msg: "No existe el product" });
    }
    res.json(product.map((product) => product.toListJSONFor()));
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en router.get /search/:search");
  }
});

router.get("/search/:search", async (req, res) => {
  try {
    console.log("Ha entrat a search");
    let search = new RegExp(req.params.search);
    console.log(search);

    // const product = await Product.find({  $or: [{name: {$regex: search }  }, { location: {$regex: search }  }] });
    const product = await Product.find({ name: { $regex: search } });

    if (!product) {
      res.status(404).json({ msg: "No existe el product" });
    }
    res.json(product.map((product) => product.toJSONFor()));
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en router.get /search/:search");
  }
});

router.get("/", async (req, res) => {
  try {
    let query = {};
    let transUndefined = (varQuery, otherResult) => {
      return varQuery != "undefined" && varQuery ? varQuery : otherResult;
    };

    // let limit = transUndefined(req.query.limit, 6);
    let limit = 3;
    let offset = transUndefined(req.query.offset, 0);
    let name = transUndefined(req.query.name, "");
    let location = transUndefined(req.query.location, "");
    let priceMin = transUndefined(req.query.priceMin, 0);
    let category = transUndefined(Number(req.query.category), -1);
    let priceMax = transUndefined(req.query.priceMax, Number.MAX_SAFE_INTEGER);
    let nameReg = new RegExp(name);
    let locationReg = new RegExp(location);

    query = {
      name: { $regex: nameReg },
      location: { $regex: locationReg },
      $and: [{ price: { $gte: priceMin } }, { price: { $lte: priceMax } }],
    };

    if (category != -1) {
      query.id_category = category;
    }

    const products = await Product.find(query)
      .sort("name")
      .limit(Number(limit))
      .skip(Number(offset));
    const productCount = await Product.find(query).countDocuments();

    if (!products) {
      res.status(404).json({ msg: "No existe el product" });
    }

    return res.json({
      products: products.map(function (product) {
        return product.toJSONFor();
      }),
      productCount: productCount / limit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en router.get /search/:search");
  }
});
/**
 * Devuelve todos los productos de BBDD
 */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products.map((product) => product.toJSONFor()));
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});
/**
 * MODIFICA UN PRODUCTO USANDO LA ID
 */
router.put("/:id", async (req, res) => {
  try {
    // const { name, id_category, location, price, id_user} = req.body;
    const { name, id_category, location, price } = req.body;
    let product = await Product.findById(req.params.id);

    if (!product) {
      res.status(404).json({ msg: "No existe el product" });
    }

    product.name = name;
    product.id_category = id_category;
    product.location = location;
    product.price = price;
    //Al modificar, que s'actualitze el Date.Now
    product.updateDate = Date.now();
    // product.id_user = id_user;  Quan hi hatja que ficar usuari, no es farà update sobre ell, sino s'anyadirà al "create", açò sols es una prova

    product = await Product.findOneAndUpdate({ _id: req.params.id }, product, {
      new: true,
    });

    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});


router.post("/", async (req, res) => {
  try {
    let product;

    product = new Product(req.body);
    //La siguiente operación busca en la tabla 'categories' y le añade en ella el _id del producto, para su posterior poulate("products")
    const category = await Category.updateOne(
      { reference: product.id_category },
      { $push: { products: product._id } }
    );

    //Probem d'ací

    //a ací

    console.log(category);
    await product.save(); //Almacena el producte
    console.log(req.body);
    res.send(product);
    //res.json({product:toJSONfor(param)}) -> preguntar en clase para qué sirve, y si hay que poner o no return
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

/**
 * ELIMINA UN PRODUCTO
 */
router.delete("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ msg: "No existe el product" });
    }
    await Product.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Product eliminado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
});

/* COMENTARIOS */

// return an article's comments
router.get('/:product/comments', auth.optional, function(req, res, next){
  var productSlug = req.params.product;

  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){

    Product.findOne({ slug: productSlug }).populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).then(function (product) {


return res.json({comments: product.comments.map(function(comment){
  // console.log(comment.author)
  console.log(comment.toJSONFor(comment.author))
  
  return comment.toJSONFor(comment.author);
})
    })
  })

  }).catch(next);
});

// create a new comment
router.post(
  "/:product/comments",
  auth.required,
  async function (req, res, next) {
    var productSlug = req.params.product;

    try {
      await User.findById(req.payload.id)
        .then(function (user) {
          if (!user) return res.sendStatus(401);
console.log(req.body)
          var comment = new Comment(req.body.comment);
          console.log(comment)

          Product.findOne({ slug: productSlug }).then(function (product) {
            if (!product) return res.sendStatus(404);

            comment.author = user._id;
            comment.product = product._id;
            return comment.save().then(function () {
              product.comments.push(comment);
            
              return product.save().then(function () {
                res.json({ comment: comment.toJSONFor(user) });
              });
            });
          });
        })
        .catch(next);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error en la función post/:procut/comments");
    }
  }
);

// router.delete('/:article/comments/:comment', auth.required, function(req, res, next) {
//   if(req.comment.author.toString() === req.payload.id.toString()){
//     req.article.comments.remove(req.comment._id);
//     req.article.save()
//       .then(Comment.find({_id: req.comment._id}).remove().exec())
//       .then(function(){
//         res.sendStatus(204);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });

module.exports = router;
