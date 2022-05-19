const express = require('express');

const router = express.Router();

const StoreController = require('../controllers/store.controller');

const permission = require('../middlewares/permission.middleware');
const { ADMIN, CLIENT } = require('../enums/permission.enum');

router.get('/', permission(CLIENT), StoreController.getAll);
router.get('/:storeId', permission(CLIENT), StoreController.getById);
router.delete('/:storeId', permission(ADMIN), StoreController.remove);
router.put('/:storeId', permission(ADMIN), StoreController.update);
router.post('/', permission(ADMIN), StoreController.create);


module.exports = router;