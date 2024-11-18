const express = require('express');
const router = express.Router();
const shipmentController = require('../controller/Shipmemtcontroller');
const { shipmentValidationRules, validateShipment } = require('../valitadors/ShipmentValidator');
const {generateShipmentId} = require('../middlewares/generateUinqueId');
// Create a new shipment with validation
router.post('/shipments', generateShipmentId, shipmentValidationRules, validateShipment, shipmentController.createShipments);

// Get all shipments
// router.get('/getshipments', shipmentController.getShipments);

// Get a shipment by ID
// router.get('/shipments/:id', shipmentController.getShipmentById);

// Update a shipment by ID with validation
// router.put('/shipments/:id', shipmentValidationRules, validateShipment, shipmentController.updateShipment);

// Delete a shipment by ID
// router.delete('/shipments/:id', shipmentController.deleteShipment);

module.exports = router;