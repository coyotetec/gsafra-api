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
import AgriAtv from './AgriAtv';
import Empresa from './Empresa';

class Dispositivo extends Model<
  InferAttributes<Dispositivo>,
  InferCreationAttributes<Dispositivo>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare nome: string;
  declare informacoes: string;
  declare status: CreationOptional<number>;

  static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      informacoes: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      status: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Dispositivo',
      tableName: 'dispositivo',
    });
  }

  static associate() {
    this.hasMany(Abastecimento, {
      sourceKey: 'id',
      foreignKey: 'id_dispositivo',
      as: 'abastecimentos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtv, {
      sourceKey: 'id',
      foreignKey: 'id_dispositivo',
      as: 'atividades',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Dispositivo;
