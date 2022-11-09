const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const router = require("express").Router();
