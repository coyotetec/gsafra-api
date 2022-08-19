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

class Patrimonio extends Model<
  InferAttributes<Patrimonio>,
  InferCreationAttributes<Patrimonio>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare codigo_patrimonio: CreationOptional<number>;
  declare descricao: string;
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
      codigo_patrimonio: {
        type: DataTypes.STRING(20),
        unique: true,
      },
      descricao: {
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
      modelName: 'Patrimonio',
      tableName: 'patrimonio',
    });
  }

  static associate() {
    this.hasMany(Abastecimento, {
      sourceKey: 'id',
      foreignKey: 'id_patrimonio',
      as: 'abastecimentos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Patrimonio;
