import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import CicloProducao from './CicloProducao';
import Empresa from './Empresa';
import TalhaoSafra from './TalhaoSafra';
import Variedade from './Variedade';

class Talhao extends Model<
  InferAttributes<Talhao>,
  InferCreationAttributes<Talhao>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare descricao: string;
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
      descricao: {
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
      modelName: 'Talhao',
      tableName: 'talhao',
    });
  }

  static associate() {
    this.belongsToMany(CicloProducao, {
      through: TalhaoSafra,
      foreignKey: 'id_talhao',
      as: 'safras',
      uniqueKey: 'ciclo_talhao_variedade',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.belongsToMany(Variedade, {
      through: TalhaoSafra,
      foreignKey: 'id_talhao',
      as: 'variedades',
      uniqueKey: 'ciclo_talhao_variedade',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Talhao;
