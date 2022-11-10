import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import AgriAtv from './AgriAtv';
import Almoxarifado from './Almoxarifado';
import Empresa from './Empresa';
import PlanAtvInsumo from './PlanAtvInsumo';
import ProdutoAlmoxarifado from './ProdutoAlmoxarifado';
import Unidade from './Unidade';

class AgriAtvInsumo extends Model<
  InferAttributes<AgriAtvInsumo>,
  InferCreationAttributes<AgriAtvInsumo>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_agri_atv: ForeignKey<AgriAtv['id']>;
  declare id_produto_almoxarifado: ForeignKey<ProdutoAlmoxarifado['id']>;
  declare id_unidade: ForeignKey<Unidade['id']>;
  declare id_almoxarifado: ForeignKey<Almoxarifado['id']>;
  declare id_plan_atv_insumo: ForeignKey<PlanAtvInsumo['id']>;
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
      modelName: 'Agri_Atv_Insumo',
      tableName: 'agri_atv_insumo',
    });
  }

  static associate() { }
}

export default AgriAtvInsumo;
