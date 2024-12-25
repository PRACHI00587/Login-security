import express from 'express';
import bodyParser from 'body-parser';
import bigInt from 'big-integer';
import path from 'path';

const app = express();


app.use(express.static(path.join('../public')));

app.use(bodyParser.json());

import { users } from './database.js';

const database = {};
users.forEach(user => {
    database[user.username] = user.password;
});

const p = bigInt(23);
const g = bigInt(5);
const serverPrivateKey = bigInt(987);

app.post('/exchange', (req, res) => {
    const {  clientPublicKey } = req.body;
    const clientKeyBigInt = bigInt(clientPublicKey);
    const serverPublicKey = g.modPow(serverPrivateKey, p);
    const sharedKey = clientKeyBigInt.modPow(serverPrivateKey, p);

    res.json({ serverPublicKey: serverPublicKey.toString() });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const decryptedPassword = atob(password).replace(/[^a-zA-Z0-9!@#$%^&*]/g, '');
    if (database[username] === decryptedPassword) {
        res.json({ message: 'Login successful!' });
    } else {
        res.json({ message: 'Invalid username or password!' });
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.resolve('../public/index.html')); 
});


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
