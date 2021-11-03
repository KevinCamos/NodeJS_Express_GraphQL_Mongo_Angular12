var router = require("express").Router();
var crypto = require("crypto");
const fs = require("fs");
const path = require('path');
const faker = require('faker');

const Product = require("../../models/product.model");
const User = require("../../models/user.model");

router.post('/users/:qty_users', async (req, res, next) => {
    var qty_users = req.params.qty_users;

    var users = [];
    for (let i = 0; i < qty_users; i++) {
        faker_firstName = faker.name.firstName();
        faker_lastName = faker.name.lastName();
        faker_username = faker.internet.userName(faker_firstName, faker_lastName);
        faker_email = faker.internet.email(faker_firstName, faker_lastName);
        faker_password = faker.internet.password()
        faker_salt = crypto.randomBytes(16).toString("hex");
        faker_hash = crypto.pbkdf2Sync(faker_password, faker_salt, 10000, 512, "sha512").toString("hex");

        users.push(new User({
            username: faker_username,
            email: faker_email,
            salt: faker_salt,
            hash: faker_hash,
            image: "https://robohash.org"+faker_username
        }));
    }
    /* await User.insertMany(users); */
    res.status(500).send(users);
});

router.post('/products/:author/:id_category/:qty_products', async (req, res, next) => {
    
    var qty_products = req.params.qty_products;
    var author = req.params.author;
    var id_category = req.params.id_category;
    
    const jsonString = fs.readFileSync(path.join(__dirname,'../../utils/products.json'));
    const jsonProducts = JSON.parse(jsonString);
    

    var products = [];
    for (let i = 0; i < qty_products; i++) {
        var randomnumber1 = Math.floor(Math.random()*5)
        var randomnumber2 = Math.floor(Math.random()*5)
        var randomnumber3 = Math.floor(Math.random()*3)
    
        var name = jsonProducts.name[randomnumber1];
        var price = jsonProducts.price[randomnumber2];
        var images = jsonProducts.images[randomnumber1];
        var description = name + " " + jsonProducts.description[randomnumber2];
        var location = jsonProducts.location[randomnumber3];

        products.push(new Product({
            name: name,
            price: price,
            images: images,
            description: description,
            location: location,
            id_category: id_category,
            author: author,
        }));
    }
    await Product.insertMany(products);
    res.status(500).send(products);
});

module.exports = router;
