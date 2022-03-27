const FeedbackService = require('../services/feedback.service');


const create = async (req, res) => {
    try {
        const {
            comment,
            evaluation,
        } = req.body;

        const { id: userId } = req.user;

        if (!comment) {
            return res.status(400).json({ error: 'O comentário é obrigatório' });
        }

        if (evaluation === undefined) {
            return res.status(400).json({ error: 'A nota é obrigatória' });
        }

        const data = {
            userId,
            comment,
            evaluation,
        };

        const feedback = await FeedbackService.create(data);

        if (!feedback){
            return res
                .status(400)
                .json({ error: 'Não foi possível criar uma interação' });
        }

        return res.status(201).json(feedback);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


const getById = async (req, res) => {
    try {

        const { feedbackId } = req.params;

        const feedback = await FeedbackService.getById(feedbackId);

        if (!feedback){
            return res
                .status(400)
                .json({ error: 'A interação não foi encontrada' });
        }

        return res.status(201).json(feedback);

    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};

const getAll = async (req, res) => {
    try {
        const feedback = await FeedbackService.getAll(req.query);

        if (!feedback) {
            return res.status(404).json({ error: 'Nenhuma interação foi encontrada' });
        }

        return res.status(200).json({ feedback });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


module.exports = {
    create,
    getById,
    getAll
};