import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import EstacaoFenologico from '../models/EstacaoFenologico';
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

    const estadiosFenologicosByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'estadios_fenologicos',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const estadiosFenologicos: any[] = [];

    estadiosFenologicosByEmpresas.forEach((estadiosFenologicosByEmpresa: any) => {
      estadiosFenologicos.push(...estadiosFenologicosByEmpresa.estadios_fenologicos);
    });

    return response.json(estadiosFenologicos);
  },

  async store(request: Request, response: Response) {
    const { nome, id_cultura } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const estadioFenologico = await EstacaoFenologico.create({
      id_empresa: Number(id_empresa),
      nome,
      id_cultura,
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.status(201).json(estadioFenologico);
  },
};
