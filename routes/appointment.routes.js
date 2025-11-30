const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointmentController");
const auth = require("../middleware/middleware");

router.post("/create", auth, controller.createAppointment);
router.get("/", auth, controller.getAppointments);
router.get("/:id", auth, controller.getAppointment);
router.put("/:id", auth, controller.updateAppointment);
router.delete("/:id", auth, controller.deleteAppointment);

module.exports = router;
    