const express = require('express');

const router = express.Router();

const PurchaseController = require('../controllers/purchase.controller');

const permission = require('../middlewares/permission.middleware');
const { ADMIN, CLIENT } = require('../enums/permission.enum');


router.get('/', permission(ADMIN, CLIENT), PurchaseController.getAll);


module.exports = router;