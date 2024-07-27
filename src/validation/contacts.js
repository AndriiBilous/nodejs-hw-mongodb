import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(3).max(20),
    phoneNumber: Joi.string().required().min(3).max(20),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
    isFavourite: Joi.boolean(),
});

export const updateContactsSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email().min(3).max(20),
    phoneNumber: Joi.string().min(3).max(20),
    contactType: Joi.string().valid('work', 'home', 'personal'),
    isFavourite: Joi.boolean(),
});