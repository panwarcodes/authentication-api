// V0.1
import express from 'express';
import bcrypt from 'bcrypt';
import fs from 'node:fs';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// routes, controller import
import { registerRoute } from './routes/register.js';
import { loginRoute } from './routes/login.js';
import { profileRoute } from './routes/profile.js';

// middleware import
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = 3000;
const dbPath = `./data/db.json`;

// checking if dbPath exists
if (fs.existsSync(dbPath)) {
    console.log('Continuing with an existing db file...');
}
// else creating file
else {
    const dbArray = [];
    fs.writeFileSync(dbPath, JSON.stringify(dbArray, null, 2));
}

// middlwares

// cookieParser which attaches parsed cookies data to req aka req.cookies
app.use(cookieParser());
// get requests in json format
app.use(express.json());
// get req.body working and curl url -d '' -  flag fix
app.use(express.urlencoded({ extended: true })); 

// register post request V1.0.0
app.post('/register', registerRoute);

// login post request V1.0.0
app.post('/login', loginRoute);

// profile post request V1.0.0
app.post('/profile', authenticateToken, profileRoute);

app.listen(PORT, () => {
    console.log('Okay server is running...');
})