const express = require("express");
const controller = require("../controllers/cliente");
const middleware = require("../middlewares/middlewares");

const router = express.Router();

router.get("/", controller.list);
router.post("/", /*middleware.validateCliente,*/ controller.create);
router.get("/:id", controller.get);
router.get("/:id/details", controller.getDetails);
router.put("/:id", /*middleware.validateCliente,*/ controller.update);
router.delete("/:id", controller.remove);

router.post("/active/:id", controller.activate);
router.delete("/active/:id", controller.removeActive);

module.exports = router;
