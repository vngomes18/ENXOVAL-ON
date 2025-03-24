const Item = require('../models/Item');

// Criar novo item
exports.criarItem = async (req, res) => {
  try {
    console.log('Tentando criar novo item:', req.body);
    
    // Validar dados obrigatórios
    if (!req.body.nome || !req.body.categoria || !req.body.quantidade || !req.body.preco) {
      console.log('Dados obrigatórios faltando');
      return res.status(400).json({ 
        message: 'Dados obrigatórios faltando',
        required: ['nome', 'categoria', 'quantidade', 'preco']
      });
    }

    // Validar categoria
    const categoriasValidas = ['Cozinha', 'Quarto', 'Banheiro', 'Sala', 'Outros'];
    if (!categoriasValidas.includes(req.body.categoria)) {
      console.log('Categoria inválida:', req.body.categoria);
      return res.status(400).json({ 
        message: 'Categoria inválida',
        categoriasValidas
      });
    }

    // Validar prioridade
    const prioridadesValidas = ['Alta', 'Média', 'Baixa'];
    if (req.body.prioridade && !prioridadesValidas.includes(req.body.prioridade)) {
      console.log('Prioridade inválida:', req.body.prioridade);
      return res.status(400).json({ 
        message: 'Prioridade inválida',
        prioridadesValidas
      });
    }

    const novoItem = new Item(req.body);
    console.log('Item criado:', novoItem);
    
    const itemSalvo = await novoItem.save();
    console.log('Item salvo no banco:', itemSalvo);
    
    res.status(201).json(itemSalvo);
  } catch (error) {
    console.error('Erro ao criar item:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors,
      stack: error.stack
    });
  }
};

// Listar todos os itens
exports.listarItens = async (req, res) => {
  try {
    console.log('Buscando todos os itens...');
    const itens = await Item.find();
    console.log('Itens encontrados:', itens.length);
    if (itens.length === 0) {
      console.log('Nenhum item encontrado');
      return res.json([]);
    }
    res.json(itens);
  } catch (error) {
    console.error('Erro ao listar itens:', error);
    res.status(500).json({ 
      message: error.message,
      details: error.errors,
      stack: error.stack
    });
  }
};

// Buscar item por ID
exports.buscarItem = async (req, res) => {
  try {
    console.log('Buscando item com ID:', req.params.id);
    const item = await Item.findById(req.params.id);
    if (!item) {
      console.log('Item não encontrado');
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    console.log('Item encontrado:', item);
    res.json(item);
  } catch (error) {
    console.error('Erro ao buscar item:', error);
    res.status(500).json({ 
      message: error.message,
      details: error.errors 
    });
  }
};

// Atualizar item
exports.atualizarItem = async (req, res) => {
  try {
    console.log('Atualizando item:', req.params.id);
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!item) {
      console.log('Item não encontrado para atualização');
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    console.log('Item atualizado:', item);
    res.json(item);
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors 
    });
  }
};

// Deletar item
exports.deletarItem = async (req, res) => {
  try {
    console.log('Deletando item:', req.params.id);
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      console.log('Item não encontrado para deleção');
      return res.status(404).json({ message: 'Item não encontrado' });
    }
    console.log('Item deletado com sucesso');
    res.json({ message: 'Item removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    res.status(500).json({ 
      message: error.message,
      details: error.errors 
    });
  }
}; 