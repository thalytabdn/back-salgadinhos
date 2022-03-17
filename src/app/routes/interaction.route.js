const express = require('express');

const router = express.Router();

const InteractionController = require('../controllers/interaction.controller');

const permission = require('../middlewares/permission.middleware');
const { CLIENT } = require('../enums/permission.enum');


router.post('/', permission(CLIENT), InteractionController.create);
router.get('/:interactionId', permission(CLIENT), InteractionController.getById);
router.get('/', permission(CLIENT), InteractionController.getAll);


module.exports = router;