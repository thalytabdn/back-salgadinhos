const PurchaseService = require('../services/purchase.service');


const getAll = async (req, res) => {
    try {
        const purchase = await PurchaseService.getAll(req.query);

        if (!purchase) {
            return res.status(404).json({ error: 'Nenhum carrinho encontrado' });
        }

        return res.status(200).json({ purchase });
    } catch (error) {
        return res.status(500).json({ error: `Ocorreu um erro: ${error.message}` });
    }
};


module.exports = {
    getAll,
};