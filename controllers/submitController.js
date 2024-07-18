const Medication = require('../models/medication');
const Allergy = require('../models/allergy');
const User = require('../models/userModels'); 

exports.submitData = async (req, res) => {
  try {
    const { medications, allergies, consent, userId } = req.body;

    if (!consent) {
      return res.status(400).json({ message: 'Consent is required.' });
    }

    // Check if the user has already submitted their information
    const user = await User.findById(userId);
    if (user && user.submissionStatus === 'completed') {
      return res.status(400).json({ message: 'Information already submitted.' });
    }

    // Save medications and allergies
    const medicationPromises = medications.map(async (medication) => {
      const newMedication = new Medication(medication);
      await newMedication.save();
    });

    const allergyPromises = allergies.map(async (allergy) => {
      const newAllergy = new Allergy(allergy);
      await newAllergy.save();
    });

    await Promise.all([...medicationPromises, ...allergyPromises]);

    // Update user submission status
    user.submissionStatus = 'completed';
    await user.save();

    res.status(200).json({ message: 'Submission successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
