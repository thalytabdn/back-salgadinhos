const express = require('express');

const router = express.Router();

const AuthMiddleware = require('./app/middlewares/auth.middleware');

const AuthRoute = require('./app/routes/auth.route');
const UserRoute = require('./app/routes/user.route');
const RegisterRoute = require('./app/routes/register.route');
const FlavorRoute = require('./app/routes/flavor.route');
const ItemRoute = require('./app/routes/item.route');
const PurchaseRoute = require('./app/routes/purchase.route');
const PurchaseItemRoute = require('./app/routes/purchaseItem.route');

// public routes

router.get('/', (req, res) => {
    res.send(`API rodando em ${process.env.BASE_URL || 3000}`);
});

router.use('/auth', AuthRoute);
router.use('/user', RegisterRoute);

// private routes

router.use(AuthMiddleware.login);
router.use('/user', UserRoute);
router.use('/flavor', FlavorRoute);
router.use('/item', ItemRoute);
router.use('/purchase', PurchaseRoute);
router.use('/purchase', PurchaseItemRoute);


module.exports = router;
