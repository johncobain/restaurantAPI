const express = require("express");
const controller = require("../controllers/prato");
const middleware = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", controller.list);
router.post("/", /*middleware.validatePrato,*/ controller.create);
router.get("/:id", controller.get);
router.put("/:id", /*middleware.validatePrato,*/ controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
