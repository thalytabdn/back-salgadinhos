const { Op } = require('sequelize');

const { Purchase, PurchaseItem, Item, Flavor } = require('../models');

const create = async (userId) => {

    const purchase = await Purchase.create( { 
        userId,
        status: "PROGRESS"
    });

    if (!purchase) {
        return null;
    }

    return purchase;
};

const getPurchaseById = async (purchaseId) => {

    const purchase = await Purchase.findByPk(purchaseId, {
        include: [
            {
                model: PurchaseItem,
                as: "purchaseItems",
                include: [
                    {
                        model: Item,
                        as: "item",
                        include: [
                            {
                                model: Flavor,
                                as: "flavor"
        
                            }
                        ]

                    }
                ]
            }
        ]
    })

    if (!purchase) {
        return null;
    }

    return purchase;
}

const getInProgressPurchaseByUserId = async (userId) => {

    const purchase = await Purchase.findOne({
        where: {
            userId,
            status: "PROGRESS"
        }
    })

    if (!purchase) {
        return null;
    }

    return purchase;
}

const getAll = async (query) => {
    const {
        userId, status
    } = query;

    let where = {};

    if (status) {
        where = {
            ...where,
            status
        };
    }

    if (userId) {
        where = {
            ...where,
            userId
        };
    }

    const page = parseInt(query.page, 10);
    const pageSize = parseInt(query.pageSize, 10);
    let offset = null;
    let purchases = null;

    if (page && pageSize) offset = (page - 1) * pageSize;

    if (offset !== null) {
        const options = {
            limit: pageSize,
            offset,
            distinct: true,
            where,
            order: [['id', 'ASC']],
        };
        purchases = await Purchase.findAndCountAll(options);

        purchases.pages = Math.ceil(purchases.count / pageSize);
    } else {
        purchases = await Purchase.findAll({
            where,
            order: [['id', 'ASC']],
        });
    }

    if (!purchases) {
        return null;
    }

    return purchases;
};



module.exports = {
    create,
    getPurchaseById,
    getInProgressPurchaseByUserId,
    getAll
};