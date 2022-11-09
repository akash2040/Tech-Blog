const sequelize = require("../config/connection");
const { Posts, Users, Comments } = require("../models");
const withAuth = require("../utils/auth");
const router = require("express").Router();

router.get("/", withAuth, (req, res) => {
  Posts.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Comments,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: Users,
        attributes: ["username"],
      },
    ],
  })
    .then((PostData) => {
      const posts = PostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a single post
router.get("/edit/:id", withAuth, (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: Users,
        attributes: ["username"],
      },
      {
        model: Comments,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: Users,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((PostData) => {
      if (!PostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      // serialize data before passing to template
      const post = PostData.get({ plain: true });
      res.render("edit-post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// redirecting users to sign in page once they sign up
router.get("/new", (req, res) => {
  res.render("new-post");
});

module.exports = router;
