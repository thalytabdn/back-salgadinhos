const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user.controller');

const permission = require('../middlewares/permission.middleware');
const { ADMIN, CLIENT } = require('../enums/permission.enum');

router.get('/', permission(ADMIN), UserController.getAll);
router.get('/:userId', permission(CLIENT), UserController.getById);
router.get('/:userId/address', permission(ADMIN), UserController.getByIdWithAddress);

router.delete('/:userId', permission(ADMIN), UserController.remove);
router.put('/', permission(CLIENT), UserController.update);
router.put('/alterPassword', permission(CLIENT), UserController.alterPassword);

module.exports = router;