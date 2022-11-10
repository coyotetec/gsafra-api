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

class AgriTipoAplicacao extends Model<
  InferAttributes<AgriTipoAplicacao>,
  InferCreationAttributes<AgriTipoAplicacao>
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
        type: DataTypes.STRING(50),
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
      modelName: 'Agri_Tipo_Aplicacao',
      tableName: 'agri_tipo_aplicacao',
    });
  }

  static associate() {
    this.hasMany(PlanAtv, {
      sourceKey: 'id',
      foreignKey: 'id_agri_tipo_aplicacao',
      as: 'planejamentos_atividade',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtv, {
      sourceKey: 'id',
      foreignKey: 'id_agri_tipo_aplicacao',
      as: 'atividades_agricolas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default AgriTipoAplicacao;
