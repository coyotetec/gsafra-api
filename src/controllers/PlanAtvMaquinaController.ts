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

    const planejamentosAtividadeMaquinasByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'planejamentos_atividade_maquinas',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const planejamentosAtividadeMaquinas: any[] = [];

    planejamentosAtividadeMaquinasByEmpresas.forEach(
      (planejamentosAtividadeMaquinasByEmpresa: any) => {
        planejamentosAtividadeMaquinas.push(
          ...planejamentosAtividadeMaquinasByEmpresa.planejamentos_atividade_maquinas,
        );
      },
    );

    return response.json(planejamentosAtividadeMaquinas);
  },
};
