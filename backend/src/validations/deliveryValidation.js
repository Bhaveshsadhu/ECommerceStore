import Joi from "joi";

export const updateDeliveryStatusSchema = Joi.object({
    status: Joi.string()
        .valid("out-for-delivery", "delivered")
        .required(),
});
