const express = require('express');

const router = express.Router();

const PurchaseController = require('../controllers/purchase.controller');

const permission = require('../middlewares/permission.middleware');
const { CLIENT } = require('../enums/permission.enum');


router.get('/', permission(CLIENT), PurchaseController.getAll);
router.get('/:purchaseId', permission(CLIENT), PurchaseController.getById);
router.put('/:purchaseId', permission(CLIENT), PurchaseController.update);
router.delete('/:purchaseId', permission(CLIENT), PurchaseController.removePurchase);


module.exports = router;