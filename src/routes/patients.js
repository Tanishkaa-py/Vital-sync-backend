const express = require('express');
const protect = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    res.status(200).json({
      message: 'Protected route working',
      user: req.user.name,
      patients: [
        { id: '1', name: 'Riya Arora', age: 28 },
        { id: '2', name: 'Arjun Shah', age: 34 },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;