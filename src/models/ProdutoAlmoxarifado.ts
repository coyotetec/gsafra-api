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
import AgriAtvInsumo from './AgriAtvInsumo';
import Empresa from './Empresa';
import PlanAtvInsumo from './PlanAtvInsumo';
import Unidade from './Unidade';

class ProdutoAlmoxarifado extends Model<
  InferAttributes<ProdutoAlmoxarifado>,
  InferCreationAttributes<ProdutoAlmoxarifado>
> {
  declare id: CreationOptional<number>;
  declare id_empresa: ForeignKey<Empresa['id']>;
  declare id_origem: CreationOptional<number>;
  declare nome: string;
  declare id_unidade: ForeignKey<Unidade['id']>;
  declare tipo: number;
  declare dose_ha: CreationOptional<number>;
  declare periodo_carencia: CreationOptional<number>;
  declare classe_toxicologica: CreationOptional<string>;
  declare intervalo_reentrada: CreationOptional<number>;
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
      tipo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      dose_ha: {
        type: DataTypes.DECIMAL(15, 3),
      },
      periodo_carencia: {
        type: DataTypes.SMALLINT,
      },
      classe_toxicologica: {
        type: DataTypes.STRING(30),
      },
      intervalo_reentrada: {
        type: DataTypes.SMALLINT,
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
      modelName: 'Produto_Almoxarifado',
      tableName: 'produto_almoxarifado',
    });
  }

  static associate() {
    this.hasMany(Abastecimento, {
      sourceKey: 'id',
      foreignKey: 'id_produto_almoxarifado',
      as: 'abastecimentos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(PlanAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_produto_almoxarifado',
      as: 'planejamentos_atividade_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    this.hasMany(AgriAtvInsumo, {
      sourceKey: 'id',
      foreignKey: 'id_produto_almoxarifado',
      as: 'atividades_agricolas_insumos',
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
  }
}

export default ProdutoAlmoxarifado;
