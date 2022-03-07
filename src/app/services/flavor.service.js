const { Op } = require('sequelize');

const { Flavor } = require('../models');

const create = async (data) => {

    const flavorExist = await getByName(data.name, data.itemId);

    if (flavorExist) {
        return null;
    }

    const flavor = await Flavor.create(data);

    if (!flavor) {
        return null;
    }

    return flavor;
};

const getAll = async (query, itemId) => {

    let where = {
        itemId
    }

    const page = parseInt(query.page, 10);
    const pageSize = parseInt(query.pageSize, 10);
    let offset = null;
    let flavors = null;

    if (page && pageSize) offset = (page - 1) * pageSize;

    if (offset !== null) {
        const options = {
            limit: pageSize,
            offset,
            distinct: true,
            where,
            attributes: [
                'id',
                'name',,
            ],
            order: [['id', 'ASC']],
        };
        flavors = await Flavor.findAndCountAll(options);

        flavors.pages = Math.ceil(flavors.count / pageSize);
    } else {
        flavors = await Flavor.findAll({
            where,
            attributes: [
                'id',
                'name',
            ],
            order: [['id', 'ASC']],
        });
    }

    if (!flavors) {
        return null;
    }

    return flavors;
};

const getById = async (id) => {
    const flavor = await Flavor.findByPk(id, {
        attributes: [
            'id',
            'name',
        ],
    });

    if (!flavor) {
        return null;
    }

    return flavor;
};

const getByFlavorAndItem = async (flavorId, itemId) => {
    const flavor = await Flavor.findOne(
        
        {
            where: {
                id: flavorId,
                itemId
            },
            attributes: [
                'id',
                'name',
            ],
        }
    );

    if (!flavor) {
        return null;
    }

    return flavor;
};

const getByName = async (name, itemId) => {

    const flavor = await Flavor.findOne({
        attributes: ['id', 'name'],
        where: {
            name: {
                [Op.iLike]: `${name}`,
              },
            itemId
        },
    });

    if (!flavor) {
        return null;
    }

    return flavor;
};

const remove = async (data) => {
    const flavor = await getByName(data.name, data.itemId);

    if (!flavor) {
        return null;
    }

    await flavor.destroy();

    return flavor;
};



module.exports = {
    create,
    getAll,
    getById,
    getByFlavorAndItem,
    getByName,
    remove,
};