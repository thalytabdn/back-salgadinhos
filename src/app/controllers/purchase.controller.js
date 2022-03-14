const PurchaseService = require('../services/purchase.service');
const FlavorService = require('../services/flavor.service');


const getAll = async (req, res) => {
    try {
        const purchase = await PurchaseService.getAll(req.query);

        if (!purchase) {
            return res.status(404).json({ error: 'Nenhum carrinho encontrado' });
        }

        return res.status(200).json({ purchase });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const update = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        
        const { 
            status,
            paymentMethod,
            deliveryMethod,
            deliveryPrice,
            quandeliveryPricetity,
            transshipment,
            details,
            date,
            hour,
            address,
            phoneNumber,
        } = req.body;

        const purchase = await PurchaseService.update(purchaseId, { 
            status,
            paymentMethod,
            deliveryMethod,
            deliveryPrice,
            quandeliveryPricetity,
            transshipment,
            details,
            date,
            hour,
            address,
            phoneNumber,
         });

        if (!purchase) {
            return res.status(404).json({ error: 'O carrinho não foi encontrado' });
        }

        const result = await PurchaseService.getPurchaseById(purchaseId);

        
        let itensTotalPrice = 0;

        const arrayPurchase = await Promise.all(result.purchaseItems.map( async (r) => {

            const flavor = await FlavorService.getByFlavorAndItem(r.flavorId, r.itemId);

            itensTotalPrice += r.price;
            return {...r.dataValues, flavor};

        }));

        delete result.dataValues.purchaseItems;
        result.dataValues.arrayPurchaseItems = arrayPurchase;
        result.dataValues.price = itensTotalPrice;
        result.dataValues.totalPrice = itensTotalPrice + result.dataValues.deliveryPrice;

        return res.status(201).json({ purchase: result});
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getById = async (req, res) => {
    try {
        const { purchaseId } = req.params;
        
        let purchase = await PurchaseService.getPurchaseById(purchaseId);

        if (!purchase) {
            return res.status(404).json({ error: 'O carrinho não foi encontrado' });
        }

        let itensTotalPrice = 0;

        const arrayPurchase = await Promise.all(purchase.purchaseItems.map( async (r) => {

            const flavor = await FlavorService.getByFlavorAndItem(r.flavorId, r.itemId);

            itensTotalPrice += r.price;
            return {...r.dataValues, flavor};

        }));

        delete purchase.dataValues.purchaseItems;
        purchase.dataValues.arrayPurchaseItems = arrayPurchase;
        purchase.dataValues.price = itensTotalPrice;
        purchase.dataValues.totalPrice = itensTotalPrice + purchase.dataValues.deliveryPrice;

        return res.status(201).json(purchase);
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const removePurchase = async (req, res) => {
    try {

        const { purchaseId } = req.params;

        const { id: userId } = req.user;

        let purchase = await PurchaseService.getInProgressPurchaseByUserId(userId);

        if (!purchase) {
            return res.status(404).json({ error: 'Não foi possível encontrar um carrinho' }); 
        }

        purchase = await PurchaseService.removePurchase(purchaseId);

        if (!purchase) {
            return res
                .status(400)
                .json({ error: 'Não foi possível remover o carrinho' });
        }

        return res.status(201).json(purchase);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

module.exports = {
    getAll,
    update,
    getById,
    removePurchase,
};