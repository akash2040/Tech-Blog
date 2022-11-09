const router = require("express").Router();
const { Comments } = require("../../models");
const Comments = require("../../models/Comments");
const withAuth = require("../../utils/auth");

router.get("/", (req, res) => {
  Comments.findAll({})
    .then((CommentData) => res.json(CommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", withAuth, (req, res) => {
  if (req.session) {
    Comments.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,

      user_id: req.session.user_id,
    })
      .then((CommentData) => res.json(CommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.put("/:id", withAuth, (req, res) => {
  Comments.update(
    {
      comment_text: req.body.comment_text,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((CommentData) => {
      if (!CommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  Comments.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((CommentData) => {
      if (!CommentData) {
        res.status(404).json({ message: "No comment found with this id" });
        return;
      }
      res.json(CommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
