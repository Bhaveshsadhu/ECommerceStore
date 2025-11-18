export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const details = error.details.map((d) => d.message);
            res.status(400);
            return next(new Error(details.join(", ")));
        }

        req.body = value;
        next();
    };
};
