const { Interaction } = require('../models');

const create = async (data) => {

    const interaction = await Interaction.create(data);

    return interaction;
};

const getById = async (interationId) => {

    const interaction = await Interaction.findByPk(interationId);

    if(!interaction){
        return null;
    }

    return interaction;

}

const getAll = async (query) => {
    const {
        userId, email, phone,
    } = query;

    let where = {};

    if (userId) {
        where = {
            ...where,
            userId
        };
    }

    if (email) {
        where = {
            ...where,
            email: {
                [Op.iLike]: `%${email}%`,
            },
        };
    }


    if (phone) {
        where = {
            ...where,
            phone: {
                [Op.iLike]: `%${phone}%`,
            },
        };
    }

    const page = parseInt(query.page, 10);
    const pageSize = parseInt(query.pageSize, 10);
    let offset = null;
    let interactions = null;

    if (page && pageSize) offset = (page - 1) * pageSize;

    if (offset !== null) {
        const options = {
            limit: pageSize,
            offset,
            distinct: true,
            where,
            order: [['id', 'ASC']],
        };
        interactions = await Interaction.findAndCountAll(options);

        interactions.pages = Math.ceil(interactions.count / pageSize);
    } else {
        interactions = await Interaction.findAll({
            where,
            order: [['id', 'ASC']],
        });
    }

    if (!interactions) {
        return null;
    }

    return interactions;
};


module.exports = {
    create,
    getById,
    getAll,
}