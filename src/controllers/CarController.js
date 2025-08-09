const carModel = require("../models/CarModel");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const cloudinaryUtil = require("../utils/CloudinaryUtil");

// Multer storage (in-memory)
const storage = multer.memoryStorage();

// Multer middleware
const upload = multer({
  storage: storage,
}).single("carURL");

// Add car without file
const addCar = async (req, res) => {
  try {
    const savedCar = await carModel.create(req.body);
    res.status(201).json({
      message: "Car added successfully",
      data: savedCar,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all cars (with optional model filter)
const getAllCars = async (req, res) => {
  try {
    const { model } = req.query;
    let filter = {};

    if (model) {
      filter.model = { $regex: new RegExp(model, "i") }; // case-insensitive search
    }

    const cars = await carModel.find(filter).populate("stateId cityId areaId userId");

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    res.status(200).json({
      message: "Car(s) found successfully",
      data: cars,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add car with file upload
const addCarWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file.buffer);
      req.body.carURL = cloudinaryResponse.secure_url;

      const savedCar = await carModel.create(req.body);

      res.status(200).json({
        message: "Car saved successfully",
        data: savedCar,
      });
    } catch (uploadErr) {
      res.status(500).json({ message: uploadErr.message });
    }
  });
};

// Get cars by user ID
const getAllCarsByUserId = async (req, res) => {
  try {
    const cars = await carModel
      .find({ userId: req.params.userId })
      .populate("stateId cityId areaId userId");

    if (cars.length === 0) {
      return res.status(404).json({ message: "No cars found" });
    }

    res.status(200).json({
      message: "Car(s) found successfully",
      data: cars,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update car by ID
const updateCar = async (req, res) => {
  try {
    const updatedCar = await carModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({
      message: "Car updated successfully",
      data: updatedCar,
    });
  } catch (err) {
    res.status(500).json({ message: "Error while updating car", err });
  }
};

// Get car by ID
const getCarById = async (req, res) => {
  try {
    const car = await carModel.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "No car found" });
    }

    res.status(200).json({
      message: "Car found successfully",
      data: car,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete car by ID
const deleteCarById = async (req, res) => {
  try {
    const car = await carModel.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "No car found" });
    }

    res.status(200).json({
      message: "Car deleted successfully",
      data: car,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addCar,
  getAllCars,
  addCarWithFile,
  getAllCarsByUserId,
  updateCar,
  getCarById,
  deleteCarById,
};
