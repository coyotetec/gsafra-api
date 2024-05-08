import { Request, Response } from 'express';
import Empresa from '../models/Empresa';
import { comparePassword, securePassword } from '../utils/securePassword';

export default {
  async index(request: Request, response: Response) {
    const empresas = await Empresa.findAll();

    return response.json(empresas);
  },

  async store(request: Request, response: Response) {
    const { nome, senha, id_cliente_empresa } = request.body;
    const existingEmpresa = await Empresa.findOne({
      where: { nome },
    });

    if (existingEmpresa) {
      return response.status(400).json({
        erro: 'Empresa já cadastrada',
      });
    }

    const empresa = await Empresa.create({
      nome,
      senha: await securePassword(senha),
      id_cliente_empresa,
    });

    return response.status(201).json(empresa);
  },

  async login(request: Request, response: Response) {
    const { id, senha } = request.body;
    console.log({ id, senha });
    console.log('Capturando os dados do body');
    console.log(`Buscando id ${id} no banco`);
    const empresa = await Empresa.findByPk(id);

    if (!empresa) {
      console.log('Empresa não encontrada');
      return response.status(400).json({
        erro: 'Empresa não existe',
      });
    }
    console.log(`Empresa ${empresa.nome} encontrada`);

    if (empresa.excluido === 1 || empresa.status === 0) {
      console.log(`Empresa ${empresa.nome} inativa`);
      return response.status(400).json({
        erro: 'Empresa inativa',
      });
    }

    if (!(await comparePassword(senha, empresa.senha))) {
      console.log('Senha não confere');
      return response.status(400).json({
        erro: 'Senha incorreta',
      });
    }

    console.log('Login efetuado');
    return response.send();
  },
};
