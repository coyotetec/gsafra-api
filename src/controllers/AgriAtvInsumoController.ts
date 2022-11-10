import { Request, Response } from 'express';
import { Op } from 'sequelize';
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

    const atividadesAgricolasInsumosByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'atividades_agricolas_insumos',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const atividadesAgricolasInsumos: any[] = [];

    atividadesAgricolasInsumosByEmpresas.forEach(
      (atividadesAgricolasInsumosByEmpresa: any) => {
        atividadesAgricolasInsumos.push(
          ...atividadesAgricolasInsumosByEmpresa.atividades_agricolas_insumos,
        );
      },
    );

    return response.json(atividadesAgricolasInsumos);
  },
};
