import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import AgriAtvInsumo from './AgriAtvInsumo';
import Empresa from './Empresa';
import PlanAtv from './PlanAtv';
import ProdutoAlmoxarifado from './ProdutoAlmoxarifado';
import Unidade from './Unidade';

class PlanAtvInsumo extends Model<
  InferAttributes<PlanAtvInsumo>,
  InferCreationAttributes<PlanAtvInsumo>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_plan_atv: ForeignKey<PlanAtv['id']>;
  declare id_produto_almoxarifado: ForeignKey<ProdutoAlmoxarifado['id']>;
  declare id_unidade: ForeignKey<Unidade['id']>;
  declare qtde: number;
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
      qtde: {
        type: DataTypes.DECIMAL(15, 3),
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
      modelName: 'Plan_Atv_Insumo',
      tableName: 'plan_atv_insumo',
    });
  }

  static associate() {
    this.hasMany(AgriAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_plan_atv_insumo',
      as: 'atividades_agricolas_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default PlanAtvInsumo;
