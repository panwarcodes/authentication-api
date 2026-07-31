import fs from 'node:fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const dbPath = './data/db.json';

export function login(username, password, res) {
    const dbContent = fs.readFileSync(dbPath, 'utf-8');
    const parsedContent = JSON.parse(dbContent);

    for (const creds of parsedContent) {

        if (creds.username === username) {
            console.log(creds.username + ' trying to log in');
            const credsPass = creds.password;

            // verifying user submitted passwords against actual password hash
            const userID = creds.id;
            bcryptPassVerify(credsPass, password, username, userID, res);

            return;
        };
    };
    res.send(`User not found.\n`);
}



function bcryptPassVerify(credsPass, password, username, userID, res) {
    bcrypt.compare(password, credsPass, (err, result) => {
        let loginStatus = '';
        if (err) {
            // Handle error
            loginStatus = `Error comparing passwords: ${err}`;
            res.send(loginStatus + '\n');
        }

        if (result) {
            // Passwords match, authentication successful
            loginStatus = `Passwords match! User authenticated.`;
            // res.send(loginStatus + '\n');
            genJWT(username, userID, res);

        }
        else {
            // Passwords don't match, authentication failed
            loginStatus = `Passwords do not match! Authentication failed.`;
            res.send(loginStatus + '\n');
        }
    });
}

// generate JWT up on authorization
function genJWT(username, userID, res) {

    const payload = { sub: `${userID}`, role: `${username}` };
    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(payload, secret, {
        expiresIn: '15m'
    });

    res.send(`Access Token: ${token} \n`);
}