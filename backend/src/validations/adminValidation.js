import Joi from "joi";

export const changeUserRoleSchema = Joi.object({
    role: Joi.string()
        .valid("user", "vendor", "delivery-partner", "admin")
        .required(),
});

export const updateOrderStatusSchema = Joi.object({
    orderStatus: Joi.string()
        .valid(
            "pending",
            "processing",
            "packed",
            "shipped",
            "out-for-delivery",
            "delivered",
            "cancelled"
        )
        .required(),
});

export const assignDeliveryPartnerSchema = Joi.object({
    deliveryPartnerId: Joi.string().required(),
});
