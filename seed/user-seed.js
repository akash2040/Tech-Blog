const { Users } = require("../models");

const Datauser = [
  {
    username: "akash33",
    email: "akas@gmail.com",
    password: "akash",
  },
  {
    username: "nabin",
    email: "nabin@gmail.com",
    password: "nabin",
  },
  {
    username: "hello",
    email: "aaws@gmail.com",
    passoword: "hello",
  },
];

const Userseed = () => Users.bulkCreate(Datauser);

module.exports = Userseed;
