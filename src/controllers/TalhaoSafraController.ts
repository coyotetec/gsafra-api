import { Request, Response } from 'express';
import { Op } from 'sequelize';
import CicloProducao from '../models/CicloProducao';
import Empresa from '../models/Empresa';
import Talhao from '../models/Talhao';
import TalhaoSafra from '../models/TalhaoSafra';
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

    const talhoesSafras = await TalhaoSafra.findAll({
      where: {
        id_empresa: Number(id_empresa),
        ...(data_atualizacao && {
          data_atualizacao: {
            [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
          },
        }),
      },
    });

    return response.json(talhoesSafras);
  },

  async getSafrasFromTalhao(request: Request, response: Response) {
    const { id } = request.params;

    const talhao = await Talhao.findByPk(Number(id), {
      attributes: [],
      include: {
        association: 'safras',
      },
    });

    if (!talhao) {
      return response.status(400).json({ erro: 'Talhao não existe' });
    }

    return response.json(talhao);
  },

  async addSafraToTalhao(request: Request, response: Response) {
    const { id_safra, hectares, id_variedade } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const { id } = request.params;

    const talhao = await Talhao.findByPk(id);
    const safra = await CicloProducao.findByPk(id_safra);

    if (!talhao && !safra) {
      return response.status(400).json({ erro: 'Talhão e safra não existem' });
    }

    if (!talhao) {
      return response.status(400).json({ erro: 'Talhao não existe' });
    }

    if (!safra) {
      return response.status(400).json({ erro: 'Safra não existe' });
    }

    const talhaoSafra = await TalhaoSafra.create({
      id_empresa: Number(id_empresa),
      id_talhao: Number(id),
      id_safra,
      id_variedade,
      hectares,
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.json(talhaoSafra);
  },

  async getTalhoesFromSafra(request: Request, response: Response) {
    const { id } = request.params;

    const talhoes = await CicloProducao.findByPk(Number(id), {
      attributes: [],
      include: [
        { association: 'talhoes' },
        { association: 'variedades' },
      ],
    });

    if (!talhoes) {
      return response.status(400).json({ erro: 'Safra não existe' });
    }

    return response.json(talhoes);
  },

  async addTalhaoToSafra(request: Request, response: Response) {
    const { id_talhao, hectares, id_variedade } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const { id } = request.params;

    const safra = await CicloProducao.findByPk(id);
    const talhao = await Talhao.findByPk(id_talhao);

    if (!safra && !talhao) {
      return response.status(400).json({ erro: 'Talhão e safra não existem' });
    }

    if (!safra) {
      return response.status(400).json({ erro: 'Safra não existe' });
    }

    if (!talhao) {
      return response.status(400).json({ erro: 'Talhão não existe' });
    }

    const talhaoSafra = await TalhaoSafra.create({
      id_empresa: Number(id_empresa),
      id_safra: Number(id),
      id_talhao,
      id_variedade,
      hectares,
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.json(talhaoSafra);
  },
};
