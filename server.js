require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Configurações de CORS mais seguras
const corsOptions = {
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Conexão com MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error('MONGODB_URI não está definida nas variáveis de ambiente');
    process.exit(1);
}

// Configurações do Mongoose
mongoose.set('strictQuery', false);

// Tentativa de conexão com retry
const connectWithRetry = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado ao MongoDB Atlas com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB:', err);
        console.log('Tentando reconectar em 5 segundos...');
        setTimeout(connectWithRetry, 5000);
    }
};

connectWithRetry();

// Middleware para logging de requisições
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Modelo do Item
const Item = mongoose.model('Item', {
    nome: String,
    categoria: String,
    quantidade: Number,
    preco: Number,
    prioridade: String,
    observacoes: String,
    comprado: { type: Boolean, default: false }
});

// Rotas da API
app.get('/api/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        res.status(500).json({ error: 'Erro ao buscar itens' });
    }
});

app.post('/api/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        console.error('Erro ao criar item:', error);
        res.status(400).json({ error: 'Erro ao criar item' });
    }
});

app.delete('/api/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar item:', error);
        res.status(400).json({ error: 'Erro ao deletar item' });
    }
});

app.patch('/api/items/:id/toggle-status', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        item.comprado = !item.comprado;
        await item.save();
        res.json(item);
    } catch (error) {
        console.error('Erro ao alterar status do item:', error);
        res.status(400).json({ error: 'Erro ao alterar status do item' });
    }
});

// Rota de teste
app.get('/test', (req, res) => {
    res.json({ message: 'API está funcionando!' });
});

// Rota principal - deve vir depois das outras rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para todas as outras URLs - deve ser a última rota
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; 