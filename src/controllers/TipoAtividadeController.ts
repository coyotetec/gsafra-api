import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import TipoAtividade from '../models/TipoAtividade';
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

    const tiposAtividadesByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'tipos_atividades',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const tiposAtividades: any[] = [];

    tiposAtividadesByEmpresas.forEach((tiposAtividadesByEmpresa: any) => {
      tiposAtividades.push(...tiposAtividadesByEmpresa.tipos_atividades);
    });

    return response.json(tiposAtividades);
  },

  async store(request: Request, response: Response) {
    const { nome } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const tipoAtividade = await TipoAtividade.create({
      id_empresa: Number(id_empresa),
      nome,
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.status(201).json(tipoAtividade);
  },
};
