const Users = require("./Users");
const Posts = require("./Posts");
const Comments = require("./Comments");

//create associations
Users.hasMany(Posts, {
  foreignKey: "user_id",
});

Posts.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comments.belongsTo(Users, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Comments.belongsTo(Posts, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

Users.hasMany(Comments, {
  foreignKey: "user_id",
  onDelete: "cascade",
});

Posts.hasMany(Comments, {
  foreignKey: "post_id",
  onDelete: "cascade",
});

module.exports = { Users, Posts, Comments };
