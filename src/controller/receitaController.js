const { receitaViewModel, userViewModel } = require('../view/managerView')

module.exports =
{
    async Get(req, res) {
        try {
            const receita = await receitaViewModel.find({});
            if (receita.length === 0) {
                return res.json({ "sucesso": false, "mensagem": "There are no registered records." });
            };

            return res.json(receita);
        } catch (erro) {
            return res.json({ "success": false, "erro": JSON.stringify(erro) });
        };
    },

    async Post(req, res) {
        try {
            const usuarioId = req.params.usuarioId; // <- pega o ID da URL
            const { descricao, categoria, valor } = req.body;

            if (!usuarioId) {
                return res.status(400).json({ Success: false, Message: "ID do usuário não informado" });
            }

            const usuarioExiste = await userViewModel.findById(usuarioId);
            if (!usuarioExiste) {
                return res.status(404).json({ Success: false, Message: "Usuário não encontrado." });
            }

            const novaReceita = new receitaViewModel({
                usuario: usuarioId, // usa o ID no schema
                descricao,
                categoria,
                valor
            });

            const saved = await novaReceita.save();
            return res.status(201).json({ Success: true, Data: saved });

        } catch (error) {
            return res.status(500).json({ Success: false, Error: error.message });
        }
    },

    async Put(req, res) {
        try {
            const { id } = req.params;
            const { descricao, categoria, valor } = req.body;

            const updatedReceita = await receitaViewModel.findByIdAndUpdate(
                id,
                { descricao, categoria, valor },
                { new: true } // retorna o objeto atualizado
            );

            if (!updatedReceita) {
                return res.json({ Success: false, Message: "Usuário não encontrado." });
            }

            return res.json({ Success: true, Data: updatedReceita });
        } catch (error) {
            return res.json({ Success: false, Error: error.message });
        }
    },

    async Delete(req, res) {
        try {
            const { id } = req.params;

            const deletedReceita = await receitaViewModel.findByIdAndDelete(id);

            if (!deletedReceita) {
                return res.json({ Success: false, Message: "Usuário não encontrado." });
            }

            return res.json({ Success: true, Message: "Usuário excluído com sucesso." });
        } catch (error) {
            return res.json({ Success: false, Error: error.message });
        }
    }
}