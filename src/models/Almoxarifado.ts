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

class Almoxarifado extends Model<
  InferAttributes<Almoxarifado>,
  InferCreationAttributes<Almoxarifado>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
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
      modelName: 'Almoxarifado',
      tableName: 'almoxarifado',
    });
  }

  static associate() {
    this.hasMany(Abastecimento, {
      sourceKey: 'id',
      foreignKey: 'id_almoxarifado',
      as: 'abastecimentos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Almoxarifado;
