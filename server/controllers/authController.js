import UserModel from "../models/UserModel.js";
import { generateToken } from "../utils/crypt.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const registerUser = async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User Created Successfully",
      success: true,
      data: savedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error ${err.message}`,
      success: false,
      err,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).lean();
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = generateToken({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      message: "Login Successfull",
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server error ${error.message}`,
      success: false,
    });
  }
};

// export const register = async (req, res) => {
//   try {
//     const {name,email,password} = req.body;
//     const userExists = await User.findOne({email});
//     if(userExists) return res.status(400).json({message: 'User already exists'});

//     const user = await User.create({name, email, password});
//     const savedUser = await user.save();

//     res.status(201).json({
//       message: "User Created Successfully!",
//       success: true,
//       data: savedUser,
//     });
//   } catch (error) {
//     if (error.message.includes("E11000")) {
//       res
//         .status(400)
//         .json({ message: "Email already exists!", success: false });
//     } else {
//       res.status(500).json({
//         message: `Internal Server Error ${error.message}`,
//         success: false,
//       });
//     }
//   }
// }
