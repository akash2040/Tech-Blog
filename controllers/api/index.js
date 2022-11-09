const router = require("express").Router();

const userRoute = require("./user-routes");
const postRoute = require("./post");
const commentRoute = require("./comment");

router.use("/users", userRoute);
router.use("/posts", postRoute);
router.use("/comments", commentRoute);

module.exports = router;
