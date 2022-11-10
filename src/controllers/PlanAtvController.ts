import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Empresa from '../models/Empresa';
import PlanAtv from '../models/PlanAtv';
import PlanAtvInsumo from '../models/PlanAtvInsumo';
import PlanAtvMaquina from '../models/PlanAtvMaquina';
import PlanAtvTalhaoSafra from '../models/PlanAtvTalhaoSafra';
import { formatDateToSQL } from '../utils/formatDateToSQL';

interface PlanejamentoAtividadeRequestBody {
  id_agri_fase: number;
  id_tipo_atividade?: number;
  id_estacao_fenologico?: number;
  id_ciclo_producao: number;
  descricao?: string;
  data_inicio?: string;
  data_termino?: string;
  situacao: number;
  total_area: number;
  total_area_trabalhada: number;
  id_plan_atv_origem?: number;
  id_plan_atv_clone?: number;
  obs?: string;
  id_agri_tipo_aplicacao?: number;
  id_agri_aplicacao_fase?: number;
  vazao_ha?: number;
  motivo_aplicacao?: string;
  data_conclusao_atividade?: string;
  insumos: {
    id_produto_almoxarifado: number;
    id_unidade: number;
    qtde: number;
  }[];
  maquinas: {
    id_patrimonio: number;
    horas: number;
    operador?: string;
    preparador_calda?: string;
    agua_tanque?: number;
  }[];
  talhoes_safras: {
    id_talhao_safra: number;
    hectares: number;
    proporcao: number;
  }[];
}

interface PlanejamentoAtividadePayload {
  id_empresa: number;
  id_agri_fase: number;
  id_tipo_atividade?: number;
  id_estacao_fenologico?: number;
  id_ciclo_producao: number;
  descricao?: string;
  data_inicio?: string;
  data_termino?: string;
  situacao: number;
  total_area: number;
  total_area_trabalhada: number;
  id_plan_atv_origem?: number;
  id_plan_atv_clone?: number;
  obs?: string;
  id_agri_tipo_aplicacao?: number;
  id_agri_aplicacao_fase?: number;
  vazao_ha?: number;
  motivo_aplicacao?: string;
  data_conclusao_atividade?: string;
  data_atualizacao: string;
}

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

    const planejamentosAtividadeByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'planejamentos_atividade',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const planejamentosAtividade: any[] = [];

    planejamentosAtividadeByEmpresas.forEach((planejamentosAtividadeByEmpresa: any) => {
      planejamentosAtividade.push(...planejamentosAtividadeByEmpresa.planejamentos_atividade);
    });

    return response.json(planejamentosAtividade);
  },

  async store(request: Request, response: Response) {
    const planejamentoAtividadeBody: PlanejamentoAtividadeRequestBody = request.body;
    const { 'id-empresa': id_empresa } = request.headers;
    const data_atualizacao = formatDateToSQL(new Date());

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const planejamentoAtividadePayload: PlanejamentoAtividadePayload = {
      id_empresa: Number(id_empresa),
      id_agri_fase: planejamentoAtividadeBody.id_agri_fase,
      id_tipo_atividade: planejamentoAtividadeBody.id_tipo_atividade,
      id_estacao_fenologico: planejamentoAtividadeBody.id_estacao_fenologico,
      id_ciclo_producao: planejamentoAtividadeBody.id_ciclo_producao,
      descricao: planejamentoAtividadeBody.descricao,
      data_inicio: planejamentoAtividadeBody.data_inicio,
      data_termino: planejamentoAtividadeBody.data_termino,
      situacao: planejamentoAtividadeBody.situacao,
      total_area: planejamentoAtividadeBody.total_area,
      total_area_trabalhada: planejamentoAtividadeBody.total_area_trabalhada,
      id_plan_atv_origem: planejamentoAtividadeBody.id_plan_atv_origem,
      id_plan_atv_clone: planejamentoAtividadeBody.id_plan_atv_clone,
      obs: planejamentoAtividadeBody.obs,
      id_agri_tipo_aplicacao: planejamentoAtividadeBody.id_agri_tipo_aplicacao,
      id_agri_aplicacao_fase: planejamentoAtividadeBody.id_agri_aplicacao_fase,
      vazao_ha: planejamentoAtividadeBody.vazao_ha,
      motivo_aplicacao: planejamentoAtividadeBody.motivo_aplicacao,
      data_conclusao_atividade: planejamentoAtividadeBody.data_conclusao_atividade,
      data_atualizacao,
    };

    const planejamentoAtividade = await PlanAtv.create(planejamentoAtividadePayload);

    const { insumos, maquinas, talhoes_safras } = planejamentoAtividadeBody;

    for (const insumo of insumos) {
      await PlanAtvInsumo.create({
        id_empresa: Number(id_empresa),
        id_plan_atv: planejamentoAtividade.id,
        id_produto_almoxarifado: insumo.id_produto_almoxarifado,
        id_unidade: insumo.id_unidade,
        qtde: insumo.qtde,
        data_atualizacao,
      });
    }

    for (const maquina of maquinas) {
      await PlanAtvMaquina.create({
        id_empresa: Number(id_empresa),
        id_plan_atv: planejamentoAtividade.id,
        id_patrimonio: maquina.id_patrimonio,
        horas: maquina.horas,
        operador: maquina.operador,
        preparador_calda: maquina.preparador_calda,
        agua_tanque: maquina.agua_tanque,
        data_atualizacao,
      });
    }

    for (const talhao_safra of talhoes_safras) {
      await PlanAtvTalhaoSafra.create({
        id_empresa: Number(id_empresa),
        id_plan_atv: planejamentoAtividade.id,
        id_talhao_safra: talhao_safra.id_talhao_safra,
        hectares: talhao_safra.hectares,
        proporcao: talhao_safra.proporcao,
        data_atualizacao: formatDateToSQL(new Date()),
      });
    }

    return response.status(201).json(planejamentoAtividade);
  },
};
