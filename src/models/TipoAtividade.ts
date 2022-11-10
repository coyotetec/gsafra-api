import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import AgriAtv from './AgriAtv';
import Empresa from './Empresa';
import PlanAtv from './PlanAtv';

class TipoAtividade extends Model<
  InferAttributes<TipoAtividade>,
  InferCreationAttributes<TipoAtividade>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
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
      modelName: 'Tipo_Atividade',
      tableName: 'tipo_atividade',
    });
  }

  static associate() {
    this.hasMany(PlanAtv, {
      sourceKey: 'id',
      foreignKey: 'id_tipo_atividade',
      as: 'planejamentos_atividade',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtv, {
      sourceKey: 'id',
      foreignKey: 'id_tipo_atividade',
      as: 'atividades_agricolas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default TipoAtividade;
