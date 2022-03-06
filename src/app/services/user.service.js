const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { User, Address } = require('../models');
const util = require('./util.service');

const create = async (data) => {
    const user = await User.create(data);

    if (!user) {
        return null;
    }

    delete user.dataValues.passwordHash;
    delete user.dataValues.password;

    return user;
};

const getAll = async (query) => {
    const {
        name, email, role,
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

    if (email) {
        where = {
            ...where,
            email: {
                [Op.iLike]: `%${email}%`,
            },
        };
    }

    if (role) {
        where = {
            ...where,
            role,
        };
    }

    const page = parseInt(query.page, 10);
    const pageSize = parseInt(query.pageSize, 10);
    let offset = null;
    let users = null;

    if (page && pageSize) offset = (page - 1) * pageSize;

    if (offset !== null) {
        const options = {
            limit: pageSize,
            offset,
            distinct: true,
            attributes: [
                'id',
                'name',
                'email',
                'cellPhone',
                'role',
            ],
            where,
            order: [['id', 'ASC']],
        };
        users = await User.findAndCountAll(options);

        users.pages = Math.ceil(users.count / pageSize);
    } else {
        users = await User.findAll({
            attributes: [
                'id',
                'name',
                'email',
                'cellPhone',
                'role',
            ],
            where,
            order: [['id', 'ASC']],
        });
    }

    if (!users) {
        return null;
    }

    return users;
};

const getById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: [
            'id',
            'name',
            'email',
            'cellPhone',
            'role',
        ],
        include: [
            {
              model: Address,
              as: 'address',
              attributes: ['id', "street", "number", "city", 'neighborhood'],
            },
          ],
    });

    if (!user) {
        return null;
    }

    return user;
};

const getByIdWithAddress = async (id) => {
    const user = await User.findByPk(id, {
        attributes: [
            'id',
            'name',
            'email',
            'cellPhone',
            'role',
        ],
        include: [
            {
              model: Address,
              as: 'address',
              attributes: ['id', "street", "number", "city", 'neighborhood'],
            },
          ],
    });

    if (!user) {
        return null;
    }

    return {
        user,
        token: util.generateToken({ id: user.id, email: user.email }),
    };
};

const getByEmail = async (email) => {
    const user = await User.findOne({
        attributes: ['id'],
        where: {
            email,
        },
    });

    if (!user) {
        return null;
    }

    return user;
};

const remove = async (id) => {
    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'cellPhone', 'role'],
    });

    if (!user) {
        return null;
    }

    await user.destroy();

    return user;
};

const update = async (id, data) => {
    const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email', 'cellPhone', 'role'],
    });

    if (!user) {
        return null;
    }

    await user.update(data);

    return user;
};

const checkPassword = async (password, id) => {
    const user = await User.findByPk(id);

    const verifyPassword = await bcrypt.compare(password, user.passwordHash);

    if (!verifyPassword) {
        return null;
    }

    return true;
};

module.exports = {
    create,
    getAll,
    getById,
    getByIdWithAddress,
    getByEmail,
    remove,
    update,
    checkPassword,
};