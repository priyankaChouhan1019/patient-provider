// controllers/allergyController.js
const Allergy = require('../models/allergy');

exports.addAllergy = async (req, res) => {
  try {
    const allergy = new Allergy(req.body);
    await allergy.save();
    res.status(201).json(allergy);
  } catch (error) {
    res.status(500).json({ message: 'Error adding allergy' });
  }
};
