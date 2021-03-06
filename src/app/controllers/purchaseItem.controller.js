const ItemService = require('../services/item.service');
const FlavorService = require('../services/flavor.service');
const PurchaseItemService = require('../services/purchaseItem.service');
const PurchaseService = require('../services/purchase.service');

const add = async (req, res) => {
    try {
        const {
            quantity,
        } = req.body;

        const { itemId, flavorId } = req.params;

        const { id: userId } = req.user;


        if (!quantity || quantity < 1) {
            return res.status(400).json({ error: 'A quantidade é obrigatória' });
        }

        const item = await ItemService.getById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O item não foi encontrado' }); 
        }

        const flavor = await FlavorService.getByFlavorAndItem(flavorId, itemId);

        if (!flavor) {
            return res.status(404).json({ error: 'O sabor não foi encontrado' }); 
        }

        let purchase = await PurchaseService.getInProgressPurchaseByUserId(userId);

        if (!purchase){
            purchase = await PurchaseService.create(userId);
        }

        if (!purchase) {
            return res.status(404).json({ error: 'Não foi possível criar um carrinho' }); 
        }

        const data = {
            itemId,
            flavorId,
            itemPrice: item.price,
            quantity,
            purchaseId: purchase.id
        };

        const purchaseItem = await PurchaseItemService.add(data);

        if (!purchaseItem) {
            return res
                .status(400)
                .json({ error: 'Não foi possível adicionar a nova compra' });
        }

        let result = await PurchaseService.getPurchaseById(purchase.id);

        
        const arrayPurchase = await Promise.all(result.purchaseItems.map( async (r) => {

            const flavor = await FlavorService.getByFlavorAndItem(r.flavorId, r.itemId);

            return {...r.dataValues, flavor};

        }));

        delete result.dataValues.purchaseItems;
        result.dataValues.arrayPurchaseItems = arrayPurchase;

        return res.status(201).json({ purchase: result});

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const remove = async (req, res) => {
    try {

        const { itemId, flavorId, purchaseId } = req.params;

        const { id: userId } = req.user;

        const { quantity } = req.query;

        if (!quantity) {
            return res.status(400).json({ error: 'A quantidade a ser removida é obrigatória' }); 
        }

        if (quantity < 0) {
            return res.status(400).json({ error: 'A quantidade a ser removida deve ser maior que zero' }); 
        }

        const item = await ItemService.getById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O item não foi encontrado' }); 
        }

        const flavor = await FlavorService.getByFlavorAndItem(flavorId, itemId);

        if (!flavor) {
            return res.status(404).json({ error: 'O sabor não foi encontrado' }); 
        }

        let purchase = await PurchaseService.getInProgressPurchaseByUserId(userId);

        if (!purchase) {
            return res.status(404).json({ error: 'Não foi possível criar um carrinho' }); 
        }

        const data = {
            purchaseId,
            flavorId,
            quantity
        };

        const purchaseItem = await PurchaseItemService.remove(data);

        if (!purchaseItem) {
            return res
                .status(400)
                .json({ error: 'Não foi possível remover a nova compra' });
        }

        let result = await PurchaseService.getPurchaseById(purchase.id);

        
        const arrayPurchase = await Promise.all(result.purchaseItems.map( async (r) => {

            const flavor = await FlavorService.getByFlavorAndItem(r.flavorId, r.itemId);

            return {...r.dataValues, flavor};

        }));

        delete result.dataValues.purchaseItems;
        result.dataValues.arrayPurchaseItems = arrayPurchase;

        return res.status(201).json({ purchase: result});

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


module.exports = {
    add,
    remove,
};