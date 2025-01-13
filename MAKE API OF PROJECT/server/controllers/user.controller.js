const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const registerUser = async (req, res) => {
  try {
    const { username, email, dob, role, location, password, confirmPassword } =
      req.body;

    // Check if all required fields are provided
    if (
      !username ||
      !email ||
      !dob ||
      !role ||
      !location ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      dob,
      role,
      location,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    // Send a success response
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Log the login attempt
    const logData = `${new Date().toISOString()} - Username: ${
      user.username
    }, Role: ${user.role}\n`;
    fs.appendFileSync("log.txt", logData);

    // Exclude the password from the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Send response
    res.status(200).cookie("token", token).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "An error occurred during login" });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    message: "User fetch succesfully",
    users,
    success: true,
  });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

const updateUser = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    updatedUser,
    message: "User updated successfully",
    success: true,
  });
};

const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User deleted successfully" });
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
