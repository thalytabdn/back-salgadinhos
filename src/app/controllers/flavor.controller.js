const FlavorService = require('../services/flavor.service');


const create = async (req, res) => {
    try {
        const {
            name
        } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'O nome do sabor é obrigatório' });
        }

        const data = {
            name,
        };

        const flavor = await FlavorService.create(data);

        if (!flavor) {
            return res
                .status(400)
                .json({ error: 'Não foi possível criar o novo sabor' });
        }



        return res.status(201).json(flavor);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getAll = async (req, res) => {
    try {
        const flavors = await FlavorService.getAll(req.query);

        if (!flavors) {
            return res.status(404).json({ error: 'Nenhum sabor foi encontrado' });
        }

        return res.status(200).json({ flavors });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getById = async (req, res) => {
    try {
        const { flavorId } = req.params;

        const flavor = await FlavorService.getById(flavorId);

        if (!flavor) {
            return res.status(404).json({ error: 'O sabor não foi encontrado' });
        }

        return res.status(200).json({ flavor });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getByName = async (req, res) => {
    try {
        const { flavorName } = req.query;

        if (!flavorName){
            return res.status(404).json({ error: 'O nome do sabor é obrigatório' });
        }

        const flavor = await FlavorService.getByName(flavorName);

        if (!flavor) {
            return res.status(404).json({ error: 'Nenhum sabor foi encontrado' });
        }

        return res.status(200).json({ flavor });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


module.exports = {
    create,
    getAll,
    getById,
    getByName,
};