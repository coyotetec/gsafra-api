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
import AgriAtvInsumo from './AgriAtvInsumo';
import Empresa from './Empresa';

class Almoxarifado extends Model<
  InferAttributes<Almoxarifado>,
  InferCreationAttributes<Almoxarifado>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
  declare status: CreationOptional<number>;
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
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
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

    this.hasMany(AgriAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_almoxarifado',
      as: 'atividades_agricolas_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Almoxarifado;
