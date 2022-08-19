import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Abastecimento from './Abastecimento';
import Empresa from './Empresa';

class ProdutoAlmoxarifado extends Model<
  InferAttributes<ProdutoAlmoxarifado>,
  InferCreationAttributes<ProdutoAlmoxarifado>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
  declare tipo: number;
  declare data_atualizacao: CreationOptional<string>;
  declare situacao: CreationOptional<number>;

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
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      tipo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      data_atualizacao: {
        type: DataTypes.DATE,
      },
      situacao: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Produto_Almoxarifado',
      tableName: 'produto_almoxarifado',
    });
  }

  static associate() {
    this.hasMany(Abastecimento, {
      sourceKey: 'id',
      foreignKey: 'id_produto_almoxarifado',
      as: 'abastecimentos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default ProdutoAlmoxarifado;
