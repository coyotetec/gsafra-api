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
import AgriAtvMaquina from './AgriAtvMaquina';
import Empresa from './Empresa';
import PlanAtvMaquina from './PlanAtvMaquina';

class Patrimonio extends Model<
  InferAttributes<Patrimonio>,
  InferCreationAttributes<Patrimonio>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare codigo_patrimonio: CreationOptional<number>;
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
      codigo_patrimonio: {
        type: DataTypes.STRING(20),
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

    this.hasMany(PlanAtvMaquina, {
      sourceKey: 'id',
      foreignKey: 'id_patrimonio',
      as: 'planejamentos_atividade_maquinas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvMaquina, {
      sourceKey: 'id',
      foreignKey: 'id_patrimonio',
      as: 'atividades_agricolas_maquinas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default Patrimonio;
