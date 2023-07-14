import joi from "joi";

export const signupSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
});

export const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(1).required(),
});
