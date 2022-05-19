const StoreService = require('../services/store.service');


const create = async (req, res) => {

    try {
        const {
            name,
            email,
            phone,
            street,
            number,
            zipcode,
            city,
            neighborhood,
            openingHours,
        } = req.body;

        const data = {
            name,
            email,
            phone,
            street,
            number,
            zipcode,
            city,
            neighborhood,
            openingHours,
        };

        const store = await StoreService.create(data);

        if (!store) {
            return res
                .status(400)
                .json({ error: 'Não foi possível criar a nova loja' });
        }

        return res.status(201).json(store);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getAll = async (req, res) => {

    try {

        const stores = await StoreService.getAll(req.query);

        if (!stores) {
            return res.status(404).json({ error: 'Nenhuma loja foi encontrada' });
        }

        return res.status(200).json({ stores });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getById = async (req, res) => {

    try {
        const { storeId } = req.params;

        const store = await StoreService.getById(storeId);

        if (!store) {
            return res.status(404).json({ error: 'A loja não foi encontrada' });
        }

        return res.status(200).json({ store });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const remove = async (req, res) => {
    try {
        const { storeId } = req.params;

        const store = await StoreService.remove(storeId);

        if (!store) {
            return res.status(404).json({ error: 'A loja não foi encontrada' });
        }

        return res.status(200).json({ store });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const update = async (req, res) => {
    try {
        const { storeId } = req.params;
        
        const { 
            name,
            email,
            phone,
            street,
            number,
            zipcode,
            city,
            neighborhood,
            openingHours,
        } = req.body;

        const store = await StoreService.update(storeId, {             
            name,
            email,
            phone,
            street,
            number,
            zipcode,
            city,
            neighborhood,
            openingHours, 
        });

        if (!store) {
            return res.status(404).json({ error: 'A loja não foi encontrado' });
        }

        return res.status(200).json({ store });
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