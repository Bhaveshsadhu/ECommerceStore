import userSchema from "./userSchema.js";

export const createUser = (userObject) => {
    return userSchema.create(userObject);
}

export const findUserByEmail = (email) => {
    return userSchema.findOne({ email });
}

export const findUserById = (id) => {
    return userSchema.findById(id);
}

export const updateUserById = (id, updateObject) => {
    return userSchema.findByIdAndUpdate(id, updateObject, { new: true });
}

export const deleteUserById = (id) => {
    return userSchema.findByIdAndDelete(id);
}

