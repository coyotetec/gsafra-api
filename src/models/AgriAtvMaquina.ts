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
import Patrimonio from './Patrimonio';

class AgriAtvMaquina extends Model<
  InferAttributes<AgriAtvMaquina>,
  InferCreationAttributes<AgriAtvMaquina>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_agri_atv: ForeignKey<AgriAtv['id']>;
  declare id_patrimonio: ForeignKey<Patrimonio['id']>;
  declare hr_inicial: number;
  declare hr_final: number;
  declare horas: number;
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
      hr_inicial: {
        type: DataTypes.DECIMAL(15, 2),
      },
      hr_final: {
        type: DataTypes.DECIMAL(15, 2),
      },
      horas: {
        type: DataTypes.DECIMAL(15, 2),
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
      modelName: 'Agri_Atv_Maquina',
      tableName: 'agri_atv_maquina',
    });
  }

  static associate() { }
}

export default AgriAtvMaquina;
