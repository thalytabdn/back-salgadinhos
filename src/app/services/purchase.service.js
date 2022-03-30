const { Purchase, PurchaseItem, Item } = require('../models');

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
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Item,
                        as: "item",
                        attributes: ["id", "name", "price", "imageLink", "itemClass"],
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

const getPurchaseByUserId = async (userId, status) => {

    const purchase = await Purchase.findAll({
        where: {
            userId,
            status
        },
        include: [
            {
                model: PurchaseItem,
                as: "purchaseItems",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: Item,
                        as: "item",
                        attributes: ["id", "name", "price", "imageLink", "itemClass"],
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
        userId, status, paymentMethod, deliveryMethod, itemClass
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

    if (paymentMethod) {
        where = {
            ...where,
            paymentMethod
        };
    }

    if (deliveryMethod) {
        where = {
            ...where,
            deliveryMethod
        };
    }

    let classWhere = {}

    if(itemClass) {
        classWhere = {
            ...classWhere,
            itemClass
        }
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
            include: [
                {
                    model: PurchaseItem,
                    as: "purchaseItems",
                    include: [
                        {
                            model: Item,
                            as: "item"
                        }
                    ]
                }
            ]
        };
        purchases = await Purchase.findAndCountAll(options);

        purchases.pages = Math.ceil(purchases.count / pageSize);
    } else {
        purchases = await Purchase.findAll({
            where,
            order: [['id', 'ASC']],
            include: [
                {
                    model: PurchaseItem,
                    as: "purchaseItems",
                    required: true,
                    include: [
                        {
                            model: Item,
                            as: "item",
                            where: classWhere,
                            
                        }
                    ]
                }
            ]
        });
    }

    if (!purchases) {
        return null;
    }

    return purchases;
};

const update = async (id, data) => {
    const purchase = await Purchase.findByPk(id);

    if (!purchase) {
        return null;
    }

    await purchase.update(data);

    return purchase;
};

const removePurchase = async (purchaseId) => {

    const purchase = await Purchase.findByPk(purchaseId);

    if (!purchase) {
        return null;
    }

    await purchase.destroy();

    return purchase;
}


module.exports = {
    create,
    getPurchaseById,
    getInProgressPurchaseByUserId,
    getAll,
    update,
    removePurchase,
    getPurchaseByUserId
};