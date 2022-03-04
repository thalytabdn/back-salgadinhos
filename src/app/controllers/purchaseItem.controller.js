const ItemService = require('../services/item.service');
const PurchaseItemService = require('../services/purchaseItem.service');


const add = async (req, res) => {
    try {
        const {
            quantity,
        } = req.body;

        const { itemId } = req.params;


        if (!quantity || quantity < 1) {
            return res.status(400).json({ error: 'A quantidade é obrigatória' });
        }

        const item = await ItemService.getById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O item não foi encontrado' }); 
        }

        const data = {
            itemId,
            itemPrice: item.price,
            quantity,
        };

        const purchaseItem = await PurchaseItemService.add(data);

        if (!purchaseItem) {
            return res
                .status(400)
                .json({ error: 'Não foi possível adicionar a nova compra' });
        }


        return res.status(201).json(purchaseItem);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


module.exports = {
    add,
};