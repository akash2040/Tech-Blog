const { Comments } = require("../models");
const sequelize = require("../config/connection");

const commentData = [
  {
    comment_text: "Good!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "best",
    user_id: 2,
    post_id: 2,
  },
  {
    comment_text: "awesome",
    user_id: 3,
    post_id: 3,
  },
];

const Commentseed = () => Comments.bulkCreate(commentData);

module.exports = Commentseed;
