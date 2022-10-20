import { Request, Response } from 'express';
import { Op } from 'sequelize';
import AgriAtv from '../models/AgriAtv';
import AgriAtvInsumo from '../models/AgriAtvInsumo';
import AgriAtvMaquina from '../models/AgriAtvMaquina';
import AgriAtvTalhaoSafra from '../models/AgriAtvTalhaoSafra';
import Empresa from '../models/Empresa';
import { formatDateToSQL } from '../utils/formatDateToSQL';

interface AtividadeAgricolaRequestBody {
  id_plan_atv?:number;
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
  obs?: string;
  id_agri_tipo_aplicacao?: number;
  id_agri_aplicacao_fase?: number;
  insumos: {
    id_produto_almoxarifado: number;
    id_unidade: number;
    id_almoxarifado: number;
    id_plan_atv_insumo?: number;
    qtde: number;
  }[];
  maquinas: {
    id_patrimonio: number;
    hr_inicial?: number;
    hr_final?: number;
    horas: number;
  }[];
  talhoes_safras: {
    id_talhao_safra: number;
    hectares: number;
    proporcao: number;
    hectares_planejamento: number;
    proporcao_planejamento: number;
  }[];
}

interface AtividadeAgricolaPayload {
  id_empresa: number;
  id_plan_atv?:number;
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
  obs?: string;
  id_agri_tipo_aplicacao?: number;
  id_agri_aplicacao_fase?: number;
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

    const atividadesAgricolasByEmpresas = await Empresa.findAll({
      where: {
        id_cliente_empresa: empresa.id_cliente_empresa,
      },
      include: {
        association: 'atividades_agricolas',
        where: {
          ...(data_atualizacao && {
            data_atualizacao: {
              [Op.gte]: formatDateToSQL(new Date(String(data_atualizacao))),
            },
          }),
        },
      },
    });

    const atividadesAgricolas: any[] = [];

    atividadesAgricolasByEmpresas.forEach((atividadesAgricolasByEmpresa: any) => {
      atividadesAgricolas.push(...atividadesAgricolasByEmpresa.atividades_agricolas);
    });

    return response.json(atividadesAgricolas);
  },

  async store(request: Request, response: Response) {
    const atividadeAgricolaBody: AtividadeAgricolaRequestBody = request.body;
    const { 'id-empresa': id_empresa } = request.headers;
    const data_atualizacao = formatDateToSQL(new Date());

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const atividadeAgricolaPayload: AtividadeAgricolaPayload = {
      id_empresa: Number(id_empresa),
      id_plan_atv: atividadeAgricolaBody.id_plan_atv,
      id_agri_fase: atividadeAgricolaBody.id_agri_fase,
      id_tipo_atividade: atividadeAgricolaBody.id_tipo_atividade,
      id_estacao_fenologico: atividadeAgricolaBody.id_estacao_fenologico,
      id_ciclo_producao: atividadeAgricolaBody.id_ciclo_producao,
      descricao: atividadeAgricolaBody.descricao,
      data_inicio: atividadeAgricolaBody.data_inicio,
      data_termino: atividadeAgricolaBody.data_termino,
      situacao: atividadeAgricolaBody.situacao,
      total_area: atividadeAgricolaBody.total_area,
      total_area_trabalhada: atividadeAgricolaBody.total_area_trabalhada,
      obs: atividadeAgricolaBody.obs,
      id_agri_tipo_aplicacao: atividadeAgricolaBody.id_agri_tipo_aplicacao,
      id_agri_aplicacao_fase: atividadeAgricolaBody.id_agri_aplicacao_fase,
      data_atualizacao,
    };

    const atividadeAgricola = await AgriAtv.create(atividadeAgricolaPayload);

    const { insumos, maquinas, talhoes_safras } = atividadeAgricolaBody;

    for (const insumo of insumos) {
      await AgriAtvInsumo.create({
        id_empresa: Number(id_empresa),
        id_agri_atv: atividadeAgricola.id,
        id_produto_almoxarifado: insumo.id_produto_almoxarifado,
        id_unidade: insumo.id_unidade,
        id_almoxarifado: insumo.id_almoxarifado,
        id_plan_atv_insumo: insumo.id_plan_atv_insumo,
        qtde: insumo.qtde,
        data_atualizacao,
      });
    }

    for (const maquina of maquinas) {
      await AgriAtvMaquina.create({
        id_empresa: Number(id_empresa),
        id_agri_atv: atividadeAgricola.id,
        id_patrimonio: maquina.id_patrimonio,
        hr_inicial: maquina.hr_inicial,
        hr_final: maquina.hr_final,
        horas: maquina.horas,
        data_atualizacao,
      });
    }

    for (const talhao_safra of talhoes_safras) {
      await AgriAtvTalhaoSafra.create({
        id_empresa: Number(id_empresa),
        id_agri_atv: atividadeAgricola.id,
        id_talhao_safra: talhao_safra.id_talhao_safra,
        hectares: talhao_safra.hectares,
        proporcao: talhao_safra.proporcao,
        hectares_planejamento: talhao_safra.hectares_planejamento,
        proporcao_planejamento: talhao_safra.proporcao_planejamento,
        data_atualizacao: formatDateToSQL(new Date()),
      });
    }

    return response.status(201).json(atividadeAgricola);
  },
};
