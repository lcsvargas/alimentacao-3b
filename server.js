const express = require('express');
const session = require('express-session');
const cors = require('cors');
const clr = require('connect-livereload');
const bcrypt = require('bcrypt');
const livereload = require('livereload');

const db = require('./database');
const port = 3000;
const saltrounds = 10;

try {
    const x = db.prepare('SELECT CURRENT_TIME;');
    console.log(x.get()[Object.keys(x.get())[0]]);
} catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
}

const app = express();

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
}));

app.use(express.static('public'));
app.use(clr());
app.use(express.json());

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});
