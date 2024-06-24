const { Router } = require("express");
const categoryRoutes = require("./categories");
const usersRoutes = require("./users");
const pagesRoutes = require("./pages");

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/users", usersRoutes);
router.use("/pages", pagesRoutes);

module.exports = router;

