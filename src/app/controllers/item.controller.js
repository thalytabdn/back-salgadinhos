const FlavorService = require('../services/flavor.service');
const ItemService = require('../services/item.service');


const create = async (req, res) => {
    try {
        const {
            name,
            imageLink,
            price,
            quantity,
            flavorId,

        } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'O nome do item é obrigatório' });
        }

        if (!imageLink) {
            return res.status(400).json({ error: 'A imagem do item é obrigatório' });
        }

        if (!price) {
            return res.status(400).json({ error: 'O preço do item é obrigatório' });
        }
        
        if (price < 0) {
            return res.status(400).json({ error: 'O preço não pode ser negativo' });
        }

        if (!flavorId) {
            return res.status(400).json({ error: 'O sabor do item é obrigatório' });
        }

        const flavor = await FlavorService.getById(flavorId);

        if (!flavor) {
            return res.status(404).json({ error: 'O sabor não foi encontrado' }); 
        }

        const data = {
            name,
            imageLink,
            price,
            quantity,
            flavorId,
        };

        const item = await ItemService.create(data);

        if (!item) {
            return res
                .status(400)
                .json({ error: 'Não foi possível criar o novo item' });
        }


        return res.status(201).json(item);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getAll = async (req, res) => {
    try {
        const flavors = await ItemService.getAll(req.query);

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
        const { itemId } = req.params;

        const item = await ItemService.getById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O sabor não foi encontrado' });
        }

        return res.status(200).json({ item });
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

        const item = await ItemService.getByName(flavorName);

        if (!item) {
            return res.status(404).json({ error: 'Nenhum sabor foi encontrado' });
        }

        return res.status(200).json({ item });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const remove = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await ItemService.remove(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O sabor não foi encontrado' });
        }

        return res.status(200).json({ item });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const update = async (req, res) => {
    try {
        const { itemId } = req.params;
        
        const { 
            name,
            imageLink,
            price,
            quantity,
        } = req.body;

        const item = await ItemService.update(itemId, { name, imageLink, price, quantity });

        if (!item) {
            return res.status(404).json({ error: 'O sabor não foi encontrado' });
        }

        return res.status(200).json({ item });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


module.exports = {
    create,
    getAll,
    getById,
    getByName,
    remove,
    update,
};