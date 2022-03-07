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

        const arrayPurchase = await Promise.all(purchase.purchaseItems.map( async (r) => {

            const flavor = await FlavorService.getByFlavorAndItem(r.flavorId, r.itemId);

            return {...r.dataValues, flavor};

        }));

        delete purchase.dataValues.purchaseItems;
        purchase.dataValues.arrayPurchaseItems = arrayPurchase;

        return res.status(201).json(purchase);
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

module.exports = {
    getAll,
    update,
    getById,
};