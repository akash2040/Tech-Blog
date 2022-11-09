const router = require("express").Router();
const { Users, Posts, Comments } = require("../../models");

// GET /api/users
router.get("/", (req, res) => {
  // access our user model and run .findAll() method -- similar to SELECT * FROM users;
  Users.findAll({
    attributes: { exclude: ["[password"] },
  })
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/id
router.get("/:id", (req, res) => {
  Users.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Posts,
        attributes: ["id", "title", "content", "created_at"],
      },
      // include the Comment model here:
      {
        model: Comments,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Posts,
        attributes: ["title"],
      },
    ],
  })
    .then((UserData) => {
      if (!UserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(UserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Users.create({
    username: req.body.username,
    password: req.body.password,
  })

    .then((UserData) => {
      req.session.save(() => {
        req.session.user_id = UserData.id;
        req.session.username = UserData.username;
        req.session.loggedIn = true;

        res.json(UserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  Users.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((UserData) => {
      if (!UserData) {
        res.status(400).json({ message: "No user with that username!" });
        return;
      }
      const validPassword = UserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: "Incorrect password!" });
        return;
      }
      req.session.save(() => {
        req.session.user_id = UserData.id;
        req.session.username = UserData.username;
        req.session.loggedIn = true;

        res.json({ user: UserData, message: "You are now logged in!" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
router.put("/:id", (req, res) => {
  Users.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((UserData) => {
      if (!UserData[0]) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(UserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete("/:id", (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((UserData) => {
      if (!UserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(UserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
