const express = require("express");
const CategoryController = require("../controllers/categoryController");
const router = express.Router();

router.get("/", CategoryController.getAll);
router.post("/create", CategoryController.create);
router.get("/:id", CategoryController.getById);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

module.exports = router;
