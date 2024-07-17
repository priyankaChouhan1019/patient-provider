const Patient = require('../models/Patient');

// @desc    Save patient demographics
// @route   POST /api/patient-demographics
// @access  Public
exports.savePatientDemographics = async (req, res) => {
  const {
    familyName,
    givenName,
    gender,
    dob,
    address1,
    address2,
    country,
    state,
    city,
    zip,
    phoneNumber,
  } = req.body;

  try {
    const patient = new Patient({
      familyName,
      givenName,
      gender,
      dob,
      address1,
      address2,
      country,
      state,
      city,
      zip,
      phoneNumber,
    });

    await patient.save();

    res.status(201).json({ message: 'Patient demographics saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error. Unable to save patient demographics.' });
  }
};
