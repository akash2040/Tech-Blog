const { Post } = require("../models");
const sequelize = require("../config/connection");

const Datapost = [
  {
    title: "python",
    content: "first program",
    user_id: 1,
  },
  {
    title: "handlebars",
    content: "It is a javascript library ",
    user_id: 2,
  },
  {
    title: "cookies",
    content: "Cookies",
    user_id: 3,
  },
];

const Postseed = () => Post.bulkCreate(Datapost);
module.exports = Postseed;
