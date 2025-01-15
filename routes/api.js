const express = require('express');
const patientController = require('../controllers/PatientController');

const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
// Get All Resource
router.get('/patients', patientController.index);

// Add Resource
router.post('/patients', patientController.store);

// Edit Resource
router.put('/patients/:id', patientController.update);

// Delete Resource
router.delete('/patients/:id', patientController.destroy);

// Get Detail Resource
router.get('/patients/:id', patientController.show);

// Search Resource by name
router.get('/patients/search/:name', patientController.search);

// Get Resource by Status
router.get('/patients/status/:status', patientController.findByStatus);

// export router
module.exports = router;