require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Configurações de CORS mais seguras
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

// Conexão com MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'sua_string_de_conexao_mongodb';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conectado ao MongoDB Atlas com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para logging de requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Schema do Item
const itemSchema = new mongoose.Schema({
    nome: String,
    categoria: String,
    quantidade: Number,
    preco: Number,
    prioridade: String,
    observacoes: String,
    comprado: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);

// Rotas
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        res.status(500).json({ message: 'Erro ao buscar itens' });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        const item = new Item({
            ...req.body,
            comprado: false
        });
        const novoItem = await item.save();
        res.status(201).json(novoItem);
    } catch (error) {
        console.error('Erro ao criar item:', error);
        res.status(400).json({ message: 'Erro ao criar item' });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.json({ message: 'Item deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar item:', error);
        res.status(500).json({ message: 'Erro ao deletar item' });
    }
});

// Rota para alternar status de compra
app.patch('/api/items/:id/toggle-status', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        
        if (!item) {
            console.log('Item não encontrado:', req.params.id);
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        
        item.comprado = !item.comprado;
        const itemAtualizado = await item.save();
        
        console.log('Status alterado com sucesso:', {
            id: item._id,
            nome: item.nome,
            comprado: item.comprado
        });
        
        res.json(itemAtualizado);
    } catch (error) {
        console.error('Erro ao alternar status:', error);
        res.status(500).json({ message: 'Erro ao alternar status do item' });
    }
});

// Rota de teste
app.get('/test', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3000;

// Tratamento de erro para porta em uso
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Porta ${PORT} já está em uso. Tentando outra porta...`);
        setTimeout(() => {
            server.close();
            app.listen(PORT + 1);
        }, 1000);
    } else {
        console.error('Erro ao iniciar servidor:', err);
    }
});

module.exports = app; 