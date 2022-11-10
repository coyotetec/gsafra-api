import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import Unidade from '../models/Unidade';
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

    const unidadesMedidaByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'unidades',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const unidadesMedida: any[] = [];

    unidadesMedidaByEmpresas.forEach((unidadesMedidaByEmpresa: any) => {
      unidadesMedida.push(...unidadesMedidaByEmpresa.unidades);
    });

    return response.json(unidadesMedida);
  },

  async store(request: Request, response: Response) {
    const { nome, sigla, permitir_fracionar } = request.body;
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const unidadeMedida = await Unidade.create({
      id_empresa: Number(id_empresa),
      nome,
      sigla,
      permitir_fracionar,
      data_atualizacao: formatDateToSQL(new Date()),
    });

    return response.status(201).json(unidadeMedida);
  },
};
