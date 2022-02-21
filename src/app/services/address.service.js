const { Address } = require('../models');

const create = async (data) => {

    const address = await Address.create(data);

    return address;
};

module.exports = {
    create,
}