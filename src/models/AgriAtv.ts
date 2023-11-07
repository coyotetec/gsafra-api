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
import AgriAtvInsumo from './AgriAtvInsumo';
import AgriAtvMaquina from './AgriAtvMaquina';
import AgriAtvTalhaoSafra from './AgriAtvTalhaoSafra';
import AgriTipoAplicacao from './AgriTipoAplicacao';
import CicloProducao from './CicloProducao';
import Dispositivo from './Dispositivo';
import Empresa from './Empresa';
import EstacaoFenologico from './EstacaoFenologico';
import PlanAtv from './PlanAtv';
import TipoAtividade from './TipoAtividade';
import Usuario from './Usuario';

class AgriAtv extends Model<
  InferAttributes<AgriAtv>,
  InferCreationAttributes<AgriAtv>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_usuario: ForeignKey<Usuario['id']>;
  declare id_dispositivo: ForeignKey<Dispositivo['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_plan_atv: ForeignKey<PlanAtv['id']>;
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
  declare obs: CreationOptional<string>;
  declare id_agri_tipo_aplicacao: ForeignKey<AgriTipoAplicacao['id']>;
  declare id_agri_aplicacao_fase: ForeignKey<AgriAplicacaoFase['id']>;
  declare data_atualizacao: CreationOptional<string>;
  declare status: CreationOptional<number>;
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
      status: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
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
      modelName: 'Agri_Atv',
      tableName: 'agri_atv',
    });
  }

  static associate() {
    this.hasMany(AgriAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_agri_atv',
      as: 'atividades_agricolas_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvMaquina, {
      sourceKey: 'id',
      foreignKey: 'id_agri_atv',
      as: 'atividades_agricolas_maquinas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvTalhaoSafra, {
      sourceKey: 'id',
      foreignKey: 'id_agri_atv',
      as: 'atividades_agricolas_talhao_safra',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default AgriAtv;
