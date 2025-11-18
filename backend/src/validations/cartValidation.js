import Joi from "joi";

export const addToCartSchema = Joi.object({
    productId: Joi.string().required(),
    qty: Joi.number().integer().min(1).default(1),
});

export const updateCartItemSchema = Joi.object({
    productId: Joi.string().required(),
    qty: Joi.number().integer().min(0).required(), // 0 or less → remove
});
