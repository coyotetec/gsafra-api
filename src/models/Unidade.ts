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
import Cultura from './Cultura';
import Empresa from './Empresa';
import PlanAtvInsumo from './PlanAtvInsumo';
import ProdutoAlmoxarifado from './ProdutoAlmoxarifado';

class Unidade extends Model<
  InferAttributes<Unidade>,
  InferCreationAttributes<Unidade>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
  declare sigla: string;
  declare permitir_fracionar: CreationOptional<number>;
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
      nome: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      sigla: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      permitir_fracionar: {
        type: DataTypes.SMALLINT,
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
      modelName: 'Unidade',
      tableName: 'unidade',
    });
  }

  static associate() {
    this.hasMany(Cultura, {
      sourceKey: 'id',
      foreignKey: 'id_unidade',
      as: 'culturas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_unidade',
      as: 'planejamentos_atividade_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_unidade',
      as: 'atividades_agricolas_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(ProdutoAlmoxarifado, {
      sourceKey: 'id',
      foreignKey: 'id_unidade',
      as: 'produtos_almoxarifado',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Unidade;
