import { NextFunction, Request, Response } from 'express';
import joi from 'joi';

const validation = joi.object({
  nome: joi.string()
    .max(100)
    .trim(true)
    .required(),
  informacoes: joi.string()
    .max(200)
    .trim(true)
    .required(),
});

async function dispositivoValidation(request: Request, response: Response, next: NextFunction) {
  const payload = {
    nome: request.body.nome,
    informacoes: request.body.informacoes,
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

export { dispositivoValidation };
