const { Op } = require('sequelize');

const { Item, Flavor, PurchaseItem } = require('../models');

const add = async (data) => {

    let { itemId, itemPrice, quantity, purchaseId } = data;

    let price = itemPrice * quantity;

    let purchaseItem = await verifyPurchaseItemExists(itemId, purchaseId);

    if(!purchaseItem) {

        purchaseItem = await PurchaseItem.create( { itemId, quantity, price, purchaseId });

    }else {

        quantity = purchaseItem.quantity + quantity;
        price = itemPrice * quantity;

        purchaseItem = await purchaseItem.update( { quantity, price });
    }

    if (!purchaseItem) {
        return null;
    }

    return purchaseItem;
};


const verifyPurchaseItemExists = async (itemId, purchaseId) => {


    const purchaseItem = await PurchaseItem.findOne( {
        where: {
            itemId, 
            purchaseId
        }
    });

    if (!purchaseItem) {
        return null;
    }

    return purchaseItem;
}




module.exports = {
    add,
};