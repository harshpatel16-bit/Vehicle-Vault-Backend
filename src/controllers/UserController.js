const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt")
const mailUtil = require("../utils/MailUtil")
const jwt=require("jsonwebtoken");
const secret = "secret";

const loginUser = async (req,res) => {

    const email = req.body.email;
    const password = req.body.password;

    const foundUserfromEmail = await userModel.findOne({email: email}).populate("roleId");
    console.log(foundUserfromEmail); 

    if (foundUserfromEmail != null ) {
        const isMatch = bcrypt.compareSync(password, foundUserfromEmail.password);

        if (isMatch == true) {
            res.status(200).json({
                message:"login success",
                data : foundUserfromEmail,
            });
        } else {
            res.status(404).json({
                message:"invalid cred..",
            });
        } 
    } else {
            res.status(404).json({
                message:"email not found..",
            });
        }
    };

const signup = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword =bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword;
        const createUser = await userModel.create(req.body);
        await mailUtil.sendingMail(createUser.email,"Welcome To Vehicle Vault","This Is Welcome Mail")
        res.status(201).json({
            message:"user created..",
            data: createUser,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message:"error",
            data: err,
        });
    }
};

const addUser = async (req, res) => {
    const savedUser = await userModel.create(req.body);
    res.json({
        message:"User saved successfully",
        data: savedUser,
    });
};
const getAllUsers = async (req, res) => {
    const users = await userModel.find().populate("roleId");
    res.json({
        message:"User fetched successfully..",
        data: users,
    });
};

const getUserById = async (req, res) => {
    const foundUser = await userModel.findById(req.params.id);
    res.json({
        message: "user fetched successfully..",
        data: foundUser,
    });
};

const deleteUserById = async (req, res) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
      res.json({
        message: "User deleted successfully...",
        data: deletedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
    }
  };
  

// forgot password API:

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const foundUser = await userModel.findOne({ email: email });
  
    if (foundUser) {
      const token = jwt.sign(foundUser.toObject(), secret);
      console.log(token);
      const url = `http://localhost:5173/resetpassword/${token}`;
      const mailContent = `<html>
                            <a href ="${url}">reset your password</a>
                            </html>`;
      //email...
      await mailUtil.sendingMail(foundUser.email, "reset password", mailContent);
      res.json({
        message: "reset password link sent to mail.",
      });
    } else {
      res.json({
        message: "user not found register first..",
      });
    }
  };
  
 // reset password API:

 const resetpassword = async (req, res) => {
    const token = req.body.token; //decode --> email | id
    const newPassword = req.body.password;
  
    const userFromToken = jwt.verify(token, secret);
    //object -->email,id..
    //password encrypt...
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword,salt);
  
    const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
      password: hashedPassword,
    });
    res.json({
      message: "password updated successfully..",
    });
  };













module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    signup,
    loginUser,
    forgotPassword,
    resetpassword
};