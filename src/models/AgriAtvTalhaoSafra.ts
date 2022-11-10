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
import TalhaoSafra from './TalhaoSafra';

class AgriAtvTalhaoSafra extends Model<
  InferAttributes<AgriAtvTalhaoSafra>,
  InferCreationAttributes<AgriAtvTalhaoSafra>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare id_agri_atv: ForeignKey<AgriAtv['id']>;
  declare id_talhao_safra: ForeignKey<TalhaoSafra['id']>;
  declare hectares: number;
  declare proporcao: number;
  declare hectares_planejamento: number;
  declare proporcao_planejamento: number;
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
      hectares: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: false,
      },
      proporcao: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      hectares_planejamento: {
        type: DataTypes.DECIMAL(15, 3),
        allowNull: false,
      },
      proporcao_planejamento: {
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
      modelName: 'Agri_Atv_Talhao_Safra',
      tableName: 'agri_atv_talhao_safra',
    });
  }

  static associate() { }
}

export default AgriAtvTalhaoSafra;
