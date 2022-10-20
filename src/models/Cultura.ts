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
import EstacaoFenologico from './EstacaoFenologico';
import Unidade from './Unidade';

class Cultura extends Model<
  InferAttributes<Cultura>,
  InferCreationAttributes<Cultura>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
  declare peso_saca: CreationOptional<number>;
  declare id_unidade: ForeignKey<Unidade['id']>;
  declare ncm: CreationOptional<string>;
  declare cultura: CreationOptional<number>;
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
      peso_saca: {
        type: DataTypes.DECIMAL(15, 3),
      },
      ncm: {
        type: DataTypes.STRING(10),
      },
      cultura: {
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
      modelName: 'Cultura',
      tableName: 'cultura',
    });
  }

  static associate() {
    this.hasMany(CicloProducao, {
      sourceKey: 'id',
      foreignKey: 'id_cultura',
      as: 'safras',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(EstacaoFenologico, {
      sourceKey: 'id',
      foreignKey: 'id_cultura',
      as: 'estadios_fenologicos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Cultura;
