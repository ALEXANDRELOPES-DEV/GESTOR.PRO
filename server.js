const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const tableDataSchema = new mongoose.Schema({
    user: String,
    data: Array
});

const User = mongoose.model('User', userSchema);
const TableData = mongoose.model('TableData', tableDataSchema);

// Endpoint para login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Endpoint para salvar dados
app.post('/saveData', async (req, res) => {
    const { user, data } = req.body;
    await TableData.updateOne({ user }, { data }, { upsert: true });
    res.json({ success: true });
});

// Endpoint para carregar dados
app.get('/loadData', async (req, res) => {
    const { user } = req.query;
    const tableData = await TableData.findOne({ user });
    res.json({ data: tableData ? tableData.data : [] });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
