const Query = require('../models/QueryModel');

const postQuery = async (req, res) => {
    try {
      const { fullName, email, subject, message } = req.body;
  
      const newQuery = new Query({ fullName, email, subject, message });
      await newQuery.save();
  
      res.status(201).json({ success: true, message: 'Query submitted successfully!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };

  const getAllQueries = async (req, res) => {
    try {
      const queries = await Query.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: queries });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };

  module.exports={getAllQueries,postQuery};
