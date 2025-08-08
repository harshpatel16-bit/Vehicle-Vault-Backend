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



  const deleteQueryById = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedQuery = await Query.findByIdAndDelete(id);
  
      if (!deletedQuery) {
        return res.status(404).json({ success: false, message: 'Query not found' });
      }
  
      res.status(200).json({ success: true, message: 'Query deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };





  module.exports={getAllQueries,postQuery,deleteQueryById};
