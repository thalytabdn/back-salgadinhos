const express = require('express');

const router = express.Router();

const PurchaseItemController = require('../controllers/purchaseItem.controller');

const permission = require('../middlewares/permission.middleware');
const { ADMIN, CLIENT } = require('../enums/permission.enum');


router.post('/item/:itemId/flavor/:flavorId', permission(ADMIN, CLIENT), PurchaseItemController.add);


module.exports = router;