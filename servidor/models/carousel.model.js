const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");


const CarouselSchema = mongoose.Schema({

  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default:"",
  },
});



CarouselSchema.plugin(uniqueValidator, { message: "is already taken" });

//https://mongoosejs.com/docs/middleware.html#pre schema.pre is a middleware function


//how to use slug https://www.npmjs.com/package/slug
//Math.random saca un número aleatorio entre 0 y como máximo el multiplicado-> math.pow("numero","numeroAlQueSeEleva") por lo tanto un número entre 0 y 2.176.782.336 a letra





module.exports = mongoose.model("Carousel", CarouselSchema);
