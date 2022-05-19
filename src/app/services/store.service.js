const { Store } = require('../models');

const create = async (data) => {

    const store = await Store.create(data);

    return store;
};

const update = async (storeId, data) => {
    const store = await Store.findByPk(storeId);

    if (!store) {
        return null;
    }

    await store.update(data);

    return store;
};

const getById = async (storeId) => {

    const store = await Store.findByPk(storeId);

    if(!store){
        return null;
    }

    return store;

}

const getAll = async (query) => {

    const page = parseInt(query.page, 10);
    const pageSize = parseInt(query.pageSize, 10);
    let offset = null;
    let stores = null;

    if (page && pageSize) offset = (page - 1) * pageSize;

    if (offset !== null) {
        const options = {
            limit: pageSize,
            offset,
            distinct: true,
            order: [['id', 'ASC']],
        };
        stores = await Store.findAndCountAll(options);

        stores.pages = Math.ceil(stores.count / pageSize);
    } else {
        stores = await Store.findAll({
            order: [['id', 'ASC']],
        });
    }

    if (!stores) {
        return null;
    }

    return stores;
};

const remove = async (storeId) => {
    const store = await Store.findByPk(storeId);

    if (!store) {
        return null;
    }

    await store.destroy();

    return store;
};


module.exports = {
    create,
    update,
    getById,
    getAll,
    remove,
}