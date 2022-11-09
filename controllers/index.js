const router = require("express").Router();
const routesApi = require("./api");
const routeHome = require("./homepage-route");
const dashboardRoute = require("./dashboard-route");

router.use("/api", routesApi);
router.use("/", routeHome);
router.use("/dashboard", dashboardRoute);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
