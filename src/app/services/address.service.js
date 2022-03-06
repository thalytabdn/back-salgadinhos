const { Address } = require('../models');

const create = async (data) => {

    const address = await Address.create(data);

    return address;
};

const update = async (userId, data) => {
    const address = await Address.findOne({
        where: {
            userId
        }
    });

    if (!address) {
        return null;
    }

    await address.update(data);

    return address;
};


module.exports = {
    create,
    update
}