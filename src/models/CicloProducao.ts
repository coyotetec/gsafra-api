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
import AbastecimentoCiclo from './AbastecimentoCiclo';
import AgriAtv from './AgriAtv';
import Cultura from './Cultura';
import Empresa from './Empresa';
import PlanAtv from './PlanAtv';
import Talhao from './Talhao';
import TalhaoSafra from './TalhaoSafra';
import Variedade from './Variedade';

class CicloProducao extends Model<
  InferAttributes<CicloProducao>,
  InferCreationAttributes<CicloProducao>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
  declare id_cultura: ForeignKey<Cultura['id']>;
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
      nome: {
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
      modelName: 'Ciclo_Producao',
      tableName: 'ciclo_producao',
    });
  }

  static associate() {
    this.belongsToMany(Talhao, {
      through: TalhaoSafra,
      foreignKey: 'id_safra',
      as: 'talhoes',
      uniqueKey: 'ciclo_talhao_variedade',
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    this.belongsToMany(Variedade, {
      through: TalhaoSafra,
      foreignKey: 'id_safra',
      as: 'variedades',
      uniqueKey: 'ciclo_talhao_variedade',
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    });

    this.belongsToMany(Abastecimento, {
      through: AbastecimentoCiclo,
      foreignKey: 'id_safra',
      as: 'abastecimentos',
      uniqueKey: 'abastecimento_ciclo',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtv, {
      sourceKey: 'id',
      foreignKey: 'id_ciclo_producao',
      as: 'planejamentos_atividade',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtv, {
      sourceKey: 'id',
      foreignKey: 'id_ciclo_producao',
      as: 'atividades_agricolas',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default CicloProducao;
