const router = require("express").Router();
const ensureAuthenticated = require("../Middlewares/Auth");

router.get("/", ensureAuthenticated, (req, res) => {
    console.log('------logged in user details------', req.user);
    res.status(200).json([
        {
        name: "Product 1",
        description: "achha product",
    }, {
        name: "Product 2",
        description: "aur achha product"
    }
    ])
})

module.exports = router;