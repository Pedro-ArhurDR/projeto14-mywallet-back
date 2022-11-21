import joi from "joi";

export const recordSchema =  
    joi.object({
    descricao: joi.string().required(),
    userId: joi.string().required(),
    valor:joi.string().required(),
  });

