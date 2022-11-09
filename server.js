const express = require("express");
const routes = require("./controllers");
const exphbs = require("express-handlebars");
const session = require("express-session");
const sequelize = require("./config/connection");
const path = require("path");

const helpers = require("./utils/helper");

const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 86400,
  },

  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// set Handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

// connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
