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
import PlanAtv from './PlanAtv';
import TalhaoSafra from './TalhaoSafra';

class PlanAtvTalhaoSafra extends Model<
  InferAttributes<PlanAtvTalhaoSafra>,
  InferCreationAttributes<PlanAtvTalhaoSafra>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_plan_atv: ForeignKey<PlanAtv['id']>;
  declare id_talhao_safra: ForeignKey<TalhaoSafra['id']>;
  declare hectares: number;
  declare proporcao: number;
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
      hectares: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: false,
      },
      proporcao: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
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
      modelName: 'Plan_Atv_Talhao_Safra',
      tableName: 'plan_atv_talhao_safra',
    });
  }

  static associate() { }
}

export default PlanAtvTalhaoSafra;
