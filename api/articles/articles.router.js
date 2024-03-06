const express = require("express");
const articleController = require("./articles.controller");
const router = express.Router();

router.post("/", articleController.create);
router.put("/:id", articleController.update);
router.delete("/:id", articleController.delete);

module.exports = router;
