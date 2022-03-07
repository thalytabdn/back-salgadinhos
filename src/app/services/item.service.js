const { Op } = require('sequelize');

const { Item, Flavor } = require('../models');

const create = async (data) => {
    const item = await Item.create(data);

    if (!item) {
        return null;
    }

    return item;
};

const getAll = async (query) => {

    const {
        name,
        itemClass,
    } = query;

    let where = {};

    if (name) {
        where = {
            ...where,
            name: {
                [Op.iLike]: `%${name}%`,
              },
        };
    }

    if (itemClass) {
        where = {
            ...where,
            itemClass: {
                [Op.iLike]: `%${itemClass}%`,
              },
        };
    }


    const page = parseInt(query.page, 10);
    const pageSize = parseInt(query.pageSize, 10);
    let offset = null;
    let items = null;

    if (page && pageSize) offset = (page - 1) * pageSize;

    if (offset !== null) {
        const options = {
            limit: pageSize,
            offset,
            distinct: true,
            where,
            attributes: [
                'id',
                'name',
                'imageLink',
                'price',
                'quantity',
                'itemClass',
            ],
            order: [['id', 'ASC']],
            include: [
                {
                    model: Flavor,
                    as: "flavors"
                }
            ]
        };
        items = await Item.findAndCountAll(options);

        items.pages = Math.ceil(items.count / pageSize);
    } else {
        items = await Item.findAll({
            attributes: [
                'id',
                'name',
                'imageLink',
                'price',
                'quantity',
                'itemClass',
            ],
            order: [['id', 'ASC']],
            where,
            include: [
                {
                    model: Flavor,
                    as: "flavors",
                    attributes: ["id", "name"]
                }
            ]
        });
    }

    if (!items) {
        return null;
    }

    return items;
};

const getById = async (id) => {
    const item = await Item.findByPk(id, {
        attributes: [
            'id',
            'name',
            'imageLink',
            'price',
            'quantity',
            "itemClass",
        ],
        include: [
            {
                model: Flavor,
                as: "flavors",
                attributes: ["id", "name"]
            }
        ]
    });

    if (!item) {
        return null;
    }

    return item;
};

const getByName = async (name) => {
    const item = await Item.findOne({
        attributes: [
            'id', 
            'name',                 
            'imageLink',
            'price',
            'quantity',
            "itemClass",
        ],
        where: {
            name: {
                [Op.iLike]: `${name}`,
              },
        },
    });

    if (!item) {
        return null;
    }

    return item;
};

const remove = async (id) => {
    const item = await Item.findByPk(id, {
        attributes: [
            'id', 
            'name',                 
            'imageLink',
            'price',
            'quantity',
            "itemClass",
        ],
    });

    if (!item) {
        return null;
    }

    await item.destroy();

    return item;
};

const update = async (id, data) => {
    const item = await Item.findByPk(id, {
        attributes: [
            'id', 
            'name',                 
            'imageLink',
            'price',
            'quantity',
            "itemClass",
        ],
    });

    if (!item) {
        return null;
    }

    await item.update(data);

    return item;
};


module.exports = {
    create,
    getAll,
    getById,
    getByName,
    remove,
    update,
};