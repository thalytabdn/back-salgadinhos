const FlavorService = require('../services/flavor.service');
const ItemService = require('../services/item.service');


const create = async (req, res) => {
    try {
        const {
            name,
            imageLink,
            price,
            quantity,
            flavors,
            itemClass,
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

        const data = {
            name,
            imageLink,
            price,
            quantity,
            itemClass,
        };

        const itemExists = await ItemService.getByName(name);

        if(itemExists) {
            return res.status(400).json({ error: 'Esse produto já existe' });
        }

        

        const item = await ItemService.create(data);

        if (!item) {
            return res
                .status(400)
                .json({ error: 'Não foi possível criar o novo item' });
        }

        await Promise.all(flavors.map( async (flavor) => {

            await FlavorService.create({
                itemId: item.id,
                name: flavor
            })

        }))

        const result = await ItemService.getById(item.id);

        return res.status(201).json({item: result});

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getAll = async (req, res) => {
    try {
        const items = await ItemService.getAll(req.query);

        if (!items) {
            return res.status(404).json({ error: 'Nenhum produto foi encontrado' });
        }

        return res.status(200).json({ items });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getById = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await ItemService.getById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O produto não foi encontrado' });
        }

        return res.status(200).json({ item });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getByName = async (req, res) => {
    try {
        const { itemName } = req.query;

        if (!itemName){
            return res.status(404).json({ error: 'O nome do produto é obrigatório' });
        }

        const item = await ItemService.getByName(itemName);

        if (!item) {
            return res.status(404).json({ error: 'Nenhum produto foi encontrado' });
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
            return res.status(404).json({ error: 'O item não foi encontrado' });
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
            active
        } = req.body;

        const item = await ItemService.update(itemId, { name, imageLink, price, quantity, active });

        if (!item) {
            return res.status(404).json({ error: 'O sabor não foi encontrado' });
        }

        return res.status(200).json({ item });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const addflavor = async (req, res) => {
    try {
        const { itemId } = req.params;
        
        const { 
            flavors
        } = req.body;

        const item = await ItemService.getById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O item não foi encontrado' });
        }

        await Promise.all(flavors.map( async (flavor) => {

            await FlavorService.create({
                itemId: item.id,
                name: flavor
            })

        }))

        const result = await ItemService.getById(item.id);

        return res.status(201).json({item: result});

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
}

const removeflavor = async (req, res) => {
    try {
        const { itemId } = req.params;
        
        const { 
            flavors
        } = req.body;

        const item = await ItemService.getById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O item não foi encontrado' });
        }

        await Promise.all(flavors.map( async (flavor) => {

            await FlavorService.remove({
                itemId: item.id,
                name: flavor
            })

        }))

        const result = await ItemService.getById(item.id);

        return res.status(201).json({item: result});

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
}

const getAllFlavorsByItemId = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await ItemService.getById(itemId);

        if (!item) {
            return res.status(404).json({ error: 'O produto não foi encontrado' });
        }

        const flavors = await FlavorService.getAll(req.query, itemId);

        return res.status(200).json(flavors);
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
}

const getPurchaseByItemId = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await ItemService.getPurchaseByItemId(itemId);

        if (!item) {
            return res.status(200).json({ message: 'Nenhuma pedido associado a esse item' });
        }

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
}

module.exports = {
    create,
    getAll,
    getById,
    getByName,
    remove,
    update,
    addflavor,
    removeflavor,
    getAllFlavorsByItemId,
    getPurchaseByItemId
};