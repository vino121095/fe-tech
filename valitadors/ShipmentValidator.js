const { body, validationResult } = require('express-validator');

const shipmentValidationRules = [
    body('order_id').notEmpty().withMessage('Order ID is required'),
    body('product_id').isArray().withMessage('Product ID must be an array'),
    body('quantity').isArray().withMessage('Quantity must be an array'),
    body('price').isArray().withMessage('Price must be an array'),
    body('dispatch_date').isArray().withMessage('Dispatch Date must be an array'),
    body('dispatch_address').isArray().withMessage('Dispatch Address must be an array'),
    body('transport').isArray().withMessage('Transport must be an array'),
];

const validateShipment = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    shipmentValidationRules,
    validateShipment
};
