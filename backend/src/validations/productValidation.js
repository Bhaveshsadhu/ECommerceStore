import Joi from "joi";

const imageSchema = Joi.object({
    url: Joi.string().uri().required(),
    isThumbnail: Joi.boolean().optional(),
});

export const createProductSchema = Joi.object({
    name: Joi.string().min(2).max(200).required(),
    description: Joi.string().min(10).max(2000).required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().integer().min(0).required(),
    category: Joi.string().optional(), // ObjectId string
    images: Joi.array().items(imageSchema).optional(),
});

export const updateProductSchema = Joi.object({
    name: Joi.string().min(2).max(200).optional(),
    description: Joi.string().min(10).max(2000).optional(),
    price: Joi.number().min(0).optional(),
    stock: Joi.number().integer().min(0).optional(),
    category: Joi.string().optional(),
    images: Joi.array().items(imageSchema).optional(),
    isActive: Joi.boolean().optional(),
    isApproved: Joi.boolean().optional(), // admin only
});
