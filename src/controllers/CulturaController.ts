import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Cultura from '../models/Cultura';
import Empresa from '../models/Empresa';
import { formatDateToSQL } from '../utils/formatDateToSQL';

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

    const culturasByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'culturas',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const culturas: any[] = [];

    culturasByEmpresas.forEach((culturasByEmpresa: any) => {
      culturas.push(...culturasByEmpresa.culturas);
    });

    return response.json(culturas);
  },

  async store(request: Request, response: Response) {
    const {
      nome, peso_saca, id_unidade, ncm, cultura: isCultura,
    } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const cultura = await Cultura.create({
      id_empresa: Number(id_empresa),
      nome,
      peso_saca,
      id_unidade,
      ncm,
      cultura: isCultura,
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.status(201).json(cultura);
  },
};
