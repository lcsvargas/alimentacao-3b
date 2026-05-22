const Database = require('better-sqlite3');

const db = new Database('database.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS cliente (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        identificador TEXT NOT NULL UNIQUE,
        contato TEXT
    );
    CREATE TABLE IF NOT EXISTS pedido (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (cliente_id) REFERENCES cliente(id)
    );
    CREATE TABLE IF NOT EXISTS item_pedido (
        pedido_id INTEGER NOT NULL,
        produto_id INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        FOREIGN KEY (pedido_id) REFERENCES pedido(id),
        FOREIGN KEY (produto_id) REFERENCES produto(id)
    );
    CREATE TABLE IF NOT EXISTS produto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        preco REAL NOT NULL
    );
    CREATE TABLE IF NOT EXISTS funcionario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS notificacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pedido_id INTEGER NOT NULL,
        mensagem TEXT NOT NULL,
        FOREIGN KEY (pedido_id) REFERENCES pedido(id)
    );
    CREATE TABLE IF NOT EXISTS combo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        desconto_pct REAL NOT NULL
    );
`);

module.exports = db;
