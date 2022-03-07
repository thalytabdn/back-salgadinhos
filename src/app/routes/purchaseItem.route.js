const express = require('express');

const router = express.Router();

const PurchaseItemController = require('../controllers/purchaseItem.controller');

const permission = require('../middlewares/permission.middleware');
const { CLIENT } = require('../enums/permission.enum');


router.post('/item/:itemId/flavor/:flavorId', permission(CLIENT), PurchaseItemController.add);
router.delete('/item/:itemId/flavor/:flavorId/purchase/:purchaseId', permission(CLIENT), PurchaseItemController.remove);


module.exports = router;