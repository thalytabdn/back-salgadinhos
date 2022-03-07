const express = require('express');

const router = express.Router();

const FlavorController = require('../controllers/flavor.controller');

const permission = require('../middlewares/permission.middleware');
const { ADMIN, CLIENT } = require('../enums/permission.enum');

router.get('/', permission(CLIENT), FlavorController.getAll);
router.get('/name', permission(CLIENT), FlavorController.getByName);
router.get('/:flavorId', permission(CLIENT), FlavorController.getById);


module.exports = router;