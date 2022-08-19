import { Request, Response } from 'express';
import Empresa from '../models/Empresa';
import { comparePassword, securePassword } from '../utils/securePassword';

export default {
  async index(request: Request, response: Response) {
    const empresas = await Empresa.findAll();

    return response.json(empresas);
  },

  async store(request: Request, response: Response) {
    const { nome, senha } = request.body;
    const existingEmpresa = await Empresa.findOne({
      where: { nome },
    });

    if (existingEmpresa) {
      return response.status(400).json({
        erro: 'Empresa já cadastrada',
      });
    }

    const empresa = await Empresa.create({
      nome, senha: await securePassword(senha),
    });

    return response.status(201).json(empresa);
  },

  async login(request: Request, response: Response) {
    const { id, senha } = request.body;
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      return response.status(400).json({
        erro: 'Empresa não existe',
      });
    }

    if (empresa.situacao === 0) {
      return response.status(400).json({
        erro: 'Empresa inativa',
      });
    }

    if (!(await comparePassword(senha, empresa.senha))) {
      return response.status(400).json({
        erro: 'Senha incorreta',
      });
    }

    return response.send();
  },
};
