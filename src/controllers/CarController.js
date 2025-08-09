const carModel = require("../models/CarModel");
const multer = require("multer");
const path = require("path");
const cloudinaryUtil = require("../utils/CloudinaryUtil");

//storage engine

const storage = multer.memoryStorage();
const uploadFileBufferToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "cars" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    stream.end(fileBuffer);
  });
};



//multer object

const upload = multer({
  storage: storage,
  //fileFilter:
}).single("carURL");

const addCar = async (req, res) => {
  try {
    const savedCar = await carModel.create(req.body);
    res.status(201).json({
      message: "car added successfully",
      data: savedCar,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//-------------------------------------------------------------------------//
const getAllCars = async (req, res) => {
  try {
    const { model } = req.query;
    let filter = {};

    if (model) {
      filter.model = { $regex: new RegExp(model, 'i') }; // case-insensitive search
    }

    const cars = await carModel.find(filter).populate("stateId cityId areaId userId");

    if (cars.length === 0) {
      res.status(404).json({ message: "No cars found" });
    } else {
      res.status(200).json({
        message: "Car(s) found successfully",
        data: cars,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//-------------------------------------------------------------------------//
//new module

const addCarWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json({
        message: err.message,
      });
    } else {
      // database data store
      //cloundinary

      if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
      }

      const cloundinaryResponse = await cloudinaryUtil.uploadFileBufferToCloudinary(
        req.file.buffer
      );
      console.log(cloundinaryResponse);
      console.log(req.body);

      //store data in database
      req.body.carURL = cloundinaryResponse.secure_url;
      const savedCar = await carModel.create(req.body);

      res.status(200).json({
        message: "car saved successfully",
        data: savedCar,
      });
    }
  });
};

const getAllCarsByUserId = async (req, res) => {
  try {
    const cars = await carModel
      .find({ userId: req.params.userId })
      .populate("stateId cityId areaId userId");

    if (cars.length === 0) {
      res.status(404).json({ message: "No cars found" });
    } else {
      res.status(200).json({
        message: "car found successfully",
        data: cars,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const updatedCar = await carModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Car Updated Successfully",
      data: updatedCar,
    });
  } catch (err) {
    res.status(500).json({
      message: "error While Update Hording",
      err: err,
    });
  }
};

//end of new module

const getCarById = async(req,res)=>{

try{
  const car=await carModel.findById(req.params.id);
  if(!car){
    res.status(404).json({message: "No car found"});
  } else{
    res.status(200).json({
      message:"Car found successfully",
      data: car,
    });
  }
} catch(err){
  res.status(500).json({message: err.message});
}
}

//delete car API



const deleteCarById = async (req, res) => {
  try {
    const car = await carModel.findByIdAndDelete(req.params.id);
    if (!car) {
      res.status(404).json({ message: "No car found" });
    } else {
      res.status(200).json({
        message: "Car deleted successfully",
        data: car,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};









module.exports = { addCar, getAllCars, addCarWithFile, getAllCarsByUserId, updateCar, getCarById, deleteCarById };
