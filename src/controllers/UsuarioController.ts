import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import Usuario from '../models/Usuario';
import { formatDateToSQL } from '../utils/formatDateToSQL';
import { comparePassword, securePassword } from '../utils/securePassword';

export default {
  async index(request: Request, response: Response) {
    const { 'data-atualizacao': data_atualizacao } = request.query;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const usuarios = await Usuario.findAll({
      where: {
        id_empresa: Number(id_empresa),
        ...(data_atualizacao && {
          data_atualizacao: {
            [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
          },
        }),
      },
    });

    return response.json(usuarios);
  },

  async store(request: Request, response: Response) {
    const { nome, login, senha } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const usuarioAlreadyExists = await Usuario.findOne({
      where: {
        login,
      },
    });

    if (usuarioAlreadyExists) {
      return response.status(400).json({ erro: 'Usuario já existe' });
    }

    const usuario = await Usuario.create({
      id_empresa: Number(id_empresa),
      nome,
      login,
      senha: await securePassword(senha),
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.status(201).json(usuario);
  },

  async login(request: Request, response: Response) {
    const { login, senha } = request.body;
    const usuario = await Usuario.findOne({
      where: { login },
    });

    if (!usuario) {
      return response.status(400).json({
        erro: 'Usuário não existe',
      });
    }

    if (!(await comparePassword(senha, usuario.senha))) {
      return response.status(400).json({
        erro: 'Senha incorreta',
      });
    }

    return response.send();
  },
};
