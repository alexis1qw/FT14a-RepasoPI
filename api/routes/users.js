const { Router } = require("express");
const { User, Page } = require("../models"); // Asegúrate de importar el modelo Page también
const router = Router();

router.get("/", async function (_req, res, next) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users', details: error.message });
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const user = await User.findByPk(parseInt(req.params.id), { include: [Page] });
    return user ? res.json(user) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
