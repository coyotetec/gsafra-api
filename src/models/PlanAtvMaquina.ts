import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Empresa from './Empresa';
import Patrimonio from './Patrimonio';
import PlanAtv from './PlanAtv';

class PlanAtvMaquina extends Model<
  InferAttributes<PlanAtvMaquina>,
  InferCreationAttributes<PlanAtvMaquina>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_plan_atv: ForeignKey<PlanAtv['id']>;
  declare id_patrimonio: ForeignKey<Patrimonio['id']>;
  declare horas: number;
  declare operador: CreationOptional<string>;
  declare preparador_calda: CreationOptional<string>;
  declare agua_tanque: CreationOptional<number>;
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
      horas: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      operador: {
        type: DataTypes.STRING(80),
      },
      preparador_calda: {
        type: DataTypes.STRING(80),
      },
      agua_tanque: {
        type: DataTypes.DECIMAL(15, 3),
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
      modelName: 'Plan_Atv_Maquina',
      tableName: 'plan_atv_maquina',
    });
  }

  static associate() { }
}

export default PlanAtvMaquina;
