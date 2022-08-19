import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Abastecimento from '../models/Abastecimento';
import AbastecimentoCiclo from '../models/AbastecimentoCiclo';
import AbastecimentoCicloTs from '../models/AbastecimentoCicloTs';
import { formatDateToSQL } from '../utils/formatDateToSQL';

interface AbastecimentoRequestBody {
  id: string;
  data: string;
  hora: string;
  data_atual: string;
  numero_requisicao?: string;
  id_usuario: number;
  id_patrimonio: number;
  id_almoxarifado: number;
  id_produto_almoxarifado: number;
  horimetro: number;
  quantidade: number;
  safras: SafraPayload[];
}

interface AbastecimentoPayload {
  data: string;
  hora: string;
  data_atual: string;
  numero_requisicao?: string;
  horimetro: number;
  quantidade: number;
  id_patrimonio: number;
  id_almoxarifado: number;
  id_produto_almoxarifado: number;
  id_usuario: number;
  id_dispositivo: number;
  id_empresa: number;
  data_atualizacao: string,
}

interface SafraPayload {
  id_safra: number;
  todos_talhoes: boolean;
  talhoes_safras: number[];
}

export default {
  async index(request: Request, response: Response) {
    const { 'data-atualizacao': data_atualizacao } = request.query;
    const {
      'id-empresa': id_empresa, 'id-dispositivo': id_dispositivo,
    } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    if (!id_dispositivo) {
      return response.status(400).json({ erro: 'Id do dispositivo obrigatório' });
    }

    const abastecimentos = await Abastecimento.findAll({
      where: {
        id_empresa: Number(id_empresa),
        ...(data_atualizacao && {
          data_atualizacao: {
            [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
          },
        }),
      },
    });

    return response.json(abastecimentos);
  },

  async store(request: Request, response: Response) {
    const { 'id-empresa': id_empresa } = request.headers;
    const abastecimentosBody: AbastecimentoRequestBody[] = request.body;
    const responseData: { id: string, id_origem: number }[] = [];

    for (const abastecimentoBody of abastecimentosBody) {
      const payload: AbastecimentoPayload = {
        data: abastecimentoBody.data,
        hora: abastecimentoBody.hora,
        data_atual: abastecimentoBody.data_atual,
        horimetro: abastecimentoBody.horimetro,
        quantidade: abastecimentoBody.quantidade,
        id_patrimonio: abastecimentoBody.id_patrimonio,
        id_almoxarifado: abastecimentoBody.id_almoxarifado,
        id_produto_almoxarifado: abastecimentoBody.id_produto_almoxarifado,
        id_usuario: abastecimentoBody.id_usuario,
        id_dispositivo: Number(request.headers['id-dispositivo']),
        id_empresa: Number(id_empresa),
        data_atualizacao: abastecimentoBody.data_atual,
        ...(abastecimentoBody.numero_requisicao && {
          numero_requisicao: abastecimentoBody.numero_requisicao,
        }),
      };

      if (!id_empresa) {
        return response.status(400).json({ erro: 'Id da empresa obrigatório' });
      }

      if (!request.headers['id-dispositivo']) {
        return response.status(400).json({ erro: 'Id do dispositivo obrigatório' });
      }

      const { safras } = abastecimentoBody;

      const abastecimento = await Abastecimento.create(payload);
      responseData.push({
        id: abastecimentoBody.id,
        id_origem: abastecimento.id,
      });

      for (const safra of safras) {
        const abastecimentoSafra = await AbastecimentoCiclo.create({
          id_empresa: Number(id_empresa),
          id_abastecimento: abastecimento.id,
          todos_talhoes: safra.todos_talhoes ? 1 : 0,
          id_safra: safra.id_safra,
        });

        for (const id_talhao_safra of safra.talhoes_safras) {
          await AbastecimentoCicloTs.create({
            id_empresa: Number(id_empresa),
            id_abastecimento_ciclo: abastecimentoSafra.id,
            id_talhao_safra,
          });
        }
      }
    }

    return response.status(201).json(responseData);
  },
};
