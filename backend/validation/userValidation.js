import Joi from "joi";

export const userValidation = Joi.object({
    fullName: Joi.string().min(3).max(50).required(),

    email: Joi.string().email().required(),

    password: Joi.string()
        .min(8)
        .max(30)
        .required(),

    phone: Joi.string()
        .pattern(/^[0-9]{8,15}$/)
        .allow("")
        .messages({
            "string.pattern.base": "Phone number must be 8–15 digits"
        }),

    role: Joi.string()
        .valid("user", "vendor", "delivery", "admin")
        .default("user"),

    // Vendor only fields
    shopName: Joi.string().allow(""),
    shopDetails: Joi.string().allow(""),

    // Delivery partner fields
    vehicleType: Joi.string()
        .valid("bike", "scooter", "car", "")
        .allow(""),
    licenseNumber: Joi.string().allow(""),

    // Address
    address: Joi.object({
        street: Joi.string().allow(""),
        city: Joi.string().allow(""),
        state: Joi.string().allow(""),
        postalCode: Joi.string().allow(""),
        country: Joi.string().default("Australia")
    }),

    avatar: Joi.string().uri().allow(""),
});
