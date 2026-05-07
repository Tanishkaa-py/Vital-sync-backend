const express = require('express');
const Appointment = require('../models/Appointment');
const protect = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// ── CREATE ── POST /api/appointments
router.post('/', async (req, res) => {
  try {
    const { doctorName, specialty, date, timeSlot, notes } = req.body;

    if (!doctorName || !specialty || !date || !timeSlot) {
      return res.status(400).json({ message: 'Please provide doctorName, specialty, date, and timeSlot' });
    }

    const appointment = await Appointment.create({
      patientId: req.user._id,      // ownership set from JWT
      doctorId: req.user._id,       // in MVP same user; extend when Doctor model added
      doctorName,
      specialty,
      date,
      timeSlot,
      notes: notes || '',
    });

    res.status(201).json({ message: 'Appointment booked', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── READ ALL ── GET /api/appointments
// Returns only appointments belonging to the logged-in user
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── READ ONE ── GET /api/appointments/:id
router.get('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ownership check — only owner can read their appointment
    if (appointment.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this appointment' });
    }

    res.status(200).json({ appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── UPDATE ── PUT /api/appointments/:id
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ownership check
    if (appointment.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this appointment' });
    }

    const { doctorName, specialty, date, timeSlot, notes, status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { doctorName, specialty, date, timeSlot, notes, status },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: 'Appointment updated', appointment: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ── DELETE ── DELETE /api/appointments/:id
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Ownership check — only owner can delete
    if (appointment.patientId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this appointment' });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
