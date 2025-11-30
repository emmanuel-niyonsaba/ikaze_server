const Appointments = require("../models/Appointment");

// CREATE appointment
exports.createAppointment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const appointment = await Appointments.create({
        ...req.body,
        UserId:userId
    });
    res.status(201).json({
      message: "Appointment created successfully",
      data: appointment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get pending Appoitments

exports.getPendingAppointments = async (req, res) => {
  try {
    const appointments = await Appointments.findAll({where:{
        status:"PENDING"
    }});
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET one appointment
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointments.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Not found" });

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointments.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated[0]) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointments.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
