const { Feedback } = require('../models');

const create = async (data) => {

    const feedback = await Feedback.create(data);

    return feedback;
};

const getById = async (feedbackId) => {

    const feedback = await Feedback.findByPk(feedbackId);

    if(!feedback){
        return null;
    }

    return feedback;

}

const getAll = async (query) => {
    const {
        userId
    } = query;

    let where = {};

    if (userId) {
        where = {
            ...where,
            userId
        };
    }

    const page = parseInt(query.page, 10);
    const pageSize = parseInt(query.pageSize, 10);
    let offset = null;
    let feedbacks = null;

    if (page && pageSize) offset = (page - 1) * pageSize;

    if (offset !== null) {
        const options = {
            limit: pageSize,
            offset,
            distinct: true,
            where,
            order: [['id', 'ASC']],
        };
        feedbacks = await Feedback.findAndCountAll(options);

        feedbacks.pages = Math.ceil(feedbacks.count / pageSize);
    } else {
        feedbacks = await Feedback.findAll({
            where,
            order: [['id', 'ASC']],
        });
    }

    if (!feedbacks) {
        return null;
    }

    return feedbacks;
};


module.exports = {
    create,
    getById,
    getAll,
}