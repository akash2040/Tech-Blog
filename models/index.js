const Users = require("./Users");
const Posts = require("./Posts");
const Comments = require("./Comments");

//create associations
Users.hasMany(Post, {
  foreignKey: "user_id",
});

Posts.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comments.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comments.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

Users.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Posts.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

module.exports = { Users, Posts, Comments };
