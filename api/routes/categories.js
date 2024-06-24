const { Router } = require("express");
const { Category } = require("../models");
const router = Router();

// Ruta para obtener todas las categorías
router.get("/", function (_req, res, next) {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(error => next(error));
});

// Ruta para obtener una categoría por su ID
router.get("/:idCategory", function (req, res, next) {
  Category.findByPk(req.params.idCategory)
    .then(category => 
      category ? res.json(category) : res.sendStatus(404)
    )
    .catch(error => next(error));
});

module.exports = router;
