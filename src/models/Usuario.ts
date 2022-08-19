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

class Usuario extends Model<
  InferAttributes<Usuario>,
  InferCreationAttributes<Usuario>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
  declare login: string;
  declare senha: string;
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
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      senha: {
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
      modelName: 'Usuario',
      tableName: 'usuario',
    });
  }

  static associate() {
    this.hasMany(Abastecimento, {
      sourceKey: 'id',
      foreignKey: 'id_usuario',
      as: 'abastecimentos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Usuario;
