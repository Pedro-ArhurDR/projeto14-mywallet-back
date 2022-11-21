import joi from "joi";

export const signupSchema =  
    joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required(),
    senha2: joi.string().required()
  });