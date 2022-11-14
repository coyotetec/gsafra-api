import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import Talhao from '../models/Talhao';
import { formatDateToSQL } from '../utils/formatDateToSQL';

export default {
  async index(request: Request, response: Response) {
    const { 'data-atualizacao': data_atualizacao, 'id-fazenda': id_fazenda } = request.query;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const talhoesByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'talhoes',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
          ...(id_fazenda && {
            id_fazenda,
          }),
        },
      },
    });

    let talhoes: any[] = [];

    talhoesByEmpresas.forEach((talhoesByEmpresa: any) => {
      talhoes.push(...talhoesByEmpresa.talhoes);
    });

    talhoes = talhoes.map((talhao) => {
      let coordenadas = null;

      if (talhao.coordenadas) {
        coordenadas = talhao.coordenadas.toString('utf8');
      }

      return {
        ...talhao.dataValues,
        coordenadas,
      };
    });

    return response.json(talhoes);
  },

  async store(request: Request, response: Response) {
    const { descricao, id_fazenda, hectares } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const talhao = await Talhao.create({
      id_empresa: Number(id_empresa),
      id_fazenda,
      descricao,
      hectares,
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.status(201).json(talhao);
  },
};
