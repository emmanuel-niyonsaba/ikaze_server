const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { password, firstName, lastName, phone, email, rpCollege } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      rpCollege,
      password: hashedPassword
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    return res.status(201).json({
      message: "User registered successfully",
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });


    const token = jwt.sign(
      { id: user.id, role: user.role,email:user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE USER
exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { password, ...otherData } = req.body;
    let updateData = { ...otherData };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updated = await User.update(updateData, {
      where: { id: req.params.id }
    });

    if (!updated[0]) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.id}
    })
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
    console.log(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
