import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import AgriAplicacaoFase from './AgriAplicacaoFase';
import AgriTipoAplicacao from './AgriTipoAplicacao';
import CicloProducao from './CicloProducao';
import Empresa from './Empresa';
import EstacaoFenologico from './EstacaoFenologico';
import TipoAtividade from './TipoAtividade';
import PlanAtvInsumo from './PlanAtvInsumo';
import PlanAtvMaquina from './PlanAtvMaquina';
import PlanAtvTalhaoSafra from './PlanAtvTalhaoSafra';
import AgriAtv from './AgriAtv';

class PlanAtv extends Model<
  InferAttributes<PlanAtv>,
  InferCreationAttributes<PlanAtv>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_agri_fase: number;
  declare id_tipo_atividade: ForeignKey<TipoAtividade['id']>;
  declare id_estacao_fenologico: ForeignKey<EstacaoFenologico['id']>;
  declare id_ciclo_producao: ForeignKey<CicloProducao['id']>;
  declare descricao: CreationOptional<string>;
  declare data_inicio: CreationOptional<string>;
  declare data_termino: CreationOptional<string>;
  declare situacao: number;
  declare total_area: number;
  declare total_area_trabalhada: number;
  declare id_plan_atv_origem: ForeignKey<PlanAtv['id']>;
  declare id_plan_atv_clone: ForeignKey<PlanAtv['id']>;
  declare obs: CreationOptional<string>;
  declare id_agri_tipo_aplicacao: ForeignKey<AgriTipoAplicacao['id']>;
  declare id_agri_aplicacao_fase: ForeignKey<AgriAplicacaoFase['id']>;
  declare vazao_ha: CreationOptional<number>;
  declare motivo_aplicacao: CreationOptional<string>;
  declare data_conclusao_atividade: CreationOptional<string>;
  declare data_atualizacao: CreationOptional<string>;
  declare excluido: CreationOptional<number>;

  static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_origem: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      id_agri_fase: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING(60),
      },
      data_inicio: {
        type: DataTypes.DATEONLY,
      },
      data_termino: {
        type: DataTypes.DATEONLY,
      },
      situacao: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      total_area: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: false,
      },
      total_area_trabalhada: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: false,
      },
      obs: {
        type: DataTypes.TEXT,
      },
      vazao_ha: {
        type: DataTypes.DECIMAL(15, 3),
      },
      motivo_aplicacao: {
        type: DataTypes.STRING(500),
      },
      data_conclusao_atividade: {
        type: DataTypes.DATE,
      },
      data_atualizacao: {
        type: DataTypes.DATE,
      },
      excluido: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Plan_Atv',
      tableName: 'plan_atv',
    });
  }

  static associate() {
    this.hasMany(PlanAtv, {
      sourceKey: 'id',
      foreignKey: 'id_plan_atv_origem',
      as: 'planejamentos_atividade_origem',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtv, {
      sourceKey: 'id',
      foreignKey: 'id_plan_atv_clone',
      as: 'planejamentos_atividade_clone',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_plan_atv',
      as: 'planejamentos_atividade_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvMaquina, {
      sourceKey: 'id',
      foreignKey: 'id_plan_atv',
      as: 'planejamentos_atividade_maquinas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvTalhaoSafra, {
      sourceKey: 'id',
      foreignKey: 'id_plan_atv',
      as: 'planejamentos_atividade_talhao_safra',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtv, {
      sourceKey: 'id',
      foreignKey: 'id_plan_atv',
      as: 'atividades_agricolas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default PlanAtv;
