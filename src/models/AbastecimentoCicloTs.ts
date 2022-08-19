import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import AbastecimentoCiclo from './AbastecimentoCiclo';
import Empresa from './Empresa';
import TalhaoSafra from './TalhaoSafra';

class AbastecimentoCicloTs extends Model<
  InferAttributes<AbastecimentoCicloTs>,
  InferCreationAttributes<AbastecimentoCicloTs>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_abastecimento_ciclo: ForeignKey<AbastecimentoCiclo['id']>;
  declare id_talhao_safra: ForeignKey<TalhaoSafra['id']>;

  static initialize(sequelize: Sequelize) {
    this.init({
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Abastecimento_Ciclo_Ts',
      tableName: 'abastecimento_ciclo_ts',
    });
  }
}

export default AbastecimentoCicloTs;
