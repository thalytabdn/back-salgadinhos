const UserService = require('../services/user.service');
const AddressService = require('../services/address.service');

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
            name, email, password, cellPhone, street, number, city, neighborhood
        } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'O nome é obrigatório' });
        }

        if (!email) {
            return res.status(400).json({ error: 'O email é obrigatório' });
        }

        if (!cellPhone) {
            return res.status(400).json({ error: 'O Telefone é obrigatório' });
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

        if (!street) {
            return res.status(400).json({ error: 'O nome da rua é obrigatório' });
        }

        if (!number) {
            return res.status(400).json({ error: 'O numero é obrigatório' });
        }

        if (!city) {
            return res.status(400).json({ error: 'A cidade é obrigatória' });
        }

        if (!neighborhood) {
            return res.status(400).json({ error: 'O bairro é obrigatório' });
        }

        const verifyUserByEmail = await UserService.getByEmail(email);

        if (verifyUserByEmail) {
            return res
                .status(400)
                .json({ error: 'Já existe um usuário com esse email' });
        }

        const data = {
            name,
            email,
            cellPhone,
            password,
        };

        const user = await UserService.create(data);

        if (!user) {
            return res
                .status(400)
                .json({ error: 'Não foi possível criar o novo usuário' });
        }

        const addressData = {
            street, 
            number, 
            city, 
            neighborhood,
            userId: user.id
        }

        await AddressService.create(addressData);

        const resultUser = await UserService.getByIdWithAddress(user.id);

        return res.status(201).json(resultUser);

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

const getByIdWithAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await UserService.getByIdWithAddress(userId);

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
        
        const { id: userId } = req.user;

        const { name, cellPhone, street, number, city, neighborhood } = req.body;

        const user = await UserService.update(userId, { name, cellPhone });

        if (!user) {
            return res.status(404).json({ error: 'O usuário não foi encontrado' });
        }

        await AddressService.update(userId, { street, number, city, neighborhood });

        const result = await UserService.getById(userId);

        return res.status(200).json({ user: result });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


module.exports = {
    create,
    getAll,
    getById,
    getByIdWithAddress,
    remove,
    update,
};