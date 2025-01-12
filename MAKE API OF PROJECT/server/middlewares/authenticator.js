const bcrypt = require("bcryptjs"); // Use bcrypt for password comparison
const jwt = require("jsonwebtoken"); // JWT for generating tokens
const User = require("../models/user.model"); // Adjust the path to where your User model is located

// Function to authenticate user during login
const authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from the request body

    // Check if username and password are provided
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Find user by username in the database
    const user = await User.findOne({ username });

    // If no user found, return an error
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token with user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload
      process.env.JWT_SECRET, // Secret key for signing the JWT
      { expiresIn: "1h" } // Expiry time of the token (1 hour)
    );

    // Return the JWT token and user details (excluding password)
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        location: user.location,
      },
    });
  } catch (error) {
    console.error("Error during authentication:", error);
    res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
};

module.exports = authenticateUser;
