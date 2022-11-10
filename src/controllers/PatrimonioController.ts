import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import Patrimonio from '../models/Patrimonio';
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

    const patrimoniosByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'patrimonios',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const patrimonios: any[] = [];

    patrimoniosByEmpresas.forEach((patrimoniosByEmpresa: any) => {
      patrimonios.push(...patrimoniosByEmpresa.patrimonios);
    });

    return response.json(patrimonios);
  },

  async store(request: Request, response: Response) {
    const { descricao, codigo_patrimonio } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const patrimonio = await Patrimonio.create({
      id_empresa: Number(id_empresa),
      descricao,
      data_atualizacao: formatDateToSQL(new Date()),
      ...(codigo_patrimonio && { codigo_patrimonio }),
    });

    return response.status(201).json(patrimonio);
  },
};
