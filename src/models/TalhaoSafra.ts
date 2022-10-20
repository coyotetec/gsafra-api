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
import AbastecimentoCicloTs from './AbastecimentoCicloTs';
import AgriAtvTalhaoSafra from './AgriAtvTalhaoSafra';
import CicloProducao from './CicloProducao';
import Empresa from './Empresa';
import PlanAtvTalhaoSafra from './PlanAtvTalhaoSafra';
import Talhao from './Talhao';
import Variedade from './Variedade';

class TalhaoSafra extends Model<
  InferAttributes<TalhaoSafra>,
  InferCreationAttributes<TalhaoSafra>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_talhao: ForeignKey<Talhao['id']>;
  declare id_safra: ForeignKey<CicloProducao['id']>;
  declare id_variedade: ForeignKey<Variedade['id']>;
  declare data_atualizacao: CreationOptional<string>;
  declare hectares: CreationOptional<number>;
  declare status: CreationOptional<number>;
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
      data_atualizacao: {
        type: DataTypes.DATE,
      },
      hectares: {
        type: DataTypes.DECIMAL(15, 3),
      },
      status: {
        type: DataTypes.SMALLINT,
        defaultValue: 1,
      },
      excluido: {
        type: DataTypes.SMALLINT,
        defaultValue: 0,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Talhao_Safra',
      tableName: 'talhao_safra',
    });
  }

  static associate() {
    this.belongsToMany(AbastecimentoCiclo, {
      through: AbastecimentoCicloTs,
      uniqueKey: 'abastecimento_ciclo_talhao_safra',
      foreignKey: 'id_talhao_safra',
      as: 'abastecimento_ciclos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvTalhaoSafra, {
      sourceKey: 'id',
      foreignKey: 'id_talhao_safra',
      as: 'planejamentos_atividade_talhao_safra',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvTalhaoSafra, {
      sourceKey: 'id',
      foreignKey: 'id_talhao_safra',
      as: 'atividades_agricolas_talhao_safra',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default TalhaoSafra;
