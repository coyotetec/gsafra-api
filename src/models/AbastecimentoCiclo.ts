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
import AbastecimentoCicloTs from './AbastecimentoCicloTs';
import CicloProducao from './CicloProducao';
import Empresa from './Empresa';
import TalhaoSafra from './TalhaoSafra';

class AbastecimentoCiclo extends Model<
  InferAttributes<AbastecimentoCiclo>,
  InferCreationAttributes<AbastecimentoCiclo>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare todos_talhoes: number;
  declare id_abastecimento: ForeignKey<Abastecimento['id']>;
  declare id_safra: ForeignKey<CicloProducao['id']>;

  static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      todos_talhoes: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Abastecimento_Ciclo',
      tableName: 'abastecimento_ciclo',
    });
  }

  static associate() {
    this.belongsToMany(TalhaoSafra, {
      through: AbastecimentoCicloTs,
      foreignKey: 'id_abastecimento_ciclo',
      as: 'talhoes_safras',
      uniqueKey: 'abastecimento_ciclo_talhao_safra',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default AbastecimentoCiclo;
