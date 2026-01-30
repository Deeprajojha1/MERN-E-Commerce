import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};


// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
// LOGIN
// Backend/Controllers/User.js

// Backend/Controllers/User.js
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️ Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 2️ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 3️⃣ Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "jwt_token551515",
      { expiresIn: "7d" }
    );

    // 4️⃣ Send response (NO COOKIE)
    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // 👈 frontend will store this
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};



// Get All Users
export const getAllUsers=async(req,res)=>{
    try{
        let users = await User.find().sort({ createdAt: -1 });

        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message:"Error fetching users"});
    }
}

// user profile
export const getUserProfile=async(req,res)=>{
    try{
      const userId=req.user._id;
        const user=await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:"Error fetching user profile"});
    }
}

// Logout User
export const logoutUser = async (req, res) => {
  try {
    // Frontend token remove karega (Cookies / localStorage)
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error logging out",
    });
  }
};
