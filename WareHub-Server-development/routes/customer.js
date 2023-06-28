const express = require("express");
const CustomerController = require("../controllers/customerController");
const router = express.Router();

router.get("/", CustomerController.getAll);
router.post("/create", CustomerController.create);
router.get("/:id", CustomerController.getById);
router.put("/:id", CustomerController.update);
router.delete("/:id", CustomerController.delete);

module.exports = router;
