import { login } from '../controllers/loginController.js';

export const loginRoute = (req, res) => {
    // '/login?username=abc&password=xyz'
    const username = req.body.username;
    const password = req.body.password;

    // trying to log in
    login(username, password, res);
}