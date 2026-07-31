import bcrypt from 'bcrypt';
import fs from 'node:fs';
const dbPath = './data/db.json';

// this calls getHash eventually - 1
export function register(username, password) {
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            // Handle error
            return;
        }
        else {
            getHash(salt, username, password);
        }
    });
}

// this calls dbUpdater eventually - 2
export function getHash(salt, username, password) {
    const userPassword = password; 
    bcrypt.hash(userPassword, salt, (err, hash) => {
        if (err) {
            // Handle error
            return;
        }
        else {
            dbUpdater(username, hash);
        }
    });
}

// adds a fresh user
export function dbUpdater(username, hash) {
    const fileContent = fs.readFileSync(dbPath, "utf-8");
    const parsedContent = JSON.parse(fileContent);

    parsedContent.push({
        "id": parsedContent.length + 1,
        "username": username,
        "password": hash
    });

    fs.writeFileSync(dbPath, JSON.stringify(parsedContent, null, 2));
}

