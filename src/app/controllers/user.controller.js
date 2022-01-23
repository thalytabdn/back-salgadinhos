const crypto = require('crypto');
const UserService = require('../services/user.service');

function validateEmail(email) {
    const validate = /\S+@\S+\.\S+/;

    return validate.test(email);
}

function validatePassword(password) {
    if (password.length < 8) {
        return false;
    }
    if (/^[a-zA-Z0-9]+$/.test(password)) {
        return true;
    }
    return false;
}

const create = async (req, res) => {
    try {
        const {
            name, email, password,
        } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'O nome é obrigatório' });
        }

        if (!email) {
            return res.status(400).json({ error: 'O email é obrigatório' });
        }

        if (!validateEmail(email)) {
            return res
                .status(400)
                .json({ error: 'O formato do email passado está invalido' });
        }

        if (!password) {
            return res.status(400).json({ error: 'A senha é obrigatória' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                error:
                    'A senha deve conter pelo menos 8 caracteres, uma letra maiuscula e um numero',
            });
        }

        const verifyUserByEmail = await UserService.getByEmail(email);

        if (verifyUserByEmail) {
            return res
                .status(400)
                .json({ error: 'Já existe um usuário com esse email' });
        }

        let data = {
            name,
            email,
            password,
        };

        const user = await UserService.create(data);

        if (!user) {
            return res
                .status(400)
                .json({ error: 'Não foi possível criar o novo usuário' });
        }

        return res.status(201).json({ user });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getAll = async (req, res) => {
    try {
        const users = await UserService.getAll(req.query);

        if (!users) {
            return res.status(404).json({ error: 'Nenhum usuário foi encontrado' });
        }

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserService.getById(userId);

        if (!user) {
            return res.status(404).json({ error: 'O usuário não foi encontrado' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const remove = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserService.remove(userId);

        if (!user) {
            return res.status(404).json({ error: 'O usuário não foi encontrado' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const update = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;

        const user = await UserService.update(userId, name);

        if (!user) {
            return res.status(404).json({ error: 'O usuário não foi encontrado' });
        }

        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};



module.exports = {
    create,
    getAll,
    getById,
    remove,
    update,
};