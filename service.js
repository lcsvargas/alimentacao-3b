const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');

const db = require('./database');
const app = express();

app.use(express.json());

app.post('/clientes/identificar', async (req, res) => {
    try {
        const {nome, id, contato} = req.body;
        if (!nome || !id) {
            return res.status(400).json({ error: 'Nome e identificador são obrigatórios' });
        }

        let cliente = db.prepare('SELECT * FROM cliente WHERE identificador = ?').get(id);
        
        if (!cliente) {
            const stmt = db.prepare('INSERT INTO cliente (nome, identificador, contato) VALUES (?, ?, ?)');
            const info = stmt.run(nome, id, contato);
            cliente = { id: info.lastInsertRowid, nome, identificador: id, contato };
        };

        res.json(cliente);
    } catch (error) {
        console.error('Error identifying client:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})