const router = require("express").Router();
const { Posts, Users, Comments } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  console.log("======================");
  Posts.findAll({
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: Users,
        attributes: ["username"],
      },
      {
        model: Comments,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((PostData) => res.json(PostData.reverse()))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a single post by an id
router.get("/:id", (req, res) => {
  Posts.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "content", "title", "created_at"],
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
      res.json(PostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// creating a post
router.post("/", withAuth, (req, res) => {
  // create 1 post
  Posts.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  })
    .then((PostData) => res.json(PostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a post title
router.put("/:id", withAuth, (req, res) => {
  Posts.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((PostData) => {
      if (!PostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(PostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a post
router.delete("/:id", withAuth, (req, res) => {
  Posts.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((PostData) => {
      if (!PostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(PostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
