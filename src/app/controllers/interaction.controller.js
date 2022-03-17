const InteractionService = require('../services/interaction.service');


const create = async (req, res) => {
    try {
        const {
            email,
            phone,
            message
        } = req.body;

        const { id: userId } = req.user;

        if (!message) {
            return res.status(400).json({ error: 'A mensagem é obrigatória' });
        }

        const data = {
            userId,
            email,
            phone,
            message
        };

        const interaction = await InteractionService.create(data);

        if (!interaction){
            return res
                .status(400)
                .json({ error: 'Não foi possível criar uma interação' });
        }

        return res.status(201).json(interaction);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


const getById = async (req, res) => {
    try {

        const { interactionId } = req.params;

        const interaction = await InteractionService.getById(interactionId);

        if (!interaction){
            return res
                .status(400)
                .json({ error: 'A interação não foi encontrada' });
        }

        return res.status(201).json(interaction);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getAll = async (req, res) => {
    try {
        const interaction = await InteractionService.getAll(req.query);

        if (!interaction) {
            return res.status(404).json({ error: 'Nenhuma interação foi encontrada' });
        }

        return res.status(200).json({ interaction });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


module.exports = {
    create,
    getById,
    getAll
};