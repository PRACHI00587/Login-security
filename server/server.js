import express from 'express';
import bodyParser from 'body-parser';
import bigInt from 'big-integer';
import path from 'path';
import CryptoJS from "crypto-js";

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
const serverPrivateKey = bigInt(98);

app.post('/exchange', (req, res) => {
    try {
    const {  clientPublicKey } = req.body;
    const sharedKey = bigInt(clientPublicKey).modPow(serverPrivateKey, p);
    const serverPublicKey = g.modPow(serverPrivateKey, p);
    

    res.json({ serverPublicKey: serverPublicKey.toString() });
    } catch (error) {
        console.error('Error during /exchange request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/login', (req, res) => {
    
    const { username, password ,clientPublicKey} = req.body;

    const user = users.find(u => u.username === username);  // Find user by username

    if (!user) {
        // If the user doesn't exist
        return res.json({ message: 'Invalid username or password!' });
    }
    
    
    console.log('Received username:', {username}); // Log the received username
    console.log('Received encrypted password:', {password}); // Log the received password
    if (!clientPublicKey) {
        return res.json({ message: 'Client public key is missing!' });
    }
    const sharedKey = bigInt(clientPublicKey).modPow(serverPrivateKey, p);
    const sharedKeyString = sharedKey.toString();

    console.log('sharedKey :' , {sharedKeyString});

    const bytes = CryptoJS.AES.decrypt(password, sharedKeyString);
const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
const decrypted = decryptedPassword.toString();
    console.log('Decrypted password:', {decrypted}); 

    if (user.password === decryptedPassword) {
        res.json({ "message": 'Login successful!' });
        
    } else {
        res.json({ "message": 'Invalid username or password!' });
       
    }
});


app.get('/', (req, res) => {
    res.sendFile(path.resolve('../public/index.html')); 
});
app.get('/welcome',(req,res) => {
    res.sendFile(path.resolve('../public/welcome.html'));
})


app.listen(3000, () => console.log('Server running on http://localhost:3000'));
