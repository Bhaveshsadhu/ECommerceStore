import { createUser, deleteUserById, findUserByEmail, findUserById, updateUserById } from "../../models/user/userModel.js";
import { comparePassword, hashPassword } from "../../utils/bcrypt.js";
import { generateToken, verifyToken } from "../../utils/jwt.js";
import { isStrongPassword } from "../../utils/regex.js";

export const createNewUser = async (req, res, next) => {
    try {

        const { fullName, email, password, role } = req.body;
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

        if (role === 'admin') {
            return res.status(403).json({
                status: 'error',
                message: 'Registration as admin is not allowed.',
            });
        }


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

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
            });
        }

        if (user?._id && user?.isActive === true) {
            //compare password

            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid email or password',
                });
            }
            else {
                // Proceed with login (e.g., generate token, set session)
                // res.cookie('token', 'sampleToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
                generateToken(res, user._id);
                res.status(200).json({
                    status: 'success',
                    message: 'Login successful',
                });
            }
        }
        else {
            return res.status(403).json({
                status: 'error',
                message: 'Account is inactive. Please contact support.',
            });
        }

    } catch (error) {
        next(error);
    }
}

export const getUserProfile = async (req, res, next) => {
    try {
        //get token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized. No token provided.',
            });
        } else {
            // Fetch user profile logic to be implemented
            const decode = verifyToken(token);
            console.log(decode)
            if (!decode) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Unauthorized. Invalid token.',
                });
            }
            else {
                const user = await findUserById(decode.userId);

                if (!user) {
                    return res.status(404).json({
                        status: 'error',
                        message: 'User not found.',
                    });
                }
                else {
                    res.status(200).json({
                        status: 'success',
                        message: 'User profile fetched successfully',
                        user
                    });
                }
            }


        }
    } catch (error) {
        next(error);
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized. No token provided.',
            });
        }

        const decode = verifyToken(token);
        if (!decode) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized. Invalid token.',
            });
        }

        const updatePayload = { ...req.body };

        if (updatePayload.password) {
            if (!isStrongPassword(updatePayload.password)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
                });
            }

            updatePayload.password = hashPassword(updatePayload.password);
        }

        const updatedUser = await updateUserById(decode.userId, updatePayload);
        if (!updatedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
}

export const deleteUserAccount = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized. No token provided.',
            });
        }

        const decode = verifyToken(token);
        if (!decode) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized. Invalid token.',
            });
        }

        const deletedUser = await deleteUserById(decode.userId);
        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found.',
            });
        }

        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            status: 'success',
            message: 'User account deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}
export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully',
        });
    } catch (error) {
        next(error);
    }
}
