import express from 'express';
import { validate } from '../../middlewares/validate.js';
import { userValidation } from '../../validation/userValidation.js';
import { createNewUser } from '../../controllers/user/user.controller.js';
const routes = express.Router();


// User Registration
routes.post('/register', validate(userValidation), createNewUser);






export default routes;