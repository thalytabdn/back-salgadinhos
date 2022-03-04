const { Op } = require('sequelize');

const { Item, Flavor, PurchaseItem } = require('../models');

const add = async (data) => {

    const { itemId, itemPrice, quantity } = data;

    const price = itemPrice * quantity;

    const purchaseItem = await PurchaseItem.create( { itemId, quantity, price });

    if (!purchaseItem) {
        return null;
    }

    return purchaseItem;
};




module.exports = {
    add,
};