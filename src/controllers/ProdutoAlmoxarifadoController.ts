import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import ProdutoAlmoxarifado from '../models/ProdutoAlmoxarifado';
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

    const produtosAlmoxarifado = await ProdutoAlmoxarifado.findAll({
      where: {
        id_empresa: Number(id_empresa),
        ...(data_atualizacao && {
          data_atualizacao: {
            [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
          },
        }),
      },
    });

    return response.json(produtosAlmoxarifado);
  },

  async store(request: Request, response: Response) {
    const { nome, tipo } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const produtoAlmoxarifado = await ProdutoAlmoxarifado.create({
      id_empresa: Number(id_empresa),
      nome,
      tipo,
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.status(201).json(produtoAlmoxarifado);
  },
};
