const express = require('express');

const router = express.Router();

const ItemController = require('../controllers/item.controller');

const permission = require('../middlewares/permission.middleware');
const { ADMIN, CLIENT } = require('../enums/permission.enum');

router.get('/', permission(CLIENT), ItemController.getAll);
router.get('/name', permission(CLIENT), ItemController.getByName);
router.get('/:itemId', permission(CLIENT), ItemController.getById);
router.delete('/:itemId', permission(ADMIN), ItemController.remove);
router.put('/:itemId', permission(ADMIN), ItemController.update);
router.post('/', permission(ADMIN), ItemController.create);

router.post('/:itemId/addFlavor', permission(ADMIN), ItemController.addflavor);
router.delete('/:itemId/removeFlavor', permission(ADMIN), ItemController.removeflavor);

router.get('/:itemId/flavors', permission(CLIENT), ItemController.getAllFlavorsByItemId);


module.exports = router;