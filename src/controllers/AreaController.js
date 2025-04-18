const areaModel = require("../models/AreaModel");

const addArea = async (req, res) => {
  try {
    const savedArea = await areaModel.create(req.body);
    res.status(201).json({
      message: "Area added successfully",
      data: savedArea,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
const getAreas = async (req, res) => {
  try {
    const areas = await areaModel.find().populate("cityId").populate("stateId");
    res.status(200).json({
      message: "All Areas",
      data: areas,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//get all areas by city id:
const getAreaBycityId = async (req, res) => {
  try {
    const areas = await areaModel.find({ cityId: req.params.cityId });
    res.status(200).json({
      message: "area found",
      data: areas,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

//get area by its id:

const getAreaById = async (req, res) => {
  try {
    const area = await areaModel
      .findById(req.params.id)
      .populate("cityId")
      .populate("stateId");

    if (!area) {
      return res.status(404).json({ message: "Area not found" });
    }

    res.status(200).json({
      message: "Area found",
      data: area,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addArea, getAreas, getAreaBycityId,getAreaById };