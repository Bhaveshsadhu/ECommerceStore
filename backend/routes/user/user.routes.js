import express from 'express';
import { validate } from '../../middlewares/validate.js';
import { userValidation } from '../../validation/userValidation.js';
import { createNewUser, deleteUserAccount, getUserProfile, loginUser, logoutUser, updateUserProfile } from '../../controllers/user/user.controller.js';
const routes = express.Router();


// User Registration
routes.post('/register', validate(userValidation), createNewUser);
// user Login
routes.post('/login', loginUser);
// Get User Profile
routes.get('/profile', getUserProfile);
// Update User Profile
routes.put('/profile', updateUserProfile);
// Delete User Account
routes.delete('/deleteuser', deleteUserAccount);
// logout User
routes.post('/logout', logoutUser);






export default routes;