import { register, getHash, dbUpdater } from '../controllers/registerController.js'

export const registerRoute = (req, res) => {
    // '/register?username=abc&password=xyz'
    const username = req.body.username;
    const password = req.body.password;
    // console.log('works at register.js');
    register(username, password);
    res.send(`User registered, now you can login at '/login'`);
}