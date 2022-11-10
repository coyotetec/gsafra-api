import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const validation = joi.object({
  nome: joi.string()
    .max(100)
    .trim(true)
    .required(),
  senha: joi.string()
    .min(3)
    .max(20)
    .trim(true)
    .required(),
});

async function empresaValidation(request: Request, response: Response, next: NextFunction) {
  const payload = {
    nome: request.body.nome,
    senha: request.body.senha,
  };
  const { error } = validation.validate(payload, {
    errors: { label: 'key', wrap: { label: false } },
  });

  if (error) {
    return response.status(400).json({
      erro: error.message,
    });
  }

  return next();
}

export { empresaValidation };
