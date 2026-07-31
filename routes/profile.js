import { showUserData } from '../controllers/profileController.js';

export const profileRoute = (req, res) => {
    // middleware hands over req.userData via JWT
    const userData = req.userData;
    // fetch user data  
    showUserData(userData, res);
}