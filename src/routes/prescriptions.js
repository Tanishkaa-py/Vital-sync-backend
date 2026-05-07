const express = require('express');
const Prescription = require('../models/Prescription');
const protect = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// ── CREATE ── POST /api/prescriptions
router.post('/', async (req, res) => {
  try {
    const { medicationName, dosage, frequency, duration, notes, doctorName } = req.body;

    if (!medicationName || !dosage || !frequency || !duration) {
      return res.status(400).json({ message: 'Please provide medicationName, dosage, frequency, and duration' });
    }

    const prescription = await Prescription.create({
      patientId: req.user._id,
      doctorId: req.user._id,
      doctorName: doctorName || 'Self',
      medicationName,
      dosage,
      frequency,
      duration,
      notes: notes || '',
    });

    res.status(201).json({ message: 'Prescription added', prescription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── READ ALL ── GET /api/prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({ prescriptions });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── UPDATE ── PUT /api/prescriptions/:id
router.put('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    if (prescription.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Prescription updated', prescription: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── DELETE ── DELETE /api/prescriptions/:id
router.delete('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    if (prescription.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Prescription.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Prescription deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
