import Joi from "joi";

export const createOrderSchema = Joi.object({
    shippingAddress: Joi.object({
        fullName: Joi.string().min(2).max(100).required(),
        addressLine1: Joi.string().min(5).max(200).required(),
        addressLine2: Joi.string().allow("").optional(),
        city: Joi.string().min(2).max(100).required(),
        state: Joi.string().min(2).max(100).required(),
        postcode: Joi.string().min(3).max(10).required(),
        country: Joi.string().default("Australia"),
        phone: Joi.string().min(6).max(20).required(),
    }).required(),

    paymentMethod: Joi.string()
        .valid("COD", "card", "paypal", "stripe", "other")
        .default("COD"),
});
