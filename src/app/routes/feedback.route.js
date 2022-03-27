const express = require('express');

const router = express.Router();

const FeedbackController = require('../controllers/feedback.controller');

const permission = require('../middlewares/permission.middleware');
const { CLIENT } = require('../enums/permission.enum');


router.post('/', permission(CLIENT), FeedbackController.create);
router.get('/:feedbackId', permission(CLIENT), FeedbackController.getById);
router.get('/', permission(CLIENT), FeedbackController.getAll);


module.exports = router;