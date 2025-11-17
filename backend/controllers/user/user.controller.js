import { createUser } from "../../models/user/userModel.js";
import { hashPassword } from "../../utils/bcrypt.js";
import { isStrongPassword } from "../../utils/regex.js";

export const createNewUser = async (req, res, next) => {
    try {

        const { fullName, email, password } = req.body;
        // Password strength validation
        if (!isStrongPassword(password)) {
            return res.status(400).json({
                status: 'error',
                message:
                    'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
            });
        }
        // Hash the password before saving
        req.body.password = hashPassword(password);

        const result = await createUser(req.body);

        if (result?._id) {
            res.status(201).json({
                status: 'success',
                message: 'User registered successfully',
                result
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'User registration failed',
            });
        }
    } catch (error) {
        next(error);
    }
}