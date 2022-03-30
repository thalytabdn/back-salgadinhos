const { Op } = require('sequelize');

const { Purchase, PurchaseItem } = require('../models');

const add = async (data) => {

    let { flavorId, itemId, itemPrice, quantity, purchaseId } = data;

    let price = itemPrice * quantity;

    let purchaseItem = await verifyPurchaseItemExists(flavorId, purchaseId);

    if(!purchaseItem) {

        purchaseItem = await PurchaseItem.create( { flavorId, itemId, quantity, price, purchaseId });

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

const remove = async (data) => {

    let { flavorId, purchaseId, quantity } = data;

    let purchaseItem = await verifyPurchaseItemExists(flavorId, purchaseId);

    if (!purchaseItem) {
        return null;
    }

    const total = purchaseItem.quantity - quantity;

    if(total <= 0) {
        purchaseItem = await purchaseItem.destroy();

    } else {
        purchaseItem = await purchaseItem.update({
            quantity: total
        })
    }

    return purchaseItem;
};

const verifyPurchaseItemExists = async (flavorId, purchaseId) => {


    const purchaseItem = await PurchaseItem.findOne( {
        where: {
            flavorId, 
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
    remove,
};